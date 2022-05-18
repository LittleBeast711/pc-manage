import Mock from 'mockjs'
import homeApi from './home'
import permissionApi from './permission'
import userApi from './user'

Mock.setup({
  timeout: '200~2000'
})

Mock.mock(/\/home\/getData/, homeApi.getStatisticalData)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/searchList/, 'get', userApi.searchList)
Mock.mock(/user\/del/, 'post', userApi.deleteUser)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)
