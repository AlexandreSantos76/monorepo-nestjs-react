import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Senha123', description: 'Senha do usuário. Deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.' })
    @IsString()
    @IsOptional()
    @MinLength(8, { message: 'Password deve ter pelo menos 8 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message: 'A senha deve ter pelo menos 8 caracteres e conter pelo menos uma letra maiúscula, uma minúscula e um número.',
    })
    password?: string;

    @ApiPropertyOptional({ example: true, description: 'Indica se o usuário está ativo' })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({ example: false, description: 'Indica se o e-mail do usuário foi verificado' })
    @IsOptional()
    @IsBoolean()
    isEmailVerified?: boolean;

    @ApiPropertyOptional({ example: false, description: 'Identificação do usuário no google' })
    @IsOptional()
    @IsString()
    googleId?: string;
}