// .lintstagedrc.js 文件中的代码如下
module.exports = {
    "src/**/\*{js,jsx,ts,tsx,md,html}": ["eslint", "prettier --write"],
    "src/**/*.less": ["stylelint --fix", "git add"],
    "src/**/*.scss": ["stylelint --fix", "git add"],
}
