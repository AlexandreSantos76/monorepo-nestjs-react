// src/modules/users/dto/change-password.dto.ts
import { IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
    @ApiProperty({ example: 'SenhaAntiga123', description: 'Senha atual do usuário' })
    @IsString()
    currentPassword: string;

    @ApiProperty({ example: 'NovaSenha123', description: 'Nova senha do usuário. Deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.' })
    @IsString()
    @MinLength(8, { message: 'New password must be at least 8 characters long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'New password must contain at least one uppercase letter, one lowercase letter, and one number'
    })
    newPassword: string;
}