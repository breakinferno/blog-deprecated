需要重构：

要点： 1. 异常处理 2. log 处理

采取 es6 语法

校验方式 cookie+session 或者 token

save

统一实现接口

// 删除

delete(target)

// 获取资源

get(target, fields)

// 新建资源

post(obj)

// 全部更改

put(target, obj)

// 部分更改

patch(target, fieldMap)

## 概览

既支持 restful 风格 api ，也支持 Graphql 请求

## 开始

```
npm run dev
```

## Restful

`GET => localhost:8888/users/b9c2c8e7-0351-4b3b-a7a6-a189a2c81126`

## Graphql

进入`localhost:8888/graphql`,输入对应的 query 语句或者 mutation 语句即可

### query

```
{
  user(id: "b9c2c8e7-0351-4b3b-a7a6-a189a2c81126"){
    nick
  }
}
// 或者（因为query默认)
query{
  user(id: "b9c2c8e7-0351-4b3b-a7a6-a189a2c81126"){
    nick
  }
}
```

### mutation

```
mutation {
  addUser(input: {
    nick: "mutation",
    avatar: "haha",
    meta: {
      age: 333
    }
  }){
    nick,
    meta{
      age
    }
  }
}

```

分层设计： service 面向数据库，后端 log
controller 面向 client， 可对错误进行自行处理
