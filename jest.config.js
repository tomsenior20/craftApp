module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node', // or 'jsdom' for React testing
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
