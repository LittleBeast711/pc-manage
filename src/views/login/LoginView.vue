<template>
  <div class="container">
    <el-form class="login" ref="form" :model="form" :rules="rules">
      <el-form-item>
        <i
          class="el-icon-s-custom"
          style="font-size: 50px; margin-left: 80px; color: white"
        />
      </el-form-item>
      <el-form-item prop="username">
        <el-input placeholder="Id" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="Password"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMenu } from '@/api/data'
export default {
  data() {
    return {
      form: {},
      rules: {
        username: [
          {
            required: true,
            message: 'please input your id',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 8,
            message: 'the length should between 3 and 8',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'please input your password',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 8,
            message: 'the length should between 5 and 8',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login() {
      getMenu(this.form).then(({ data: res }) => {
        console.log('res', res)
        if (res.code === 20000) {
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', res.data.menu)
          this.$store.commit('setToken', res.data.token)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'home' })
        } else {
          this.$message.warning(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  background-size: cover;
  .login {
    background-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%);
    padding: 80px 350px;
    min-width: 300px;
    box-shadow: 10px 10px 10px rgba($color: #000000, $alpha: 0.5);
    .el-button {
      width: 100%;
    }
  }
}
</style>
