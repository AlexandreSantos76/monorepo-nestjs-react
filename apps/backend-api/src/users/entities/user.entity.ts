import { BaseEntity } from "../../common/entities/base.entity";
import * as bcrypt from 'bcrypt';

export class UserEntity extends BaseEntity {
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    isEmailVerified: boolean;
    googleId?: string; // Opcional, pois pode não ter conta Google vinculada

    constructor(partial: Partial<UserEntity>) {
        super(partial);
        Object.assign(this, partial);
    }

    updateprofile(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    isValidEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    activate() {
        this.isActive = true;
    }

    deactivate() {
        this.isActive = false;
    }

    changePassword(newPassword: string) {
        this.password = newPassword;
    }

    verifyEmail() {
        this.isEmailVerified = true;
    }

    static async hashPassword(plainPassword: string): Promise<string> {
        const saltRounds = 12; // Mais seguro que o padrão 10
        return bcrypt.hash(plainPassword, saltRounds);
    }

    async comparePassword(plainPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, this.password);
    }

    static isValidPassword(password: string): boolean {
        // Pelo menos 8 caracteres, 1 maiúscula, 1 minúscula, 1 número
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }

    // Método para não retornar a senha em JSON
    toJSON() {
        const { password, ...result } = this;
        return result;
    }

    // Método para retornar dados públicos
    toPublic() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            isEmailVerified: this.isEmailVerified,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }


}