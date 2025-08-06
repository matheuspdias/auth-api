import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignUpDTO, SignInDTO } from './dtos/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import type { AuthRequest } from './types/auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() data: SignUpDTO) {
    return this.authService.signUp(data);
  }

  @Post('signin')
  async signIn(@Body() data: SignInDTO) {
    return this.authService.signIn(data);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() req: AuthRequest) {
    return req.user;
  }
}
