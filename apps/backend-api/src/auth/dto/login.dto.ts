// src/modules/users/dto/login.dto.ts
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Senha123', description: 'Senha do usuário' })
    @IsString()
    password: string;
}