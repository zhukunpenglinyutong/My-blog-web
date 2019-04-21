<template>
  <div>
    <el-button type="primary" @click="dialogTableVisible = true">添加分类</el-button>
    <el-table
      :data="table"
      stripe
      border
      style="width: 100%;overflow: auto;height: 625px;">
      <el-table-column
        prop="name"
        label="类型名称">
      </el-table-column>
      <el-table-column
        prop="icourl"
        label="图标地址">
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
        align="right"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

    <!-- 编辑分类弹出层 -->
    <el-dialog width="30%" title="编辑分类" :visible.sync="dialogTableVisible1">
      <el-input v-model="addTypeName1" placeholder="请输入类型名称"></el-input>
      <el-button @click="addBlogType1">确定</el-button>
    </el-dialog>

  </div>
</template>

<script>
import { getTypes, insertType, updateType, delectType } from '../api/index.js'

export default {
  data () {
    return {
      dialogTableVisible: false, // 控制 添加类型弹出层
      dialogTableVisible1: false, // 控制 编辑类型弹出层
      addTypeName: '', // 添加类型 输入的名字
      addTypeName1: '', // 编辑类型 输入的名字
      table: null, // 表示传递 编辑组件的数据
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.initGetData()
    },
    initGetData () { //（分担 init函数职责） 获取所有表格数据的方法
      getTypes('type/gettypes').then( res => {
        console.log(res)
        this.table = res.data
      })
    },
    handleEdit (index, data) { //（事件触发 --> API） 编辑类型
      console.log('点击数据',data)

      this.dialogTableVisible1 = true // 调出弹框
      this.addTypeName1 = data.name
    },
    handleDelete (index, data) { //（事件触发 --> API） 删除类型
      this.$confirm('是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delectType({pk:data.pk}).then( res => {
            if (res.data.affectedRows > 0) {
              this.$message.success('删除成功')
              this.initGetData() // 刷新表格
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addBlogType () { //（事件触发 --> API）添加类型 | 2019.4.18 朱昆鹏
      this.addTypeName = ''
      insertType({name: this.addTypeName}).then( res => {
        console.log('res', res)
        if (res.error == 0) {
          this.$message.success('添加成功')
          this.dialogTableVisible = false
          this.initGetData() // 执行获取table数据，刷新table
        }
      })
    },
    addBlogType1 () {
      
    }
  }
}
</script>
