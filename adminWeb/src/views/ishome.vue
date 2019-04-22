<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu
          :router="true"
          :unique-opened="true"
          :collapse="isCollapse"
          class="el-menu-admin"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!-- 下面可以用数组来优化，这样写有点乱 -->
          <!-- 1.文章管理 -->
          <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>文章管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/"><i class="el-icon-menu"></i>文章管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="/type"><i class="el-icon-menu"></i>文章分类管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 2.数据统计 -->
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
          <!-- 3. 静态资源管理 -->
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">静态资源管理</span>
          </el-menu-item>
          <!-- 3.个人设置 -->
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
          <!-- 4.用户管理 表示开放登录注册权限这一块的东西了 -->
          <el-menu-item index="5" disabled>
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理（暂定）</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>

        <!-- header部分 -->
        <el-header>
          <!-- <i class="myicon myicon-menu toggle-btn"></i> -->
          <el-button type="text" @click="toggleCollapse">{{headerLeft}}</el-button>
          <div class="system-title">管理系统</div>
          <div>
            <span class="welcome">
              您好
            </span>
            <el-button type="text">退出</el-button>
          </div>
        </el-header>

        <!-- 中间内容部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      headerLeft: '<-关闭'
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      this.isCollapse ? this.headerLeft = '打开->' : this.headerLeft = '<-关闭'
    },
  }

}
</script>


<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    // background: url(../assets/logo.png);
    background-size: cover;
    background-color: #989898;
  }
  .toggle-btn {
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
