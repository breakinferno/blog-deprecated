/*
 * @Author: breakinferno 
 * @Date: 2019-01-08 20:24:40 
 * @Last Modified by: breakinferno
 * @Last Modified time: 2019-01-08 21:08:39
 */

export default function(privilege, ctx) {
    const { level, scope } = privilege
    if (level === 'admin') {
        return true
    }
}