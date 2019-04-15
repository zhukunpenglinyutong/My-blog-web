<template>
  <div>
    <router-link to="/md"><el-button type="primary">添加文章</el-button></router-link>
    <el-button type="primary" @click="dialogTableVisible = true">添加分类</el-button>
    <el-table
      :data="table"
      stripe
      border
      style="width: 100%;overflow: auto;height: 700px;">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="introduce"
        label="简介">
      </el-table-column>
      <el-table-column
        prop="lasttime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="changetime"
        label="修改时间">
      </el-table-column>
      <el-table-column
        prop="blog_type_pk"
        label="类型">
      </el-table-column>
      <el-table-column
        align="right"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <router-link to="/md">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加分类弹出层 -->
    <el-dialog width="30%" title="添加分类" :visible.sync="dialogTableVisible">
      <el-input v-model="addTypeName" placeholder="请输入类型名称"></el-input>
      <el-button @click="addBlogType">确定</el-button>
    </el-dialog>

  </div>
</template>

<script>
import { getArticletext, delectArticle, setType } from '../api/index.js'

export default {
  data () {
    return {
      dialogTableVisible: false, // 控制 添加类型弹出层
      addTypeName: '', // 添加类型 输入的名字
      table: null, // 表示传递 编辑组件的数据
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$store.commit('modelClear') // 进入首先清除一下，防止从 md 跳转过来，数据还有
      this.initGetData()
    },
    initGetData () { //（分担 init函数职责） 获取所有表格数据的方法
      getArticletext('article/getarticles').then( res => {
        // console.log(res)
        this.table = res.data
      })
    },
    handleEdit (index, data) { //（事件触发 --> API） 编辑
      console.log('点击数据',data)
      this.$store.commit('setModel', data)
    },
    handleDelete (index, data) { //（事件触发 --> API） 删除
      this.$confirm('是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delectArticle({pk:data.pk}).then( res => {
            if (res.data.affectedRows > 0) {
              this.initGetData()
              this.$message.success('删除成功')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addBlogType () { //（事件触发 --> API）添加分类 | 2019.4.1 朱昆鹏
      setType({name: this.addTypeName}).then( res => {
        console.log('res', res)
        if (res.error == 0) {
          this.$message.success('添加成功')
          this.addTypeName = ''
          this.dialogTableVisible = false
        }
      })
    }
  }
}
</script>
