import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword, isPasswordValid } from './password';

type AuthBody = {
  email: string;
  password: string;
  name?: string;
};

type UpdateProfileBody = {
  email: string;
  name?: string;
};

const publicUserSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
} as const;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: AuthBody) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé.');
    }

    const user = await this.prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: await hashPassword(body.password),
      },
      select: publicUserSelect,
    });

    return { user, token: this.createToken(user.id) };
  }

  async login(body: AuthBody) {
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (
      !user ||
      !user.isActive ||
      !(await isPasswordValid(body.password, user.password))
    ) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token: this.createToken(user.id),
    };
  }

  async getConnectedUser(authorization?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: this.readToken(authorization) },
      select: { ...publicUserSelect, isActive: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Utilisateur introuvable.');
    }

    return user;
  }

  async updateMe(authorization: string | undefined, body: UpdateProfileBody) {
    const user = await this.getConnectedUser(authorization);
    const existingUser = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser && existingUser.id !== user.id) {
      throw new ConflictException('Cet email est déjà utilisé.');
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: { email: body.email, name: body.name },
      select: { ...publicUserSelect, isActive: true },
    });
  }

  async deleteMe(authorization: string | undefined, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: this.readToken(authorization) },
    });

    if (!user || !(await isPasswordValid(password, user.password))) {
      throw new UnauthorizedException('Mot de passe incorrect.');
    }

    await this.prisma.user.delete({ where: { id: user.id } });

    return { message: 'Compte supprimé.' };
  }

  async requireAdmin(authorization?: string) {
    const user = await this.getConnectedUser(authorization);

    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Accès réservé aux administrateurs.');
    }

    return user;
  }

  private createToken(userId: number) {
    return this.jwtService.sign({ userId });
  }

  private readToken(authorization?: string) {
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Token invalide.');
    }

    try {
      return this.jwtService.verify<{ userId: number }>(token).userId;
    } catch {
      throw new UnauthorizedException('Token invalide.');
    }
  }
}

/*
  Résumé du fichier :
  - Sert à gérer la logique métier de l'authentification.
  - Fonctionne avec Prisma, JWT et bcrypt pour inscrire, connecter et vérifier les utilisateurs.
*/
