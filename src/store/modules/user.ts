import apiUser from '@/api/modules/user'
import router from '@/router'
import useMenuStore from './menu'
import useRouteStore from './route'
import useSettingsStore from './settings'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const settingsStore = useSettingsStore()
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()

    const account = ref(localStorage.account ?? '')
    const token = ref(localStorage.token ?? '')
    const avatar = ref(localStorage.avatar ?? '')
    const login_data = ref(localStorage.login ?? '')
    const register_data = ref(localStorage.register ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      if (login_data.value === 1) {
        return true
      }
      return false
    })

    // 登录
    async function login(data: {
      account: string
      password: string
    }) {
      const res = await apiUser.login(data)
      // localStorage.setItem('account', res.data.account)
      // localStorage.setItem('token', res.data.token)
      // localStorage.setItem('avatar', res.data.avatar)
      localStorage.setItem('login_data', res.data.login_data)
      // // account.value = res.data.account
      // // token.value = res.data.token
      // // avatar.value = res.data.avatar
      login_data.value = res.data.login_data
    }
    // 注册
    async function register(data: {
      name: string
      account: string
      password: string
    }){
      const res = await apiUser.register(data)
      localStorage.setItem('register_data', res.data.register_data)
      register_data.value = res.data.register_data
    }
    // 登出
    async function logout(redirect = router.currentRoute.value.fullPath) {
      // localStorage.removeItem('account')
      // localStorage.removeItem('token')
      // localStorage.removeItem('avatar')
      localStorage.removeItem('login_data')
      // account.value = ''
      // token.value = ''
      // avatar.value = ''
      login_data.value = ''
      permissions.value = []
      routeStore.removeRoutes()
      menuStore.setActived(0)
      router.push({
        name: 'login',
        query: {
          ...(redirect !== settingsStore.settings.home.fullPath && router.currentRoute.value.name !== 'login' && { redirect }),
        },
      })
    }
    // 获取权限
    async function getPermissions() {
      const res = await apiUser.permission()
      permissions.value = res.data.permissions
    }
    // 修改密码
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await apiUser.passwordEdit(data)
    }

    return {
      account,
      token,
      avatar,
      permissions,
      isLogin,
      register,
      login,
      logout,
      getPermissions,
      editPassword,
    }
  },
)

export default useUserStore
