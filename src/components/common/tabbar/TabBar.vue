<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  /* 固定布局同时给左右为零会铺满纵向屏幕或上下会铺满横向向屏幕 */
  bottom: 0;
  right: 0;
  left: 0;
  box-shadow: 0px -1px 3px rgba(100, 100, 100, 0.4);
  z-index: 9;
  background-color: #f6f6f6;
}
</style>