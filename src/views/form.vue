<template>
  <div>
    <h1>表单输入绑定</h1>
    <div>
      <input v-model="message">
      <p>Message is: {{ message }}</p>
    </div>
    <br>
    <div>
      <input type="checkbox" name="checkedNames" value="Jack" v-model="checkedNames">
      <label for="jack">Jack</label>
      <input type="checkbox" name="checkedNames" value="John" v-model="checkedNames">
      <label for="john">John</label>
      <input type="checkbox" name="checkedNames" value="Mike" v-model="checkedNames">
      <label for="mike">Mike</label>
      <br>
      <span>Checked names: {{ checkedNames }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: '',
      checkedNames: []
    }
  }
}
</script>
