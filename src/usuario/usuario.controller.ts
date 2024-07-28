import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UsuarioRepository } from './usuario.repository';
import { CriarUsuarioDTO } from './dto/CriarUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {

  constructor(private usuariosRepository: UsuarioRepository) {}

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriarUsuarioDTO) {
      const usuarioEntity = new UsuarioEntity();
      usuarioEntity.nome = dadosDoUsuario.nome;
      usuarioEntity.email = dadosDoUsuario.email;
      usuarioEntity.senha = dadosDoUsuario.senha;
      usuarioEntity.id = uuid();

      this.usuariosRepository.salvar(usuarioEntity);

      return { 
        usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
        messsage: 'Usuário criado com sucesso!' 
      };
    }

    @Get()
    async listarUsuarios() {
      const usuariosSalvos = await this.usuariosRepository.listar();
      const usuariosLista = usuariosSalvos.map(usuario => 
        new ListaUsuarioDTO(usuario.id, usuario.nome)
      );

      return usuariosLista;
    }

    @Put('/:id')
    async atualizarUsuario(@Param("id") id: string, @Body() novosDados: AtualizaUsuarioDTO) {
      const usuarioAtualizado = await this.usuariosRepository.atualizar(id, novosDados);

      return { 
        usuario: usuarioAtualizado,
        message: 'Usuário atualizado com sucesso!' 
      };
    }

    @Delete('/:id')
    async removerUsuario(@Param("id") id: string) {
      const usuarioRemovido = await this.usuariosRepository.remover(id);

      return { 
        usuario: usuarioRemovido,
        message: 'Usuário removido com sucesso!' 
      };
    }


}  