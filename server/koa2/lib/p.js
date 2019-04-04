import { getObjValue } from './index'
import Code from '../constant/httpStatus'
export function successPromise(code = { code: 200, payload: { msg: "Successfully" } }, msg, data) {
    if (msg) {
        code = {
            code: code,
            message: msg || 'Successfully',
            data: data 
        }
    }
    return Promise.resolve({
        code: code.code || Code.OK,
        message: getObjValue(code, 'message') || "Successfully",
        data: getObjValue(code, 'data') || null
    })
}

export function failedPromise(code = { code: 500,  msg: 'Internal Error'  }, msg, data) {
    if (msg) {
        code = {
            code: code,
            message: msg || 'Internal Error',
            data
        }
    }
    return Promise.reject({
        code: code.code || Code.INTERNAL_ERROR,
        message: getObjValue(code, 'message') || "Internal Error",
        data: getObjValue(code, 'data') || null
    })
}