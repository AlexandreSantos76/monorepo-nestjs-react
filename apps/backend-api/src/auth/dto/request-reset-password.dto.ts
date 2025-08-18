import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestResetPasswordDto {
    @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário' })
    @IsString()
    email: string;
}