module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

/*
  Résumé du fichier :
  - Sert à configurer les tests backend avec Jest.
  - Fonctionne en ciblant les fichiers .spec.ts et en les transformant avec ts-jest.
*/
