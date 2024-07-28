import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class CriarUsuarioDTO{
@IsNotEmpty({message: 'O Nome é obrigatório'})
  nome: string;

@IsEmail(undefined, {message: 'E-mail inválido'})
@EmailEhUnico({message: 'E-mail já cadastrado'})
  email: string;

@MinLength(6, {message: 'A senha deve ter no mínimo 6 caracteres'})
  senha: string;
}