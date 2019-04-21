<template>
  <div>
    <docsify-md ref="docsify" :articleData="data" class="docsify"></docsify-md>
  </div>
</template>

<script>
import docsifyMd from '../components/docsify-md/index.vue'

export default {
  
  data () {
    return {
      data: []  
    }
  },

  components: {
    docsifyMd
  },

  created () {
    // 赋值属性 
    this.data = this.$store.state.mdModel
    // console.log('md渲染组件 data', this.data)
  }

}
</script>

