<template>
  <div>
    <div class="test1">
      <template v-for="item in cardDatas">
        <z-card :key="item.title" :cardData="item"></z-card>
      </template>
    </div>
  </div>
</template>

<script>
import zCard from '../components/Card/index'
import { getArticletext } from '../api/index.js'

export default {
  components: {
    zCard
  },

  mounted () {

    // 拿去数据 | 2019.4.20
    getArticletext('article/getarticles').then( res => {
      // console.log('拿到的数据', res.data)
      this.cardDatas = res.data
    })
  },

  data() {
    return {
      cardDatas: [] // card数据
    }
  }
}
</script>

<style scoped>
.test1 {
  width: 1560px;
  margin: 0 auto;
  /* background-color: red; */
}
.con1 {
  margin:15px 25px;
}
.con1 .card {
  margin-bottom: 15px;
}
.z_card {
  margin: 10px;
}
</style>
