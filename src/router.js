import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home/home'
import category from './components/category/category'
import user from './components/user/user'
import course from './components/course/course'

import courseList from './components/user/courseList/courseList'
import message from './components/user/message/message'
import myHistory from './components/user/myHistory/myHistory'
import myNotes from './components/user/myNote/myNote'
import upload from './components/user/upload/upload'

import searchResult from './components/searchResult/searchResult'
import protocol from './components/help/protocol/protocol'
import store from './store/'
import courseVideo from './components/courseVideo/courseVideo'

Vue.use(Router)
const NEED_LOGIN = 'needLogin'
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 主页
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    // 一级分类页
    {
      path: '/category/:cid',
      name: 'category',
      component: category
    },
    // 用户页
    {
      path: '/user/:uid',
      // name: 'user',
      component: user,
      children: [
        // 重定向路由'/user/:uid'为courseList组件
        {
          path: '/',
          redirect: 'courseList',
          name: 'user',
          meta: NEED_LOGIN
        },
        // 我的课程
        {
          path: 'courseList',
          name: 'courseList',
          component: courseList,
          meta: NEED_LOGIN
        },
        // 我的笔记
        {
          path: 'myNotes',
          name: 'myNotes',
          component: myNotes,
          meta: NEED_LOGIN
        },
        // 我的消息
        {
          path: 'message',
          name: 'message',
          component: message,
          meta: NEED_LOGIN
        },
        // 历史足迹
        {
          path: 'myHistory',
          name: 'myHistory',
          component: myHistory,
          meta: NEED_LOGIN
        },
        // 上传管理
        {
          path: 'upload',
          name: 'upload',
          component: upload,
          meta: NEED_LOGIN
        }
      ]
    },
    // 课程页
    {
      path: '/course/:cid',
      name: 'course',
      component: course
    },
    // 播放页
    {
      path: '/course/:cid/courseVideo',
      name: 'courseVideo',
      component: courseVideo,
      meta: NEED_LOGIN

    },
    // 搜索结果页
    {
      path: '/search',
      name: 'searchResult',
      component: searchResult
    },
    {
      path: '/protocol',
      name: 'protocol',
      component: protocol
    }
    // 懒加载示例
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

// 在每次进入路由前判断
router.beforeEach((to, from, next) => {
  console.log(from)
  console.log(to)
  // 如果token未失效则获取用户基本信息
  if (window.localStorage.token) {
    store.dispatch('account/setHasLogin', true)
    store.dispatch('account/setUserInfo', { id: 123, name: '张三', interest: [1, 2, 3] })
    window.localStorage.token = 1
  } else {
    // 拦截直接通过url访问需要登录权限的页面，如果token失效则返回首页并显示登录窗口
    if (to.meta === NEED_LOGIN) {
      store.dispatch('account/setAccountWindowShow', {
        show: true,
        type: 'LOGIN'
      })
      next({ name: 'Home' })
    }
  }
  next()
})
export default router
