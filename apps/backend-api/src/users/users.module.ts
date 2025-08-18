import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { USER_REPOSITORY } from './repositories/user.repository.provide';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      // Usamos a constante simbólica como token de injeção
      provide: USER_REPOSITORY,
      // Indicamos ao NestJS que a classe a ser usada é UserRepository
      useClass: UserRepository
    },
  ],
  exports: [UsersService],
})
export class UsersModule { }
