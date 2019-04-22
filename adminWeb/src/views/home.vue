<template>
  <div>
    <div>
      <!-- 添加文章 -->
      <router-link to="/md"><el-button type="primary">添加文章</el-button></router-link>
      <!-- 选择类型：默认为全部 -->
      <el-select v-model="valueType" @change='TypeFun' placeholder="请选择类型">
        <el-option
          v-for="item in optionsType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!-- 选择时间：默认为最近7天 -->
      <el-select v-model="valueTime" @change='timeFun' placeholder="请选择时间">
        <el-option
          v-for="item in optionsTime"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-table
      :data="table"
      stripe
      @cell-dblclick='dblclick'
      border
      style="width: 100%;overflow: auto;height: 625px;">
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

  </div>
</template>

<script>
import { getArticletext, delectArticle, getDataBySql } from '../api/index.js'

export default {
  data () {
    return {
      optionsType: [],
      valueType: '全部', // 选择筛选的类型
      isTypeChang: false,

      optionsTime: [
        {
          value: 'to_days(lasttime) = to_days(now()) AND',
          label: '今天'
        },
        {
          value: 'to_days(NOW()) - TO_DAYS(lasttime) = 1 AND',
          label: '昨天'
        },
        {
          value: 'date_sub(CURDATE(),INTERVAL 7 DAY) < DATE(lasttime) AND',
          label: '近7天'
        },
        {
          value: 'DATE_SUB(CURDATE(), INTERVAL 30 DAY) < date(lasttime) AND',
          label: '近30天'
        },
        {
          value: '',
          label: '全部'
        },
      ],
      valueTime: '近7天', // 选择筛选的时间
      isTimeChang: false, // 筛选事件是否改变
      
      sql: '', // 用于最后执行的SQL语句
      table: null, // 表示传递 编辑组件的数据
    }
  },
  created () {
    this.init()
  },
  methods: {

    init () {
      this.$store.commit('modelClear') // 进入首先清除一下，防止从 md 跳转过来，数据还有
      this.initSelectData() // 获取下拉类型数据
      this.initScreenSql() // 走筛选拿取数据
      this.initGetData()
    },

    initSelectData () { //（API）获取下了类型数据
      // 拿到所有的类型
      let sql = `SELECT * FROM blog_type WHERE dr = 1`
      getDataBySql({sql}).then( res => {
        // console.log('res1', res)
        res.data.forEach( item => {
          this.optionsType.push({
            value: item.pk,
            label: item.name
          })
        })
        this.optionsType.push({
          value: '',
          label: '全部'
        })
      })
    },

    initScreenSql () { // (拼接SQL) 主要负责拼接 类型 和 时间区间的SQL
      // console.log('时间区间是', this.valueTime)
      // console.log('类型是', this.valueType)

      let sql = ''
      let timeSql = ''

      // 还要加个前置条件，就是判断用户到底点没点 select，没点的话，要走 forEach 循环了
      if (this.isTimeChang) {
        timeSql = this.valueTime
      } else {
        this.optionsTime.forEach( item => {
          if (item.label == this.valueTime) {
            timeSql = item.value
          }
        })
      }

      sql = `select * from blog_article where ${timeSql} dr = '1'` 

      if (this.isTypeChang && this.valueType != '') {
        sql = sql + `AND pk_article_type = '${this.valueType}'`
      }
      
      // 时间筛选SQL，目前主要是这个
      this.sql = sql + 'ORDER BY changetime DESC;'
      // console.log('sql', this.sql)
    },

    TypeFun () { //（下拉事件触发）分类筛选
      this.isTypeChang = true
      // 执行SQL
      this.initScreenSql()
      this.initGetData()
    },

    timeFun () { //（下拉事件触发）时间段筛选
      this.isTimeChang = true
      // 执行SQL
      this.initScreenSql()
      this.initGetData()
    },

    initGetData () { //（API） 获取所有表格数据的方法
      getDataBySql({sql: this.sql}).then( res => {
        this.table = res.data
      })
    },

    handleEdit (index, data) { //（事件触发 --> API） 编辑
      // console.log('点击数据',data)
      this.$store.commit('setModel', data)
    },

    handleDelete (index, data) { //（事件触发 --> API） 删除 | 2019.4.22 朱
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

    dblclick (row) { // (事件) 双击事件 | 2019.4.22 朱
      // console.log('双击事件', row)
      this.$store.commit('setModel', row)
      this.$router.push({path:'/md'})
    }

  }
}
</script>
