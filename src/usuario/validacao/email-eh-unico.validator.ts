import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidador implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(email: string) {
    const usuarioEmailExiste = await this.usuarioRepository.buscarPorEmail(email);
    return !usuarioEmailExiste;
  }
}

export const EmailEhUnico = (opcoes: ValidationOptions) => {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: opcoes,
            constraints: [],
            validator: EmailEhUnicoValidador
        });
    };
}
