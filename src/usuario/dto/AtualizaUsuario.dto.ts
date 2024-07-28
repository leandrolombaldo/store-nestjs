import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class AtualizaUsuarioDTO{
@IsNotEmpty({message: 'O Nome é obrigatório'})
@IsOptional()
  nome: string;

@IsEmail(undefined, {message: 'E-mail inválido'})
@EmailEhUnico({message: 'E-mail já cadastrado'})
@IsOptional()
  email: string;

@MinLength(6, {message: 'A senha deve ter no mínimo 6 caracteres'})
@IsOptional()
  senha: string;
}