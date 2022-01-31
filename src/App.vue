<template>
  <div id="app">
    <main-tab-bar />
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
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
