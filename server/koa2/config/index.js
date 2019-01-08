export const MongoDB = {
    url: 'mongodb://localhost/blog', // 如果host没配localhost会报错 请注意这一点
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
    port: 8888
}