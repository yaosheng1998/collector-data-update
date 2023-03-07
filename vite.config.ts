import { defineConfig, ConfigEnv, UserConfig } from 'vite';
// import { createHtmlPlugin } from 'vite-plugin-html';
// import requireTransform from 'vite-plugin-require-transform';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import vitePluginImp from 'vite-plugin-imp';
import viteImagemin from 'vite-plugin-imagemin';
require('dotenv').config();
// import { visualizer } from 'rollup-plugin-visualizer';
// import viteCompression from 'vite-plugin-compression';

// @see: https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
    const isDev = mode.mode === 'development';
    return {
        base: './',
        // alias config
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
                '@api': resolve(__dirname, './src/api'),
                '@pages': resolve(__dirname, './src/pages'),
                '@components': resolve(__dirname, './src/components'),
                '@config': resolve(__dirname, './src/config'),
                '@styles': resolve(__dirname, './src/styles'),
                '@store': resolve(__dirname, './src/store'),
                '@router': resolve(__dirname, './src/router'),
                '@utils': resolve(__dirname, './src/utils')
            }
        },
        // global css
        css: {
            preprocessorOptions: {
                less: {
                    // modifyVars: {
                    // 	"primary-color": "#1DA57A",
                    // },
                    javascriptEnabled: true,
                    additionalData: `@import "@/styles/global.less";`
                }
            }
        },
        // server config
        server: {
            host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
            port: 3000,
            open: true,
            cors: true,
            // https: false,
            // 代理跨域（mock 不需要配置，这里只是个事列）
            proxy: {
                '/datlas': {
                    target: 'https://www.datlas.cn',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/datlas/, '')
                },
                '/qsh': {
                    target: 'https://qingshanhu.metrodata.cn:9002',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/qsh/, '')
                },
                '/lp': {
                    target: 'https://linping-jingkai-internet.metrodata.cn:9002/',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/lp/, '')
                },
                '/dzl': {
                    target: 'https://dazoulang-zhihuijiaoyu-internet.metrodata.cn:9002/',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/dzl/, '')
                }
            }
        },
        // plugins
        plugins: [
            react(),
            // createHtmlPlugin({
            //     inject: {
            //         data: {
            //             title: '青山湖政策计算器'
            //         }
            //     }
            // }),
            // antd 按需导入
            vitePluginImp({
                libList: [
                    {
                        libName: 'antd',
                        style: name => `antd/es/${name}/style`
                    }
                ]
            }),
            // * EsLint 报错信息显示在浏览器界面上
            eslintPlugin(),
            // * 是否生成包预览
            // visualizer({ open: true, gzipSize: true, brotliSize: true }),
            // * gzip compress 生成压缩包
            // viteCompression({
            //     verbose: true,
            //     disable: false,
            //     threshold: 10240,
            //     algorithm: 'gzip',
            //     ext: '.gz'
            // })
            viteImagemin({
                gifsicle: {
                    // gif图片压缩
                    optimizationLevel: 3, // 选择1到3之间的优化级别
                    interlaced: false // 隔行扫描gif进行渐进式渲染
                    // colors: 2 // 将每个输出GIF中不同颜色的数量减少到num或更少。数字必须介于2和256之间。
                },
                optipng: {
                    // png
                    optimizationLevel: 7 // 选择0到7之间的优化级别
                },
                mozjpeg: {
                    // jpeg
                    quality: 20 // 压缩质量，范围从0(最差)到100(最佳)。
                },
                pngquant: {
                    // png
                    quality: [0.8, 0.9], // Min和max是介于0(最差)到1(最佳)之间的数字，类似于JPEG。达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存。
                    speed: 4 // 压缩速度，1(强力)到11(最快)
                },
                svgo: {
                    // svg压缩
                    plugins: [
                        {
                            name: 'removeViewBox'
                        },
                        {
                            name: 'removeEmptyAttrs',
                            active: false
                        }
                    ]
                }
            })
        ],
        define: {
            'process.env': process.env
        },
        esbuild: {
            pure: isDev ? [] : ['console.log', 'debugger']
        },
        // build configure
        build: {
            outDir: 'build',
            // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
            minify: 'esbuild',
            // minify: "terser",
            // terserOptions: {
            // 	compress: {
            // 		drop_console: true,
            // 		drop_debugger: true
            // 	}
            // },
            rollupOptions: {
                output: {
                    // Static resource classification and packaging
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
                }
            }
        }
    };
});
