import { IBaseRepository } from "../../common/repositories/base.repository.interface";
import { UserEntity } from "../entities/user.entity";

export interface IUserRepository extends IBaseRepository<UserEntity> {
    findByEmail(email: string): Promise<UserEntity | null>;
    findByNamePattern(pattern: string): Promise<UserEntity[]>;
    findActiveUsers(): Promise<UserEntity[]>;
    findByGoogleId(googleId: string): Promise<UserEntity | null>;
}