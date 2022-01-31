<template>
  <div class='toast' v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  // props: {
  //   message: {
  //     type: String,
  //     default: '',
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  data() {
    return {
      message: '',
      show: false,
    }
  },
  components: {},
  methods: {
    showToast(message, duration = 2000) {
      // duration = duration || 2000 //es5的参数默认值

      this.show = true
      this.message = message

      setTimeout(() => {
        this.show = false
        this.message = ''
      }, duration)
    },
  },
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 999;
}
</style>