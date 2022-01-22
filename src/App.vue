<template>
  <div id="app">
    <main-tab-bar />
    <router-view />
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  components: {
    MainTabBar,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style  scoped>
@import 'assets/css/base.css';
</style>
