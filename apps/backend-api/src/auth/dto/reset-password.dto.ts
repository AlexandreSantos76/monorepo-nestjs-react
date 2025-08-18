import { IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
    @ApiProperty({ example: 'NovaSenha123', description: 'Nova senha do usuário. Deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.' })
    @IsString()
    @MinLength(8, { message: 'A Senha deve ter pelo menos 8 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'A Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
    })
    password: string;
}