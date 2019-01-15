<template>
  <div>
    <a :href="url" target="_blank">pdf</a>
    <govpdf :url="url"/>
  </div>
</template>
<script>
import govpdf from '@/components/pdf'
export default {
  components: {govpdf},
  data () {
    return {
      url: './static/20190107150817_1d76b7b7g2.pdf'
    }
  }
}
</script>
