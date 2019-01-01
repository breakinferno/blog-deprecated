export const MongoDB = {
    url: 'mongodb://localhost/blog'
}

export const Redis = {
    url: '[redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]',
    expire_time: 3 * 60 * 1000 // 3分钟
}

export const System = {
    db_type: 'mongodb',
    version: '1.0'
}