import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import glob from 'glob'
import { createHtmlPlugin } from 'vite-plugin-html'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import viteCompression from 'vite-plugin-compression';
import removeConsole from "vite-plugin-remove-console";
import pxtovw from 'postcss-px-to-viewport'

//配置参数实现屏幕自动适配
const usePxtovw = pxtovw({
  // viewportWidth: 375,
  viewportWidth: 1920,
  viewportUnit: 'vw'
})

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
  console.log(command, mode);
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
        '@': path.resolve(__dirname, './src'),
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
        plugins: [usePxtovw]
      }
    }
  }
})
