// src/modules/users/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { eq, like } from 'drizzle-orm';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';
import { usersTable } from 'src/database/schema';
import { BaseRepository } from 'src/common/repositories/base.repository';

/**
 * Repositório para gerenciar a persistência da entidade de usuário.
 * Esta classe estende a classe BaseRepository para herdar os métodos de CRUD genéricos
 * e implementa IUserRepository para garantir o contrato de métodos específicos.
 */
@Injectable()
export class UserRepository extends BaseRepository<UserEntity> implements IUserRepository {

    /**
     * Retorna a tabela do Drizzle associada a este repositório.
     * Este método é obrigatório para o funcionamento do BaseRepository.
     */
    public getTable(): typeof usersTable {
        return usersTable;
    }

    /**
     * Retorna a coluna que serve como identificador principal da tabela.
     * Este método é obrigatório para o funcionamento do BaseRepository.
     */
    public getIdColumn(): any {
        return usersTable.userId;
    }

    /**
     * Cria uma instância da entidade a partir dos dados brutos retornados pelo Drizzle.
     * Este é o ponto onde a conversão do tipo `string` (do Drizzle) para `Date` é feita.
     * A classe BaseRepository se encarrega de chamar este método em todas as buscas.
     * * @param data Os dados brutos do Drizzle.
     * @returns Uma nova instância de UserEntity com os tipos de dados corretos.
     */
    protected createEntity(data: any): UserEntity {
        // O método mapDataToEntity é herdado do BaseRepository e faz a conversão de datas.
        return this.mapDataToEntity(data, UserEntity);
    }

    /**
     * Busca um usuário pelo endereço de email.
     * Este é um método específico de usuário que não está na BaseRepository.
     * Ele utiliza o método auxiliar findOneWhere do BaseRepository.
     * * @param email O email do usuário.
     * @returns A entidade de usuário ou null se não for encontrada.
     */
    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.findOneWhere(eq(usersTable.email, email));
    }

    /**
     * Busca usuários cujos nomes correspondem a um padrão.
     * Este é um método específico de usuário que não está na BaseRepository.
     * Ele utiliza o método auxiliar findWhere do BaseRepository.
     * * @param pattern O padrão de busca para o nome.
     * @returns Um array de entidades de usuário.
     */
    async findByNamePattern(pattern: string): Promise<UserEntity[]> {
        return this.findWhere(like(usersTable.name, `%${pattern}%`));
    }

    /**
     * Busca todos os usuários que estão ativos.
     * Este é um método específico de usuário que não está na BaseRepository.
     * Ele utiliza o método auxiliar findWhere do BaseRepository.
     * * @returns Um array de entidades de usuário ativas.
     */
    async findActiveUsers(): Promise<UserEntity[]> {
        return this.findWhere(eq(usersTable.isActive, true));
    }

    /**
     * Busca um usuário pelo ID do Google.
     * Este é um método específico de usuário que não está na BaseRepository.
     * Ele utiliza o método auxiliar findOneWhere do BaseRepository.
     * * @param googleId O ID do Google do usuário.
     * @returns A entidade de usuário ou null se não for encontrada.
     */
    async findByGoogleId(googleId: string): Promise<UserEntity | null> {
        return this.findOneWhere(eq(usersTable.googleId, googleId));
    }
}
