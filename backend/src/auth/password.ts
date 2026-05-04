import * as bcrypt from 'bcryptjs';

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function isPasswordValid(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

/*
  Résumé du fichier :
  - Sert à sécuriser les mots de passe.
  - Fonctionne avec bcrypt pour hasher un mot de passe et comparer un mot de passe saisi.
*/
