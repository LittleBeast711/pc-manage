<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新信息'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <div class="search-form">
        <common-form
          :formLabel="formLabel"
          :form="searchForm"
          :inline="true"
          ref="form"
        >
          <el-button type="primary" @click="getList(searchForm.keyword)"
            >搜索</el-button
          >
        </common-form>
      </div>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="changePage()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from '@/components/common/CommonForm.vue'
import CommonTable from '@/components/common/CommonTable.vue'

import { getUser } from '@/api/data'
export default {
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm: { name: '', addr: '', age: '', birth: '', sex: '' },
      searchForm: {
        keyword: ''
      },
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        }
      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  computed: {
    formLabel() {
      return [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    confirm() {
      if (this.operateType === 'edit') {
        this.$axios.post('/user/edit', this.operateForm).then((res) => {
          this.isShow = false
          this.getList()
        })
      } else {
        this.$axios.post('/user/add', this.operateForm).then((res) => {
          this.isShow = false
          this.getList()
        })
      }
    },
    addUser() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      }
    },
    getList(name) {
      console.log(11, name)
      this.config.loading = true
      this.config.page = name ? 1 : 0
      const payload = {
        page: this.config.page,
        name: name
      }
      console.log('payload', payload)
      getUser(payload).then(({ data: res }) => {
        console.log('res', res)
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          return item
        })
        this.config.total = res.count
        this.config.loading = true
      })
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = { ...row }
    },
    delUser(row) {
      this.$confirm('此操作将永久删除该组件，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = row.id
        this.$axios
          .post('user/del', {
            params: { id }
          })
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          })
      })
    },
    changePage(page) {
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search-form {
    margin-top: 15px !important;
  }
}
</style>
