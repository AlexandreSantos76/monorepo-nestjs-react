import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Realiza login do usuário' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
    @Public()
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('forgot-password')
    @ApiOperation({ summary: 'Solicita a redefinição de senha' })
    @ApiBody({ type: RequestResetPasswordDto })
    @ApiResponse({ status: 200, description: 'Se o e-mail estiver cadastrado, um link de recuperação foi enviado.' })
    @ApiResponse({ status: 404, description: 'E-mail não encontrado.' })
    @Public()
    async requestPasswordReset(@Body() requestResetPasswordDto: RequestResetPasswordDto) {
        return this.authService.requestPasswordReset(requestResetPasswordDto.email);
    }

    @Post('reset-password')
    @ApiOperation({ summary: 'Redefine a senha do usuário' })
    @ApiBody({ type: ResetPasswordDto })
    @ApiResponse({ status: 200, description: 'Senha redefinida com sucesso.' })
    @ApiResponse({ status: 401, description: 'Token inválido ou expirado.' })
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Request() req) {
        const token = req.headers.authorization?.replace('Bearer ', '');
        return this.authService.resetPassword(token, resetPasswordDto);
    }
    @Public()
    @Post('confirm-email')
    @ApiOperation({ summary: 'Confirma o e-mail do usuário' })
    @ApiBody({ type: ConfirmEmailDto })
    @ApiResponse({ status: 200, description: 'E-mail confirmado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Token inválido ou expirado.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })

    async confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto) {
        return this.authService.confirmEmail(confirmEmailDto.email, confirmEmailDto.token);
    }

    // LOGIN SOCIAL GOOGLE
    @Get('google')
    @Public()
    @UseGuards(AuthGuard('google'))
    async googleLogin() {
        // O redirecionamento para o Google será tratado pelo Passport
    }

    @Get('google/callback')
    @Public()
    @UseGuards(AuthGuard('google'))
    @ApiOperation({ summary: 'Callback do login social com Google' })
    @ApiResponse({ status: 200, description: 'Login social com Google realizado com sucesso.' })
    async googleAuthRedirect(@Request() req) {
        // O Passport já tratou a autenticação, então retornamos o usuário
        return this.authService.googleLogin(req);
    }
}
