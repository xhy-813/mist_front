import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/unsupervised_learning',
  component: Layout,
  name: 'unsupervised_learning',
  meta: {
    title: '有监督学习',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: 'cluster',
      meta:{
        title: '聚类算法',
      },
      children: [
        {
          path: 'test1',
          name: 'test1',
          component: () => import('@/views/unsupervised_learning/cluster/test.vue'),
          meta: {
            title: '还没写',
          }
        }
      ]
    },
    {
      path: 'dimensionality_reduction',
      meta:{
        title: '降维算法',
      },
      children: [
        {
          path: 'test2',
          name: 'test2',
          component: () => import('@/views/unsupervised_learning/dimensionality_reduction/test.vue'),
          meta: {
            title: '还没写2.0',
          }
        }
      ]
    },
    {
      path: 'generative_model',
      meta:{
        title: '分类&回归算法',
      },
      children: [
        {
          path: 'test3',
          name: 'test3',
          component: () => import('@/views/unsupervised_learning/generative_model/test.vue'),
          meta: {
            title: '还没写3.0',
          }
        }
      ]
    },
  ],
}

export default routes
