<template>
  <div class="editor-mian">
    <!-- 右侧展示区域 editor-docsify -->
    <div class="editor-docsify">
      <div id="app"></div>
    </div>
  </div>
</template>

<script>
import initRun from './Docsify-md-vue-component/library/docsify/docsify.js'
export default {
  data () {
    return {
      editorData: 'login...... 世界等着你改变'
    }
  },

  props: ['articleData'],

  // 启动
  mounted () {
    initRun()
    // console.log('articleData', this.articleData)
    this.editorData = this.articleData
    // 第一次赋值
    window.Docsify.againInit(this.editorData)
  },

  methods: {

    // 返给父组件值 | 如果有 v-model 就不需要这一步了
    getArticleText () {
      // console.log('返给父组件的值', this.editorData)
      return this.editorData
    },

    // 值改变触发，如果触发泰国频繁可以考虑 | 节流 或者更换事件的方法
    editorDataInputFn () {
      // console.log(window)
      // console.log('改变了', this.editorData)
      window.Docsify.againInit(this.editorData)
    },

    save () {
      // console.log('触发保存方法，Mac系统下暂时不成功，只能用 ctrl + s的方式保存')
      
      // 触发父组件的保存方法
      this.$emit('save')
    }

  }
}
</script>


<style scoped>
@import url('./Docsify-md-vue-component/library/icss/index.css');
@import url('./Docsify-md-vue-component/library/docsify/vue.css');
@import url('./Docsify-md-vue-component/css/index.css');
</style>

