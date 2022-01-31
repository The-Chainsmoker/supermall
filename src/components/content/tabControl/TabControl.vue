<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in titles" :key="index" @click="change(index)">
      <span :class="{'active':index===currentIndex}">{{item}}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    change(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    },
  },
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background: #fff;
}

.tab-control-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-high-text);
}

.tab-control-item span {
  padding: 5px;
}
</style>
