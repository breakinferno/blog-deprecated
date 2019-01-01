//一些共有的工具方法

export function getObjValue(obj, path) {
    const arrayRegx = /(\[)(\d+)(\])/g;
    path = Array.isArray(path) ? path.join('.') : path;
    path = path.replace(arrayRegx, ".$2").split('.');
    return path.reduce((target, p) => {
        return (target || {})[p]
    }, obj)
}

export function checkFields(obj, fields) {
    if (Array.isArray(fields)) {
        return fields.every(field => {
            return getObjValue(obj, field) !== 'undefined'
        })
    } else if (typeof fields === 'string') {
        return getObjValue(obj, fields) === 'undefined' ? false : true
    } else {
        throw new Error('[checkFields]: fields must be array or string...')
    }
}

export function getFields(obj, fields) {
    if (Array.isArray(fields)) {
        return fields.map(field => {
            return getObjValue(obj, field)
        })
    } else if (typeof fields === 'string') {
        return getObjValue(obj, fields)
    } else {
        throw new Error('[checkFields]: fields must be array or string...')
    }
}

export function errorHandler(err) {
    console.log(err);
}

export function paramHandler(ctx) {
    let data // 请求数据
    try {
        data = ctx.request.body
    } catch (e) {
        errorHandler(e)
        ctx.response.status = 500
        ctx.body = {
            err: '请求错误'
        }
    }
    return data;
}


export default {
    getObjValue,
    checkFields,
    getFields,
    errorHandler,
    paramHandler
}