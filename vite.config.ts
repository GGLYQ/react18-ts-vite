import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import glob from 'glob'
import { createHtmlPlugin } from 'vite-plugin-html'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import viteCompression from 'vite-plugin-compression';
import removeConsole from "vite-plugin-remove-console";
import autoprefixer from 'autoprefixer';
import postCssPxToRem from 'postcss-pxtorem';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 设置不同环境不同命令的入口文件
function getEntry(moduleName) {
  const input =
    moduleName === 'development'
      ? glob.sync(path.resolve(__dirname, './public', 'index.html'))
      : {
        [moduleName]: resolve(__dirname, `./public/${moduleName}/index.html`),
      }
  return input
}
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '')
  const moduleName = mode || 'development'
  const input = getEntry(moduleName)
  // console.log(command, mode);
  return {
    // 静态资源基础路径 base: './' || '',
    base: env.NODE_ENV === 'production' ? './' : '/',
    // 项目根目录，index.html 所在的目录
    // 要配置多页面，所以此处更改项目根目录地址，不再是项目根目录
    // 而是指定的目录下， 以便配置多页面index.html入口
    root: resolve(__dirname, ''),
    // 静态资源服务目录地址
    // 根目录变化，原来的public静态资源目录则需要，指向
    publicDir: resolve(__dirname, './public'),
    // 存储缓存文件的目录地址
    cacheDir: '',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
        // '@public': path.resolve(__dirname, './public'),
      },
    },
    plugins: [
      react(),
      // 用于将传统 HTML 文件作为输出文件使用
      createHtmlPlugin({
        minify: true,
        pages: [
          {
            entry: '../src/main.tsx',
            filename: 'index.html',
            template: 'public/index.html',
            injectOptions: {
              data: {
                title: 'cloud',
                // injectScript: `<script src="./inject.js"></script>`,
              },
            },
          },]
      }),
      // 用于自动优化应用程序中的图像文件
      ViteImageOptimizer({
      }),
      // 生产环境删除所有指定console类型
      removeConsole(),
      // 用于gzip或Brotli压缩你的资源
      viteCompression(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(__dirname, './src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'svgicon-[dir]-[name]',

        /**
         * 自定义插入位置
         * @default: body-last
         */
        // inject?: 'body-last' | 'body-first'

        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        // customDomId: '__svg__icons__dom__',
      }),
    ],
    // 构建目录自动清除
    emptyOutDir: false,
    build: {
      outDir: path.join(__dirname, './dist', moduleName),
      rollupOptions: {
        input,
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
    },
    define: {
      __NODE_ENV__: JSON.stringify(env.NODE_ENV),
      __REACT_TITLE__: JSON.stringify(env.REACT_TITLE)
    },
    server: {
      open: true // 自动打开浏览器
    },
    esbuild: {
      // 移除日志打印及debugger,可在env配置VITE_DROP_CONSOLE
      drop: !env.VITE_DROP_CONSOLE ? ['console', 'debugger'] : []
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
          }),
          postCssPxToRem({
            // 自适应，px>rem转换
            rootValue: 16, // 75表示750设计稿，37.5表示375设计稿
            propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
            selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换
            unitPrecision: 5, //允许REM单位增长到的十进制数字。
            //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: false,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 0 //设置要替换的最小像素值(3px会被转rem)。 默认 0
          }),
        ],
      }
    }
  }
})
