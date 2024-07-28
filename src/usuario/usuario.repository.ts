import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];

    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
    }

    async listar() {
        return this.usuarios;
    }

    async buscarPorEmail(email: string) {
       const possivelUsuario = this.usuarios.find(usuario => usuario.email === email);

        if(possivelUsuario) {
            return possivelUsuario;
        }  
    }

    private async buscarPorId(id: string) {
        const possivelUsuario = this.usuarios.find(usuario => usuario.id === id);

        if (!possivelUsuario) {
            throw new Error('Usuário não encontrado');
        }

        return possivelUsuario;
    }

    async atualizar(id: string, novosDados: Partial<UsuarioEntity>) {
       const usuario = await this.buscarPorId(id);

        Object.entries(novosDados).forEach(([chave, valor]) => {
            if (chave === "id") {
                return;
            }

            usuario[chave] = valor;
        });

        return usuario;
    }

    async remover(id: string) {
        const usuario = await this.buscarPorId(id);
        this.usuarios = this.usuarios.filter(usuarioSalvo => usuarioSalvo.id !== id);

        return usuario;
    }

    
}