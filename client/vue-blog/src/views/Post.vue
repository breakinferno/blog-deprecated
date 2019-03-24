<template>
    <div class="post">
        <header>
            <h1>This is an post page</h1>
        </header>
        <section>
            <viewer :value="txt"></viewer>
        </section>
        <footer></footer>
    </div>
</template>
<script>
import { Viewer } from '@toast-ui/vue-editor'
import 'tui-editor/dist/tui-editor-contents.css'
import 'highlight.js/styles/github.css'
const content = `# $scope
$scope，作用域，即控制范围，表示某个范围数据和视图都由它管。比如
表示id为ctrl的div被exampleCtrl控制，这个范围下的数据都在其scope控制下

## 作用

作用域基本功能
- 提供观察者以监视数据模型的变化
- 可以将数据模型的变化通知给整个应用，甚至是系统外的组件
- 可以进行嵌套，隔离业务功能和数据
- 给表达式提供运算时所需的执行环境

**作用域包含了渲染视图时所需的功能和数据，它是所有视图的唯一源头。可以将作用域理解成视图模型（view model）。**

## 生命周期

**创建：** 在创建控制器或指令时，AngularJS会用$injector创建一个新的作用域，并在这个新建的控制器或指令运行时将作用域传递进去。

**链接：** 当Angular开始运行时，所有的$scope对象都会附加或者链接到视图中。所有创建$scope对象的函数也会将自身附加到视图中。这些作用域将会注册当Angular应用上下文中发生变化时需要运行的函数。

> 这些函数被称为$watch函数，Angular通过这些函数获知何时启动事件循环。

**更新：** 当事件循环运行时，它通常执行在顶层$scope对象上（被称作$rootScope），每个子作用域都执行自己的脏值检测。每个监控函数都会检查变化。如果检测到任意变化，$scope对象就会触发指定的回调函数。

**销毁：** 当一个$scope在视图中不再需要时，这个作用域将会清理和销毁自己。

> 尽管永远不会需要清理作用域（因为Angular会为你处理），但是知道是谁创建了这个作用域还是有用的，因为你可以使用这个$scope上叫做$destory()的方法来清理这个作用域。

**scope的继承类似于js的原型继承.即先在自己的scope中查找属性，如果没找到则到父级scope中查找，直到rootScope。没有就报错**

下面几种情况会产生scope:

- ng-repeat
- ng-switch
- ng-view
- ng-controller
- 带有 scope: true 的指令
- 带有 transclude: true 的指令
以下指令创建新的scope, 且在原型上 不继承 父scope:

- 带有 scope: { ... } 的指令, 这会创建一个 独立的scope (isolate scope)
注意: 默认指令并不会创建 scope, 默认是 scope: false, 通常称之为 共享scope.


#### ng-repeat

[源码在这里](https://github.com/angular/angular.js/blob/ad7ea953868ac8ee376e8a44472793659cdd0589/src/ng/directive/ngRepeat.js)

**JS:**

    $scope.myArrayOfPrimitives = [ 11, 22 ];
    $scope.myArrayOfObjects    = [{num: 101}, {num: 202}]

**HTML:**

    <ul><li ng-repeat="num in myArrayOfPrimitives">
        <input ng-model="num"></input>
        </li>
    </ul>
    <ul><li ng-repeat="obj in myArrayOfObjects">
        <input ng-model="obj.num"></input>
        </li>
    </ul>

这个指令有点特殊，每次repeat都会新建一个新的scope，每个scope都会在原型上继承父级的scope.所以如果迭代对象是一个primitive，则每个值会复制到每个scope属性上。如果迭代的对象为object,则其引用会被赋值给scope属性，具体如图：

primitive:

![primitive](https://github.com/breakinferno/images/blob/master/blog/angular/primitive.png)

object:

![object](https://github.com/breakinferno/images/blob/master/blog/angular/object.png)

ng-include、ng-switch、ng-view 、ng-controller类似

#### 指令

- scope: false(默认的), 指令不会创建新的 scope, 没有继承关系. 与 $parent 共享 $scope.
- scope: true, 指令会创建一个 子scope, 并在原型上继承 $parent. 如果在一个 DOM 上有多个指令想要创建新的 - scope, 会报错.
- scope: { ... }, 指令会创建一个 孤立的scope. 这在创建可重用的组件时是最好的选择. 但是, 即使如此, 指令还是希望读取 $parent 的数据. 这个时候可以使用如下符号获得:
    - scope: { **: "="} 与 $parent 建立双向绑定.
    - scope: { **: "@"} 与 $parent 建立单向绑定.
    - scope: { **: "&"} 绑定 $parent 的表达式.
想要获得相应的属性, 必须通过指令上的属性获得
    - HTML: <div my-directive the-Parent-Prop=parentProp>
    - JS: scope: { localProp: '@theParentProp' }
- HTML: <my-directive interpolated="" twowayBinding="parentProp2">
- JS: scope: { interpolatedProp: '@interpolated', twowayBindingProp: '=twowayBinding' }
- 指令在 link 期间: scope.someIsolateProp = "I'm isolated"

其中的关系如图:

![directive](https://github.com/breakinferno/images/blob/master/blog/angular/directive.png)

- transclude: true, 指令创建了一个 “transcluded” 的子scope, 在原型上继承其 父scope. 如果上述例子同时具有transclude: true. 那么这个 “transcluded” scope, 和 “islolated” scope 是姊妹关系. 他们的 $parent 指向同一个 scope. 且 isolate scope 的 $$nextSibling 就是这个 “transcluded scope”. 下图反应了他们之间的关系:

![directive2](https://github.com/breakinferno/images/blob/master/blog/angular/directive2.png)

## 参考

[源码看scope](http://www.aliued.com/?p=3180)
[作用域与事件](https://github.com/xufei/blog/issues/18)`
export default {
  components: {
    Viewer
  },
  data () {
    return {
      txt: content
    }
  }
}
</script>

<style lang="less" scoped>
.post {
  background: rgba(250, 250, 250, 0.8) none repeat scroll !important;
  border-radius: 10px;
  padding: 45px 30px 40px 30px;
  header > h1 {
    position: relative;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    line-height: 1.5;
    font-family: Lato, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }
  & /deep/ .tui-editor-contents p,
  & /deep/ .tui-editor-contents li,
   {
    font-weight: 400;
    font-size: 15px;
    font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
    text-rendering: optimizeLegibility;
    color: #333;
  }
}
</style>
