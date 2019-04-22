<template>
  <div>
    <div class="test1">
      <template v-for="item in cardDatas">
        <z-card :key="item.title" :cardData="item"></z-card>
      </template>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="nums">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import zCard from '../components/Card/index'
import { getArticletext, getDataBySql } from '../api/index.js'

export default {
  components: {
    zCard
  },


  data() {
    return {
      sql: '', // 拼接的SQL语句，用于初始化数据
      pageNum: 1, // 当前是第几页，默认为1
      pageShowNums: 5, // 每页显示几个
      nums: 0, // 分页的总数
      currentPage: 1,
      cardDatas: [] // card数据
    }
  },

  mounted () {
    this.init()
  },

  methods: {

    init () { //（初始化）| 2019.4.22 朱
      this.initBySizeSql()
      this.initGetNumsCount() // 获取总数
      this.initGetData()
    },

    initGetNumsCount () { // (API) 获取数据总数 | 2019.4.22 朱
      getDataBySql({sql:`SELECT COUNT(1) as nums FROM blog_article WHERE dr = '1'`}).then( res => {
        // console.log('数据', res)
        this.nums = res.data[0].nums
      })
    },

    initBySizeSql () { // (SQL拼接) 拼接SQL | 2019.4.22 朱
      // console.log('当前是第几页', this.pageNum)
      // console.log('每页显示结果', this.pageShowNums)
      this.sql = `SELECT * FROM blog_article WHERE dr = '1' ORDER BY changetime DESC limit ${(this.pageShowNums * (this.pageNum - 1))},${this.pageShowNums}`
      // console.log('sql语句是', this.sql)
    },

    initGetData () { // (API) 获取详细的数据，根据拼接的SQL | 2019.4.22 朱
      getDataBySql({sql:this.sql}).then( res => {
        // console.log('数据', res)
        this.cardDatas = res.data
      })
    },

    handleSizeChange(val) { //（事件）触发每页分页条数改变 | 2019.4.22 朱
      this.pageShowNums = val
      // console.log(`每页 ${val} 条`)
      this.initBySizeSql()
      this.initGetData()
    },

    handleCurrentChange(val) { //（事件）触发当前页改变 | 2019.4.22 朱
      this.pageNum = val
      // console.log(`当前页: ${val}`)
      this.initBySizeSql()
      this.initGetData()
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
