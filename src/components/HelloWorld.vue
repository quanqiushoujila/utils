<template>
  <div class="hello">
    <h1>数据双向绑定</h1>
    <el-input v-model="name" style="width: 200px"></el-input>
    <h4>{{ name }}</h4>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      name: ''
    }
  }
}
</script>
