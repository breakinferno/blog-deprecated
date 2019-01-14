'use strict';
const path = require('path');

//设置环境变量
const rootPath = process.env.PM2_ROOT_PATH || __dirname;
const rootPathObj = path.parse(rootPath);

//pm2配置文件
module.exports = {
    apps: [{
        name: 'blog-koa2-vue',
        script: path.join(rootPath, './server/koa2/index.js'),
        cwd: rootPath,
        instances: 1,
        watch: false,
        env: {
            'NODE_ENV': 'production',
        },
        exec_mode: 'cluster',
        max_memory_restart: '2G',
        //日志地址
        error_file: `/data/var/nodejs/log/${rootPathObj.base}_error.log`,
        out_file: `/data/var/nodejs/log/${rootPathObj.base}_access.log`,
        listen_timeout: 8000,
        kill_timeout: 2000,
        restart_delay: 10000, //异常情况
        max_restarts: 10
    }]
};
