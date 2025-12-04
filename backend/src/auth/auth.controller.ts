import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    HttpStatus,
    UseGuards,
    Request,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login endpoint
  @Post('login')
  @ApiTags('auth')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    const token = await this.authService.login(req.user);
    return { access_token: token };
  }

  // Register endpoint
  @Post('register')
  @ApiTags('auth')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 201, description: 'Register successful' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    const token = await this.authService.register(registerDto);
    return { access_token: token };
  }


  @Get('profile')
  @ApiTags('auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Profile not found'})
  async profile(@Request() req) {
    return await this.authService.profile(req.user);
  }


}
