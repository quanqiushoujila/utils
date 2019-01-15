<template>
  <div class="pdf-container">
    {{currentPage}} / {{pageCount}}
    <pdf
      :src="url"
      @progress="loadedRatio = $event"
      @num-pages="pageCount = $event"
      @page-loaded="currentPage = $event"></pdf>
  </div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  name: 'govpdf',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  components: {
    pdf
  },
  data () {
    return {
      currentPage: 0,
      pageCount: 0,
      loadedRatio: 0
    }
  }
}
</script>
