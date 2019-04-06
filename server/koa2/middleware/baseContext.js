
'use strict';

const config = require('../config');
const JsonResponse = require('../lib/jsonResponse');

/**
 * [getHomeUrl 获取首页地址]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
function getHomeUrl(ctx){
    return ()=>{
        return `${ctx.protocol}://${ctx.host}`;
    };
}

/**
 * [removeCookie 删除cookie]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
function removeCookie(ctx){
    return (name, opts = {})=>{
        if ( !name ) {
            return;
        }
        let domain = '.' + config.app.domain;
        opts = Object.assign({expires: new Date(1), path: '/', domain: domain}, opts);
        ctx.cookies.set(name, '', opts);
    };
}

export default  async(ctx, next)=>{
    //删除cookie
    ctx.cookies.remove = removeCookie(ctx);
    //获取首页地址
    ctx.getHomeUrl = getHomeUrl(ctx);
    //处理json格式输出
    ctx.rspns = new JsonResponse(ctx);
    await next();
};