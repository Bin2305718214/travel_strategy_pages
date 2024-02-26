import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/403',
    component: () => import('@/views/403'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'user' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: '用户列表',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'list' }
      },
    ]
  },

  {
    path: '/copywriting',
    component: Layout,
    redirect: '/copywriting/list',
    name: '文案管理',
    meta: { title: '文案管理', icon: 'copywriting' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: '文案列表',
        component: () => import('@/views/copywriting/list'),
        meta: { title: '文案列表', icon: 'list' }
      },
      {
        path: 'add',
        name: '文案添加',
        component: () => import('@/views/copywriting/edit'),
        meta: { title: '文案添加', icon: 'edit' }
      },
      {
        path: 'edit/:id',
        name: '文案编辑',
        component: () => import('@/views/copywriting/edit'),
        meta: { title: '文案编辑', icon: 'edit' },
        hidden: true
      }
    ]
  },

  {
    path: '/treehole',
    component: Layout,
    redirect: '/treehole/list',
    name: '树洞管理',
    meta: { title: '树洞管理', icon: 'tree-hole' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: '树洞列表',
        component: () => import('@/views/treehole/list'),
        meta: { title: '树洞列表', icon: 'list' }
      },
    ]
  },

  {
    path: '/city',
    component: Layout,
    redirect: '/city/list',
    name: '城市管理',
    meta: { title: '城市管理', icon: 'city' },
    children: [
      {
        path: 'list',
        name: '城市列表',
        component: () => import('@/views/city/list'),
        meta: { title: '城市列表', icon: 'list' }
      },
      {
        path: 'add',
        name: '城市添加',
        component: () => import('@/views/city/edit'),
        meta: { title: '城市添加', icon: 'edit' }
      },
      {
        path: 'edit/:id',
        name: '城市编辑',
        component: () => import('@/views/city/edit'),
        meta: { title: '城市编辑', noCache: true },
        hidden: true
      },
      {
        path: 'details/:id',
        name: '城市信息详情',
        component: () => import('@/views/city/details'),
        meta: { title: '信息详情', noCache: true },
        hidden: true,
      },
      {
        path: 'scenicSpot/add/:cityId',
        name: '景点信息添加',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '其他信息添加', icon: 'edit' },
        hidden: true
      },
      {
        path: 'scenicSpot/edit/:id',
        name: '景点信息编辑',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '其他信息编辑', noCache: true },
        hidden: true
      },
      {
        path: 'festival/add/:cityId',
        name: '节日信息添加',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '节日信息添加', icon: 'edit' },
        hidden: true
      },
      {
        path: 'festival/edit/:id',
        name: '节日信息编辑',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '节日信息编辑', noCache: true },
        hidden: true
      },
      {
        path: 'hotel/add/:cityId',
        name: '酒店信息添加',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '酒店信息添加', icon: 'edit' },
        hidden: true
      },
      {
        path: 'hotel/edit/:id',
        name: '酒店信息编辑',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '酒店信息编辑', noCache: true },
        hidden: true
      },
      {
        path: 'specialSnacks/add/:cityId',
        name: '特色小吃信息添加',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '特色小吃信息添加', icon: 'edit' },
        hidden: true
      },
      {
        path: 'specialSnacks/edit/:id',
        name: '特色小吃信息编辑',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '特色小吃信息编辑', noCache: true },
        hidden: true
      },
      {
        path: 'restaurant/add/:cityId',
        name: '餐馆信息添加',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '餐馆信息添加', icon: 'edit' },
        hidden: true
      },
      {
        path: 'restaurant/edit/:id',
        name: '餐馆信息编辑',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '餐馆信息编辑', noCache: true },
        hidden: true
      },
      {
        path: 'shopping/add/:cityId',
        name: '购物点信息添加',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '购物点信息添加', icon: 'edit' },
        hidden: true
      },
      {
        path: 'shopping/edit/:id',
        name: '购物点信息编辑',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '购物点信息编辑', noCache: true },
        hidden: true
      },
      {
        path: 'practicalInfo/add/:cityId',
        name: '实用信息添加',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '实用信息添加', icon: 'edit' },
        hidden: true
      },
      {
        path: 'practicalInfo/edit/:id',
        name: '实用信息编辑',
        component: () => import('@/views/city/otherEdit'),
        meta: { title: '实用信息编辑', noCache: true },
        hidden: true
      },
      {
        path: 'telTnfo/add/:cityId/:id',
        name: '电话信息添加',
        component: () => import('@/views/city/telOrHospEdit'),
        meta: { title: '电话信息添加', icon: 'edit' },
        hidden: true
      },
      {
        path: 'telTnfo/edit/:cityId/:id',
        name: '电话信息编辑',
        component: () => import('@/views/city/telOrHospEdit'),
        meta: { title: '电话信息编辑', noCache: true },
        hidden: true
      },
      {
        path: 'hospitalInfo/add/:cityId/:id',
        name: '医院信息添加',
        component: () => import('@/views/city/telOrHospEdit'),
        meta: { title: '医院信息添加', icon: 'edit' },
        hidden: true
      },
      {
        path: 'hospitalInfo/edit/:cityId/:id',
        name: '医院信息编辑',
        component: () => import('@/views/city/telOrHospEdit'),
        meta: { title: '医院信息编辑', noCache: true },
        hidden: true
      },
    ]
  },

  {
    path: '/post',
    component: Layout,
    redirect: '/post/list',
    name: '游记管理',
    meta: { title: '游记管理', icon: 'post' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: '游记列表',
        component: () => import('@/views/post/list'),
        meta: { title: '游记列表', icon: 'list' }
      },
      {
        path: 'detail/:id',
        name: '游记详情',
        component: () => import('@/views/post/detail'),
        meta: { title: '游记详情', noCache: true },
        hidden: true,
      },
    ]
  },

  {
    path: '/dict',
    component: Layout,
    redirect: '/dict/list',
    name: '数据管理',
    meta: { title: '数据管理', icon: 'dict' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: '数据字典',
        component: () => import('@/views/dict/list'),
        meta: { title: '数据字典', icon: 'list' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
