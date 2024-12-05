module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom', // or 'jsdom' for React testing
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    '\\.scss$': 'jest-transform-stub',
    '\\.css$': 'jest-transform-stub',
    moduleNameMapper: {
        '\\.scss$': 'identity-obj-proxy',
        '\\.css$': 'identity-obj-proxy',
      },
};
