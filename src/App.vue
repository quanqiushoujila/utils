<template>
  <div id="app">
    <div class="app-contailer">
      <router-link to="/">首页</router-link>
      <router-link to="/tabletree">tabletree</router-link>
      <router-link to="/dialog">dialog</router-link>
      <router-link to="/detail">detail</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
h1 {
  text-align: center;
}
#app .app-contailer {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
