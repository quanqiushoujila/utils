<template>
  <div>
    <a :href="url" target="_blank">pdf</a>
    <pdf :url="url"/>
  </div>
</template>
<script>
import Pdf from '@/components/Pdf'
export default {
  components: {Pdf},
  data () {
    return {
      url: './static/20190107150817_1d76b7b7g2.pdf'
    }
  }
}
</script>
