<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.name"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
      >{{ item.label }}</el-tag
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      tags: (state) => state.tabList
    })
  },
  methods: {
    ...mapMutations({
      close: 'closeTag'
    }),
    changeMenu(item) {
      this.$router.push({
        name: item.name
      })
    },
    handleClose(item, index) {
      const length = this.tags.length - 1
      this.close(item)
      if (item.name !== this.$route.name) return
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name
        })
      } else {
        this.$router.push({
          name: this.tags[index].name
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
