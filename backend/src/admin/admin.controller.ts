import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';

type InformationBody = {
  title: string;
  content: string;
};

type UserBody = {
  role: 'USER' | 'ADMIN';
  isActive: boolean;
};

const adminUserSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  isActive: true,
  createdAt: true,
} as const;

@Controller('admin')
export class AdminController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('users')
  async users(@Headers('authorization') authorization?: string) {
    await this.authService.requireAdmin(authorization);

    return this.prisma.user.findMany({
      select: adminUserSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Put('users/:id')
  async updateUser(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
    @Body() body: UserBody,
  ) {
    await this.authService.requireAdmin(authorization);

    return this.prisma.user.update({
      where: { id: Number(id) },
      data: { role: body.role, isActive: body.isActive },
      select: adminUserSelect,
    });
  }

  @Delete('users/:id')
  async deleteUser(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
  ) {
    await this.authService.requireAdmin(authorization);
    await this.prisma.user.delete({ where: { id: Number(id) } });

    return { message: 'Utilisateur supprimé.' };
  }

  @Post('informations')
  async createInformation(
    @Headers('authorization') authorization: string | undefined,
    @Body() body: InformationBody,
  ) {
    await this.authService.requireAdmin(authorization);

    return this.prisma.information.create({
      data: { title: body.title, content: body.content },
    });
  }

  @Put('informations/:id')
  async updateInformation(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
    @Body() body: InformationBody,
  ) {
    await this.authService.requireAdmin(authorization);

    return this.prisma.information.update({
      where: { id: Number(id) },
      data: { title: body.title, content: body.content },
    });
  }

  @Delete('informations/:id')
  async deleteInformation(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
  ) {
    await this.authService.requireAdmin(authorization);

    return this.prisma.information.delete({
      where: { id: Number(id) },
    });
  }
}

/*
  Résumé du fichier :
  - Sert à définir les routes réservées aux administrateurs.
  - Fonctionne en vérifiant le rôle admin avant de gérer utilisateurs et informations.
*/
