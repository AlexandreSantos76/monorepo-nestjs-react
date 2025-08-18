import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Lista usuários ativos' })
  @ApiResponse({ status: 200, description: 'Lista de usuários ativos retornada com sucesso.' })
  findActiveUsers() {
    return this.usersService.findActiveUsers();
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca usuários pelo nome' })
  @ApiResponse({ status: 200, description: 'Usuários encontrados.' })
  @ApiResponse({ status: 404, description: 'Nenhum usuário encontrado.' })
  searchByName(@Query('name') name: string) {
    return this.usersService.searchByName(name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Ativa usuário' })
  @ApiResponse({ status: 200, description: 'Usuário ativado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  activate(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.activate(id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Desativa usuário' })
  @ApiResponse({ status: 200, description: 'Usuário desativado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deactivate(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove usuário' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}