<template>
  <div class="login">
    <el-form ref="form" :model="form" class="container" :rules="rules">
      <el-form-item>
        <div class="avatar">
          <img src="../assets/avatar.jpg" alt="">
        </div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名" prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" prefix-icon="myicon myicon-key" type="password" @keydown.native.enter="loginSubmit('form')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="loginSubmit('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getDataBySql, login } from '../api/index.js'

export default {

  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {

    loginSubmit (formName) {
      this.$refs[formName].validate(valide => {
        
        // 只有校验通过，才执行函数
        if (valide) {
                    
          login({username: this.form.username, password: this.form.password}).then( res => {
            if (res.error == -1) {
              this.$message.error(res.message)
            } else {
              console.log('res', res)
              // 密码正确，将 token 保存 | 保存到localStorage
              localStorage.setItem('token', res.data.token)
              //并且跳转路由
              this.$store.commit('setLogin', res.data)
              this.$store.commit('setIsLogin', true)
              this.$router.push({path: '/'})
              this.$message.success('登录成功')
            }
          })

          // getDataBySql({sql}).then( res => {
          //   // console.log('后端返给登录信息', res)
          //   if (res.data.length === 0) {
          //     this.$message.error('用户名不存在')

          //   } else {

          //     if (res.data[0].password == this.form.password) { // 登录成功

          //       // Vuex 中记录登录信息，跳转路由
          //       this.$store.commit('setLogin', res.data[0])
          //       this.$store.commit('setIsLogin', true)
          //       // console.log('this.$store.state.login', this.$store.state.login)
          //       this.$router.push({path:'/'})
          //       this.$message.success('登录成功')
                
          //     } else {

          //       this.$message.error('密码错误')
          //     }
          //   }
          // })

        } else {
          this.$message.info('请输入用户名和密码')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
