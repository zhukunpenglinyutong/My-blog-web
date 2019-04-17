<template>
  <div>
    <el-button type="primary" @click="toPath">返回</el-button>
    <el-button @click="save" type="primary">保存</el-button>
    <el-input v-model="model.title" placeholder="请输入文章标题"></el-input>
    <el-input v-model="model.introduce" placeholder="请输入文章简介"></el-input>
    <!-- <mavon-editor v-model="model.articletext" @save="save(model)" /> -->
    <div style="height:600px;width:100%;">
      <docsify-md @save="save" ref="docsify" :articleData="model.articletext" class="docsify"></docsify-md>
    </div>
  </div>
</template>

<script>
import { setArticleNew, setArticle } from '../api/index.js'
export default {
  // props:["model"],
  data () {
    return {
      model:{},
      isOne: true // 是否是第一次 创建？根据传过来的PK来判断，如果是新建的就没有PK
    }
  },
  created () {
    this.init() // 处理是创建 还是 保存的逻辑
  },
  methods: {
    init() {
      this.model = this.$store.state.mdModel
      console.log('this.model', this.model)
      if (this.model.pk) {
        this.isOne = false
      } else {
        this.isOne
      }
      // console.log(this.isOne)
    },

    save () { // 保存方法（新的是保存，旧的是修改）

      // 获取内容
      this.model.articletext = this.$refs.docsify.getArticleText()
      // console.log(this.isOne)
      // console.log('保存前数据', this.model)

      if (this.isOne) { // 如果是第一次的话，那就是创建
        setArticleNew(this.model).then( res => {
          // console.log('res', res)
          if (res.data.affectedRows > 0) {
            this.$message.success('创建成功')
          }
        })
        this.isOne = false
      } else { // 大于一次的话，就是 保存了
        setArticle(this.model).then(  res => {
          console.log(res)
          if (res.data.changedRows > 0) {
            this.$message.success('保存成功')
          }
        })
      }
    },

    // 跳转路由到首页
    toPath () {
      if (this.$refs.docsify.getArticleText() == this.model.articletext) { // 保存了
        this.$router.push({path: '/'})
      } else {
        this.$confirm('还未保存🤗 确认返回吗❓', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({path: '/'})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
}
</script>

