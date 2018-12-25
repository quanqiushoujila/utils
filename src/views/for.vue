<template>
  <div>
    <h1>列表渲染</h1>
    <ul id="example-2">
      <li v-for="(item, index) in items" :key="index">
        index: {{ index }}---item: {{ item.message }}
      </li>
    </ul>
    <div v-for="(value, key) in object">
      {{ key }}: {{ value }}
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ],
      object: {
        firstName: 'John',
        lastName: 'Doe',
        age: 30
      }
    }
  }
}
</script>
