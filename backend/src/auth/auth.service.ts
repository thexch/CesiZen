import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

type AuthBody = {
  email: string;
  password: string;
  name?: string;
};

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

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
      },
      select: { id: true, email: true, name: true, role: true },
    });

    return { user, token: this.createToken(user.id) };
  }

  async login(body: AuthBody) {
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return { user: safeUser, token: this.createToken(user.id) };
  }

  async me(authorization?: string) {
    return this.getConnectedUser(authorization);
  }

  async getConnectedUser(authorization?: string) {
    const userId = this.readToken(authorization);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable.');
    }

    return user;
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
