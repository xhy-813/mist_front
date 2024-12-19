import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/supervised_learning',
  component: Layout,
  name: 'supervised_learning',
  meta: {
    title: '有监督学习',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: 'regression',
      meta:{
        title: '回归算法',
      },
      children: [
        {
          path: 'linear_regression',
          name: 'linear_regression',
          component: () => import('@/views/supervised_learning/regression/linear_regression.vue'),
          meta: {
            title: '线性回归算法',
          }
        }
      ]
    },
    {
      path: 'classification',
      meta:{
        title: '分类算法',
      },
      children: [
        {
          path: 'linear_classification',
          name: 'linear_classification',
          component: () => import('@/views/supervised_learning/classification/linear_classification.vue'),
          meta: {
            title: '线性分类算法',
          }
        }
      ]
    },
    {
      path: 'classification_regression',
      meta:{
        title: '分类&回归算法',
      },
      children: [
        {
          path: 'test1.0',
          name: 'test1.0',
          component: () => import('@/views/supervised_learning/classification_regression/test.vue'),
          meta: {
            title: '还不知道叫什么',
          }
        }
      ]
    },
  ],
}

export default routes
