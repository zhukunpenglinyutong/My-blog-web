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
          background-color="#021029"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!-- 下面可以用数组来优化，这样写有点乱 -->
          <!-- 0. 总览页面 -->
          <el-menu-item index="/">
            <i class="el-icon-star-on"></i>
            <span slot="title">总览</span>
          </el-menu-item>
          <!-- 1.文章管理 -->
          <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>itzkp.com管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/article"><i class="el-icon-s-operation"></i>文章管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="/type"><i class="el-icon-s-flag"></i>文章分类管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/type" disabled><i class="el-icon-s-flag"></i>时间轴（做成可拖拽的最好）</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 2.数据统计 -->
          <el-menu-item index="/" disabled>
            <i class="el-icon-s-help"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
          <!-- 3. 静态资源管理 -->
          <el-menu-item index="/" disabled>
            <i class="el-icon-upload"></i>
            <span slot="title">静态资源管理</span>
          </el-menu-item>
          <!-- 4.个人设置 -->
          <el-menu-item index="/" disabled>
            <i class="el-icon-s-tools"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
          <!-- 5.用户管理 表示开放登录注册权限这一块的东西了 -->
          <el-menu-item index="/" disabled>
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理（暂定）</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>

        <!-- header部分 -->
        <el-header>
          <!-- <i class="myicon myicon-menu toggle-btn"></i> -->
          <!-- <el-button type="text" @click="toggleCollapse">{{headerLeft}}</el-button> -->
          <i :class="toggleCollapseIcon" @click="toggleCollapse"></i>
          <!-- <el-button type="primary" icon="el-icon-s-unfold"></el-button> -->
          <!-- <div class="system-title">管理系统</div> -->
          <div>
            <span class="welcome">
              您好
            </span>
            <el-button @click="signOut" type="text" style="margin-right:10px;">退出登录</el-button>
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
      toggleCollapseIcon: 'el-icon-s-fold el_header_i'
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      !this.isCollapse ? this.toggleCollapseIcon = 'el-icon-s-fold el_header_i' : this.toggleCollapseIcon = 'el-icon-s-unfold el_header_i'
    },

    signOut () { // 退出
      // 清除 token
      localStorage.removeItem('token')

      // 返回登录页
      this.$router.push({path: '/login'})
    }
  }

}
</script>


<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 250px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #021029;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 0;
  }
  .logo {
    height: 60px;
    // background: url(../assets/logo.png);
    background-size: cover;
    background-color: #061841;
  }
  .toggle-btn {
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
  }
  .system-title {
    font-size: 28px;
    color: #000;
  }
  .welcome {
    color: white;
  }
}
.el_header_i {
    cursor: pointer;
    height: 100%;
    width: 60px;
    text-align: center;
    font-size: 24px;
    color: #555;
    line-height: 60px;
}
.el_header_i:hover{
  background-color: #f9f9f9;
}
</style>

