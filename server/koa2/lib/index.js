//一些共有的工具方法
import { Common } from '../config'
import Code from '../constant/httpStatus'
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
        ctx.response.status = Code.BAD_REQUEST
        ctx.body = {
            msg: 'Invalid Parameter!'
        }
        throw new Error('Invalid Parameter!')
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
    origin['id'] = origin['_id']
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

export function mapRequestAction(method) {
    const { scope } = Common.privileges
    let map = {
        get: scope.retrieve,
        post: scope.create,
        patch: scope.update,
        put: scope.update,
        delete: scope.delete
    }
    return map[method.toLowerCase()]
}

export function graphqlHanlder(ret) {
    if (ret.code === Code.OK) {
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