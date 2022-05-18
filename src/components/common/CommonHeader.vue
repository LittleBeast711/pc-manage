<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu()"
      ></el-button>
      <!-- <h3 style="color: whitesmoke">首页</h3> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown szie="mini" trigger="click">
        <span>
          <img :src="userImg" alt="" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="signOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isShow: false,
      userImg: require('@/assets/img/avatar.png')
    }
  },
  methods: {
    changeIcon() {
      this.isShow = !this.isShow
      this.$refs('')
    },
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    signOut() {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.tabList
    })
  }
}
</script>
<style lang="scss" scoped>
header {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  .l-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .el-button {
      margin-right: 15px;
    }
    .el-breadcrumb ::v-deep .el-breadcrumb__inner {
      color: whitesmoke !important;
    }
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: aliceblue;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>
