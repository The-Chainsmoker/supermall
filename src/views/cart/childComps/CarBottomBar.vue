<template>
  <div class='bottom-bar'>
    <div class="check-content">
      <check-button class="check-button" :isChecked="allCheck" @click.native="checkClick" />
      <span>全选</span>

      <div class="price">
        合计:{{totalPrice}}
      </div>

      <div class="calculate" @click="calcClick">
        去计算:{{checkLength}}
      </div>
    </div>

  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'

import { mapGetters } from 'vuex'
export default {
  name: 'CarBottomBar',
  data() {
    return {}
  },
  components: { CheckButton },
  computed: {
    ...mapGetters(['cartList']), //getters不是响应式

    //计算全部的商品价格
    totalPrice() {
      return this.cartList
        .filter((item) => {
          return item.check
        }) //选中的商品
        .reduce((preItem, nowItem) => {
          return preItem + nowItem.price * nowItem.count
        }, 0)
        .toFixed(2)
    },
    checkLength() {
      return this.cartList.filter((item) => {
        return item.check
      }).length
    },
    //反选功能
    allCheck() {
      //方法一
      // if (this.cartList.length !== 0 && this.cartList.length === this.checkLength) {
      //   return true
      // } else {
      //   return false
      // }

      //方法二
      //反方向判断:如果所有商品的check都为true则全部取反则获取的长度为0再取反为true
      // return (
      //   this.cartList.length !== 0 &&
      //   !this.cartList.filter((item) => {
      //     return !item.check
      //   }).length
      // )

      //方法三
      //反方向判断 找有一个没有选中的商品为true,取反false
      return this.cartList.length !== 0 && !this.cartList.find((item) => !item.check)
    },
  },
  methods: {
    //全选功能
    checkClick() {
      //计算属性不支持在其他地方修改值,只能在内部set方法中配合data的属性改变
      if (this.allCheck) {
        this.cartList.forEach((item) => (item.check = false))
        //每一个商品的按钮取消,触发checkClick监听属性即全选按钮取消
      } else {
        this.cartList.forEach((item) => (item.check = true))
        //每一个商品的按钮选中,触发checkClick监听属性即全选按钮选中
      }
    },

    calcClick() {
      const result = this.cartList.find((item) => item.check) //找出选中的商品
      if (!result) {
        //没有选中的商品话为true
        this.$toast.showToast('还没选择商品')
      }
    },
  },
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  position: relative;
}

.check-content {
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  background-color: #eeedef;
}

.check-button {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 30px;
  flex: 1;
}

.calculate {
  height: 40px;
  width: 90px;
  line-height: 40px;
  text-align: center;
  background-color: var(--color-tint);
}
</style>