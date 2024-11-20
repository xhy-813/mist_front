import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/multilevel_menu_example',
  component: Layout,
  redirect: '/multilevel_menu_example/page',
  name: 'multilevelMenuExample',
  meta: {
    title: '线性分类与回归',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: 'page',
      name: 'multilevelMenuExample1',
      component: () => import('@/views/multilevel_menu_example/level2/linear_regression.vue'),
      meta: {
        title: '线性回归',
      },
    },
     {
      path: 'level2',
      name: 'multilevelMenuExample2',
      component: () => import('@/views/multilevel_menu_example/level2/linear_classification.vue'),
      meta: {
        title: '线性分类',
      },
    },
  ],
}

export default routes
