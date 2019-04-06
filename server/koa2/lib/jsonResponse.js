'use strict';
const { getLogger } = require('./log');
const { INTERNAL_ERROR , NOT_FOUND } = require('../constant/httpStatus');

class JsonResponse {
    constructor(ctx) {
        this.ctx = ctx;
        this.logger = getLogger(ctx)
    }
    success(data = []) {
        this.ctx.set('Content-Type', 'application/json');
        this.ctx.body = {
            code: 0,
            message: '成功',
            data: data
        };
    }
    /**
     * [error 错误处理]
     * @param  {[type]} code    [description]
     * @param  {[type]} message [description]
     * @param  {Array}  data    [description]
     * @return {[type]}         [description]
     */
    error(code, message = '' , data = []) {
        this.ctx.set('Content-Type', 'application/json');
        if ( code instanceof Error ){ //代码错误
            this.logger.error('[JsonResponse/error]', `JsonResponse error now. ${JSON.stringify(code)}`);
            try{
                if ( code.code ){
                    message = code.message;
                    code = code.code;
                }else{
                    message = code.message;
                    code = STATUS_SERVER_ERROR;
                }
            }catch(e){
                code = INTERNAL_ERROR;
                message = '服务器未知错误';
            }
        }else if ( typeof code === 'object' ){ //服务错误或者服务器返回错误
            this.logger.error('[JsonResponse/error]', `JsonResponse error now. ${JSON.stringify(code)}`);
            try{
                message = code.message;
                code = code.code ? code.code : STATUS_SERVER_ERROR;
            }catch(e){
                code = INTERNAL_ERROR;
                message = '服务器错误';
            }
        }else{
            this.logger.error('[JsonResponse/error]', `JsonResponse error now. ${message}`);
        }
        code = Number.isInteger(code) && code !== 0 ? code : INTERNAL_ERROR;
        message = typeof message === 'string' ? message : '失败';
        this.ctx.body = { code, message , data };
    }
}

module.exports = JsonResponse;
