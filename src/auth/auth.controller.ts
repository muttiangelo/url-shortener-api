
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post()
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({
        status: 200,
        description: 'Login successful.',
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    signIn(@Body() signInDto: AuthDto) {
        return this.authService.signIn(signInDto.clientId, signInDto.clientSecret);
    }
}
