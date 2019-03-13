#!/bin/bash
echo "ci bash start!"
# 打包代码入库 npm run build会被杀掉
cd `pwd`/client/vue-blog
npm i
# npm run build
cd ../..
cd `pwd`/server/koa2
npm i
npm run deploy
echo "ci bash over!"
exit 0