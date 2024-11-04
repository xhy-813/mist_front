import api from '../index'

export default {
  // 登录
  login: (data: {
    account: string
    password: string
  }) => api.post('/login', {
    account: data.account,
    password: data.password,
  }),

  register:(data:{
    name: string
    account: string
    password: string
  }) => api.post('/register', {
    name: data.name,
    account: data.account,
    password: data.password,
  }),

  // 获取权限
  permission: () => api.get('user/permission', {
    baseURL: '/mock/',
  }),

  // 修改密码
  passwordEdit: (data: {
    password: string
    newpassword: string
  }) => api.post('user/password/edit', data, {
    baseURL: '/mock/',
  }),
}
