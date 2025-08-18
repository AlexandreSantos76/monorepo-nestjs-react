import { Injectable, NotFoundException, ConflictException, UnauthorizedException, Inject } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { IUserRepository } from './repositories/user.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from './repositories/user.repository.provide';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    ) { }

    async findAll(): Promise<UserEntity[]> {
        const users = await this.userRepository.findAll();
        return users.map(user => {
            // Remove senha do retorno
            return { ...user, password: undefined } as UserEntity;
        });
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Remove senha do retorno
        return { ...user, password: undefined } as UserEntity;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async findActiveUsers() {
        const users = await this.userRepository.findActiveUsers();
        return users.map(user => {
            // Remove senha do retorno
            return { ...user, password: undefined } as UserEntity;
        });
    }

    async searchByName(name: string): Promise<UserEntity[]> {
        const users = await this.userRepository.findByNamePattern(name);
        return users.map(user => {
            // Remove senha do retorno
            return { ...user, password: undefined } as UserEntity;
        });
    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        // Verificar se email já existe
        const existingUser = await this.userRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        // Validar senha
        if (!UserEntity.isValidPassword(createUserDto.password)) {
            throw new Error('Password does not meet security requirements');
        }

        // Hash da senha
        const hashedPassword = await UserEntity.hashPassword(createUserDto.password);

        // Criar uma instância de UserEntity para passar para o repositório.
        // Isso garante que o objeto tenha todas as propriedades e métodos esperados
        // pelo tipo 'Omit<UserEntity, ...>' na interface.
        const newUserEntity = new UserEntity({
            ...createUserDto,
            password: hashedPassword,
        });

        const user = await this.userRepository.create(newUserEntity);

        // Retornar sem a senha
        return { ...user, password: undefined } as UserEntity;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        // Verificar se usuário existe
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Se está atualizando email, verificar se não existe
        if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
            const emailExists = await this.userRepository.findByEmail(updateUserDto.email);
            if (emailExists) {
                throw new ConflictException('Email already exists');
            }
        }

        const updatedUser = await this.userRepository.update(id, updateUserDto);
        if (!updatedUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Retornar sem a senha
        return { ...updatedUser, password: undefined } as UserEntity;
    }

    async changePassword(id: number, changePasswordDto: ChangePasswordDto): Promise<void> {
        // Buscar usuário com senha (método interno)
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Verificar senha atual
        const userEntity = new UserEntity(user);
        const isCurrentPasswordValid = await userEntity.comparePassword(changePasswordDto.currentPassword);
        if (!isCurrentPasswordValid) {
            throw new UnauthorizedException('Current password is incorrect');
        }

        // Validar nova senha
        if (!UserEntity.isValidPassword(changePasswordDto.newPassword)) {
            throw new Error('New password does not meet security requirements');
        }

        // Hash da nova senha
        const hashedNewPassword = await UserEntity.hashPassword(changePasswordDto.newPassword);

        // Atualizar senha
        await this.userRepository.update(id, { password: hashedNewPassword });
    }

    async validateUser(loginDto: LoginDto): Promise<UserEntity | null> {
        try {
            const user = await this.findByEmail(loginDto.email);
            const userEntity = new UserEntity(user);

            const isPasswordValid = await userEntity.comparePassword(loginDto.password);
            if (isPasswordValid) {
                // Retornar usuário sem senha
                return { ...user, password: undefined } as UserEntity;
            }

            return null;
        } catch (error) {
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        const deleted = await this.userRepository.delete(id);
        if (!deleted) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

    async activate(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        user.activate();
        const updatedUser = await this.userRepository.update(id, { isActive: true });

        return { ...updatedUser, password: undefined } as UserEntity;
    }

    async deactivate(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        user.deactivate();
        const updatedUser = await this.userRepository.update(id, { isActive: false });

        return { ...updatedUser, password: undefined } as UserEntity;
    }

    async findByGoogleId(googleId: string): Promise<UserEntity | null> {
        const user = await this.userRepository.findByGoogleId(googleId);
        if (!user) {
            return null;
        }
        return { ...user, password: undefined } as UserEntity; // Retorna sem a senha
    }
}
