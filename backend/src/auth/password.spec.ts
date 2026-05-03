import { hashPassword, isPasswordValid } from './password';

describe('Mot de passe', () => {
  it("TU-02 hache le mot de passe avant l'insertion en base", async () => {
    const password = 'motdepasse123';
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).not.toBe(password);
    expect(await isPasswordValid(password, hashedPassword)).toBe(true);
  });
});
