

### CI 说明

- CI文件中变量 PROJECT_NAME 需要与当前项目名称一样，最好也与当前工程名字一样
- 注意CI文件中git clone仓库 路径是否正确
- 注意deploy_artifact中 静态资源位置是否正确
- 如下变量需要修改为对应的项目的信息
     - PROJECT_NAME: react-datlas
     -  BUILD_COMMAND_STAGING: "yarn build:staging"
     -  BUILD_COMMAND_PROD: "yarn build:prod"
  
### 访问的地址

https://www.datlas.cn/statics/qsh_screen/#/home

### vscode 须装插件

- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemname=msjsdiag.debugger-for-chrome)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### 使用方式

- [gitmoji 官网](https://gitmoji.carloscuesta.me/) 提交 commit 请使用`git cz`

### vscode 推荐插件

- [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons) 可视化图标包
- [indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) 不同颜色缩进
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer) ()[]{}
  颜色匹配
- [Antd Rush](https://marketplace.visualstudio.com/items?itemName=fi3ework.vscode-antd-rush)AntDesign 语法提示及说明
