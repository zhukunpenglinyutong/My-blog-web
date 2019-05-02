<template>
  <div>
    <el-button type="primary" @click="addTypeFun">添加分类</el-button>
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
      <el-input v-model="addTypeName1"></el-input>
      <el-button @click="addBlogType1">确定</el-button>
    </el-dialog>

  </div>
</template>

<script>
import { getTypes, insertType, updateType, delectType } from '../../api/index.js'

export default {
  data () {
    return {
      dialogTableVisible: false, // 控制 添加类型弹出层
      dialogTableVisible1: false, // 控制 编辑类型弹出层
      addTypeName: '', // 添加类型 输入的名字
      addTypeName1: '', // 编辑类型 输入的名字
      pk: '', // 编辑类型中需要用到的PK
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
    initGetData () { //（分担 init函数职责） 获取所有表格数据的方法，其他方法也可以调用
      getTypes('type/gettypes').then( res => {
        console.log(res)
        this.table = res.data
      })
    },
    addTypeFun () { //（事件）添加分类
      // 开始
      this.addTypeName = ''
      this.dialogTableVisible = true
    },
    handleEdit (index, data) { //（事件）点击编辑触发
      console.log('点击数据',data)

      this.dialogTableVisible1 = true // 调出弹框
      this.addTypeName1 = data.name
      this.pk = data.pk
    },
    handleDelete (index, data) { //（API分类） 删除分类
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
    addBlogType () { //（API事件）添加分类 | 2019.4.18 朱昆鹏
      insertType({name: this.addTypeName}).then( res => {
        console.log('res', res)
        if (res.error == 0) {
          this.$message.success('添加成功')
          this.dialogTableVisible = false
          this.initGetData() // 执行获取table数据，刷新table
        }
      })
    },
    addBlogType1 () { // （API事件）编辑分类 | 2019.4.21 朱昆鹏
      let data = {
        name: this.addTypeName1,
        pk: this.pk
      }
      updateType(data).then( res => {
        console.log('res', res)
        this.dialogTableVisible1 = false
        if (res.data.changedRows > 0) {
          this.$message.success('修改成功')
          this.initGetData()
        }
      })
    }
  }
}
</script>
