---
meta:
  - name: description
  - content: hello

msg:
  - age: 2
  - name: zhangsan

something: 44
---

# guide页面
::: tip
This is a tip
:::

<!-- <h1>{{$page}}</h1> -->

:100:

[Home](/firstPage/)


``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```
插值：{{1+1}}