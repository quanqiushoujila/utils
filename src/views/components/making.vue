<template>
  <fm-making-form ref="makingForm" upload preview generate-code generate-json v-model="data">
    <template slot="action">
    </template>
  </fm-making-form>
</template>

<script>
import Vue from 'vue'
import FormMaking from '@/components/FormMaking/index.js'
Vue.use(FormMaking)
export default {
  mounted () {
  },
  data () {
    return {
      type: {
        textarea: 'textarea',
        input: 'input',
        time: 'time',
        date: 'date'
      },
      data: [
        {
          type: 'input',
          name: '输入框'
        },
        {
          type: 'textarea',
          name: '大输入框'
        }
      ]
    }
  }
}
</script>
