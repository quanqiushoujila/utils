<template>
  <div>
     <neditor-wrap toolbars-simply v-model="content" :config="config" :destroy="false"></neditor-wrap>
     <div v-html="content"></div>
  </div>
</template>
<script>
import neditorWrapMixin from '@/mixins/neditorWrap'
export default {
  mixins: [neditorWrapMixin],
  data () {
    return {
      content:
      `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`
    }
  }
}
</script>
