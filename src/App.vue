<template>
  <div id="app">
    <router-link to="/">首页</router-link>
    <router-link to="/filter">过滤器</router-link>
    <router-link to="/life">生命周期</router-link>
    <router-link to="/class">Class</router-link>
    <router-link to="/style">Style</router-link>
    <router-link to="/if">条件渲染</router-link>
    <router-link to="/for">列表渲染</router-link>
    <router-link to="/form">表单输入绑定</router-link>
    <router-link to="/component">组件复用</router-link>
    <router-link to="/slot">插槽</router-link>
    <router-link to="/prop">prop</router-link>
    <router-link to="/mixin">混入</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
