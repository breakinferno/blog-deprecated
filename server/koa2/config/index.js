export const MongoDB = {
    url: 'mongodb://localhost/blog', // 如果host没配localhost会报错 请注意这一点
    delete_category: '废纸篓',
    default_tag_name: 'default',
    // 初始的管理员账号密码
    admin: {
        nick: 'root',
        password: '18dq128nfbreakIN',
        privilege: {
            level: 'admin',
            scope: ['UPDATE', 'CREATE', 'DELETE', 'RETRIEVE']
        }
    }
}

export const Redis = {
    url: '[redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]',
    expire_time: 3 * 60 * 1000 // 3分钟
}

export const System = {
    db_type: 'mongodb',
    version: '1.0',
    port: 8888,
}

export const Common = {
    post_overview_length: 200,
    privileges: {
        level: {
            admin: 'admin',
            user: 'user',
            visitor: 'visitor'
        },
        scope: {
            create: 'CREATE',
            update: 'UPDATE',
            retrieve: 'RETRIEVE',
            delete: 'DELETE'
        }
    }
}