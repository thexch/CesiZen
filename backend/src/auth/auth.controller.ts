import { Body, Controller, Delete, Get, Headers, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';

type AuthBody = {
  email: string;
  password: string;
  name?: string;
};

type UpdateProfileBody = {
  email: string;
  name?: string;
};

type DeleteProfileBody = {
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: AuthBody) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: AuthBody) {
    return this.authService.login(body);
  }

  @Get('me')
  me(@Headers('authorization') authorization?: string) {
    return this.authService.getConnectedUser(authorization);
  }

  @Put('me')
  updateMe(
    @Headers('authorization') authorization: string | undefined,
    @Body() body: UpdateProfileBody,
  ) {
    return this.authService.updateMe(authorization, body);
  }

  @Delete('me')
  deleteMe(
    @Headers('authorization') authorization: string | undefined,
    @Body() body: DeleteProfileBody,
  ) {
    return this.authService.deleteMe(authorization, body.password);
  }
}

/*
  Résumé du fichier :
  - Sert à définir les routes d'authentification.
  - Fonctionne en recevant les requêtes HTTP puis en appelant AuthService.
*/
