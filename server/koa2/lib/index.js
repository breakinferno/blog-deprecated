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
    console.log("[ErrorHanlder]:" + err);
}

export function paramHandler(ctx, type = ['body']) {
    let data // 请求数据
    try {
        if (type.length === 1) {
            if (type.includes('body')) {
                data = ctx.request.body || {}
            }
            if (type.includes('query')) {
                data = ctx.query || {}
            }
            if (type.includes('params')) {
                data = ctx.params || {}
            }
        } else {
            if (type.includes('body')) {
                data['body'] = ctx.request.body || {}
            }
            if (type.includes('query')) {
                data['query'] = ctx.query || {}
            }
            if (type.includes('params')) {
                data['params'] = ctx.params || {}
            }
        }
    } catch (e) {
        errorHandler(e)
        ctx.response.status = 400
        ctx.body = {
            msg: 'Invalid Parameter!'
        }
    }
    return data;
}


export function Omit(obj, ignore = []) {
    return Object.keys(obj).reduce((o, p) => {
        if (!ignore.includes(p)) {
            o[p] = obj[p]
        }
        return o
    }, {})
}

export function transformDocToObj(doc, ignore = []) {
    let ret
    let origin = {
        ...doc.toObject()
    }
    let mustOmit = ['_id', '__v'].concat(ignore)
    ret = Omit(origin, mustOmit)
    return ret
}

export function composeResolver(resolvers = []) {
    let ret = {
        Query: {},
        Mutation: {}
    }
    resolvers.forEach(resolver => {
        resolver.Query && (ret.Query = {
            ...ret.Query,
            ...resolver.Query
        })
        resolver.Mutation && (ret.Mutation = {
            ...ret.Mutation,
            ...resolver.Mutation
        })
        ret = {
            ...ret,
            ...Omit(resolver, ["Query", "Mutation"])
        }
    })

    return ret
}

export function graphqlHanlder(ret) {
    if (ret.code === 200) {
        return ret.payload.data || {}
    } else {
        throw new Error('Interval Error')
    }
}

// export default {
//     getObjValue,
//     checkFields,
//     getFields,
//     errorHandler,
//     paramHandler,
//     transformDocToObj
// }