<template>
  <div>
    <el-button type="primary" @click="toPath">返回</el-button>
    <el-button @click="save" type="primary">保存</el-button>
    <div>
      <el-input v-model="model.title" placeholder="请输入文章标题"></el-input>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-input v-model="model.introduce" placeholder="请输入文章简介"></el-input>
    <!-- <mavon-editor v-model="model.articletext" @save="save(model)" /> -->
    <div style="height:600px;width:100%;">
      <docsify-md @save="save" ref="docsify" :articleData="model.articletext" class="docsify"></docsify-md>
    </div>
  </div>
</template>

<script>
import { setArticleNew, setArticle, getDataBySql } from '../../api/index.js'
export default {
  
  // props:["model"],

  data () {
    return {
      value: '',
      options: [],
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

      // this.initGetAritcle() // 获取文章数据 | 后期再整
      this.initSelectData() // 获取
    },

    initGetAritcle () { // (API)获取文章数据 | 2019.4.21 朱昆鹏
      // 数据这里后期再整吧
      // console.log('PK是？', this.model.pk)
    },

    initSelectData () { //（API）拿到下拉框的所有值，和当前选中的值，前台要传过来一个文章PK，然后剩下的我们自己查

      // 拿到当前文章的类型
      let sql = `SELECT name FROM blog_type WHERE pk = (SELECT pk_article_type FROM blog_article WHERE pk = '${this.model.pk}')`
      getDataBySql({sql}).then( res => {
        console.log('res', res)
        if (res.data.length > 0) {
          // 错误处理啥的没做
          this.value = res.data[0].name
        }
      })

      // 拿到所有的类型
      let sql1 = `SELECT * FROM blog_type WHERE dr = 1`
      getDataBySql({sql:sql1}).then( res => {
        // console.log('res1', res)
        res.data.forEach( item => {
          this.options.push({
            value: item.pk,
            label: item.name
          })
        })
      })

    },

    save () { // 保存方法（新的是保存，旧的是修改）
      // 获取内容
      this.model.articletext = this.$refs.docsify.getArticleText()

      // 获取 value
      if (/\w{8}(-\w{4}){3}-\w{12}|1/.test(this.value)) { // 判断类型是否为 UUID 或者 1
        this.model.value = this.value
      } else {
        // console.log('首字母是汉字')
        this.options.forEach( item => {
          if (item.label === this.value) {
            this.model.value = item.value
          }
        })
      }

      // console.log('this.model', this.model)
      if (this.isOne) { // 如果是第一次的话，那就是创建
        setArticleNew(this.model).then( res => {
          // console.log('res', res)
          if (res.data.affectedRows > 0) {
            this.$message.success('创建成功')
          }
        })
        this.isOne = false
      } else { // 大于一次的话，就是 保存了
        this.saveType() // 保存类型
        setArticle(this.model).then(  res => {
          console.log(res)
          if (res.data.changedRows > 0) {
            this.$message.success('保存成功')
          }
        })
      }
    },

    saveType () { // (API事件) 保存类型 | 运用了一些复杂的逻辑
      let value = ''
      // /\w/.test(this.value.split('')[0])
      if (/\w{8}(-\w{4}){3}-\w{12}|1/.test(this.value)) { // 判断类型是否为 UUID 或者 1
        value = this.value
      } else {
        // console.log('首字母是汉字')
        this.options.forEach( item => {
          if (item.label === this.value) {
            value = item.value
          }
        })
      }
      // console.log('value', value)
      let sql = `UPDATE blog_article SET pk_article_type = '${value}' WHERE pk = '${this.model.pk}'`
      getDataBySql({sql}).then( res => {
        console.log('保存类型API', res)
      })
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

