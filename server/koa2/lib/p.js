import { getObjValue } from './index'
export function successPromise(code = { code: 200, payload: { msg: "Successfully" } }, msg, data) {
    if (msg) {
        code = {
            code: code,
            payload: {
                msg: msg,
                data: data
            }
        }
    }
    return Promise.resolve({
        code: code.code || 200,
        payload: {
            msg: getObjValue(code, 'payload.msg') || "Successfully",
            data: getObjValue(code, 'payload.data') || null
        }
    })
}

export function failedPromise(code = { code: 500, payload: { msg: 'Internal Error' } }, msg, data) {
    if (msg) {
        code = {
            code: code,
            payload: {
                msg: msg,
                data: data
            }
        }
    }
    return Promise.reject({
        code: code.code || 500,
        payload: {
            msg: getObjValue(code, 'payload.msg') || "Successfully",
            data: getObjValue(code, 'payload.data') || null
        }
    })
}