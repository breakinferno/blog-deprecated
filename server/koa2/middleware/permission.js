/*
 * @Author: breakinferno 
 * @Date: 2019-01-08 20:24:40 
 * @Last Modified by: breakinferno
 * @Last Modified time: 2019-01-09 13:44:41
 */
import { Common } from '../config'
import { mapRequestAction } from '../lib'
const privilege_level = Common.privileges.level
export default function(privilege, ctx) {
    const { level, scope } = privilege
    if (level === privilege_level.admin) {
        return true
    }
    let {method} = ctx.request
    if (level === privilege_level.user) {
        let item = mapRequestAction(method)
        return scope.includes(item) ? true : false
    }
    if (level === privilege_level.visitor) {
        return mapRequestAction(method) === Common.privileges.scope.retrieve
    }
}