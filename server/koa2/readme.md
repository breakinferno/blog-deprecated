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

既支持restful风格api ，也支持Graphql请求

## 开始

```
npm run dev
```

## Restful
 
`GET => localhost:8888/users/b9c2c8e7-0351-4b3b-a7a6-a189a2c81126`

## Graphql

进入`localhost:8888/graphql`,输入对应的query语句或者mutation语句即可

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

