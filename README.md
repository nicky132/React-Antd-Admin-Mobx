
## 为何在 Modal 中调用 form 控制台会报错？

Warning: Instance created by useForm is not connect to any Form element. Forget to pass form prop?

这是因为你在调用 form 方法时，Modal 还未初始化导致 form 没有关联任何 Form 组件。你可以通过给 Modal 设置 forceRender 将其预渲染。示例点击此处。

[Modal & from 存在的问题](https://codesandbox.io/s/antd-reproduction-template-ibu5c?file=/index.js:380-394)
