<template>
  <div class="z_card" @click="clickCard">
    <!-- 标题 -->
    <h3>{{cardData.title}}</h3>
    <div class="z_card_con flex space2">
      <!-- 文字 -->
      <div class="z_card_con_text1 flex ranks_y space1">
        <div class="z_card_con_text">{{cardData.introduce}}</div>
        <a href="javascript:;" class="z_card_con_text_a">阅读全文</a>
      </div>
      <!-- 右侧图片 -->
      <div class="z_card_con_img">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "cardData" ],
  methods: {
    clickCard () {
      console.log('触发了点击事件', this.cardData.articletext)
      // 路由跳转，并传递数据 | 通过vuex么？
      // setModel
      this.$store.commit('setModel', this.cardData.articletext)
      // 路由跳转
      this.$router.push({path:'/article'})
    }
  }
}
</script>

<style>
  @import url('./index.css');
</style>
