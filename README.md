# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

//安装 redux 
yarn add redux react-redux
npm i redux react-redux
 
//安装react-router-dom
yarn add react-router-dom
npm i react-router-dom
 
//安装 reset-css 样式初始化 
npm i reset-css 
yarn add reset-css //在main.tsx 中全局引入  import 'reset-css'
 
//使用scss
npm i sass --save-dev
yarn add sass --save-dev
 
//安装 antd
npm install antd --save
yarn add antd
 
//安装 antd 图标
npm install --save @ant-desi
gn/icons
yarn add  @ant-design/icons
要将新建的项目上传到Git仓库中，可以按照以下步骤进行操作：

在本地计算机上安装并配置好Git。如果还没有安装Git，需先前往官网（https://git-scm.com/）下载并完成安装过程。

打开命令行工具或者使用图形化界面的Git客户端，定位到项目所在的文件夹路径。

初始化Git仓库，运行以下命令：git init。这会在当前文件夹内生成一个名为.git的隐藏文件夹，表示已经成功初始化了Git仓库。

添加项目文件到Git仓库，运行以下命令：git add .。该命令会将当前文件夹下的所有文件都添加到Git仓库中。

提交更改到Git仓库，运行以下命令：git commit -m "Initial commit"。其中-m参数后面的引号里的信息可根据自己的情况修改，用于说明此次提交的变动内容。

关联远程Git仓库，首先需要在Git服务器（比如Github、Bitbucket等）上创建一个空白的仓库。然后通过以下命令来关联远程仓库：git remote add origin <remote_repository_url>。其中<remote_repository_url>应替换为你在第6步中创建的远程仓库URL。

最后，将本地分支与远程分支同步，运行以下命令：git push -u origin master。这样就能将本地的master分支推送到远程仓库中。

输入相应的认证信息（如用户名和密码）确认身份验证后，项目就会被成功上传到Git仓库中了。

注意事项：

若想查看Git版本控制状态及其他常用命令，可以使用git status命令。

若想查看Git日志记录，可以使用git log命令。

提示：AI自动生成，仅供参考
