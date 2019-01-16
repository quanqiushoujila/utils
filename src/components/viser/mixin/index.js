export default {
  props: {
    height: {
      type: Number,
      default: 400
    },
    data: {
      type: Array,
      default: () => []
    },
    transform: {
      type: Object,
      default: () => {}
    }
  }
}
