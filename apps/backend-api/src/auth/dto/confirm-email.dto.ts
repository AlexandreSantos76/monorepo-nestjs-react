import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class ConfirmEmailDto {
    @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário' })
    @IsString()
    email: string;

    @ApiProperty({ example: 'token_de_confirmacao', description: 'Token de confirmação enviado por e-mail' })
    @IsString()
    token: string;
}