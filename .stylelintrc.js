module.exports = {
    processors: [],
    plugins: ['stylelint-selector-bem-pattern'],
    extends: ['stylelint-config-prettier'], // 这是官方推荐的方式
    rules: {
        'plugin/selector-bem-pattern': {
            preset: 'bem'
        }
    }
};
