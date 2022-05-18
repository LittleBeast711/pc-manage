<template>
  <el-container>
    <el-aside width="auto">
      <common-aside />
    </el-aside>
    <el-container>
      <el-header>
        <common-header />
      </el-header>
      <common-tag />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '@/components/common/CommonAside.vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonTag from '@/components/common/CommonTag.vue'
export default {
  name: 'HomeView',
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  },
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.el-header {
  background-color: rgba($color: #000000, $alpha: 0.8);
  color: whitesmoke;
  display: flex;
  i {
    margin-top: 10px;
  }
  h2 {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
  }
}
</style>
