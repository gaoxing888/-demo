import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);
//代码分割   优化性能
export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },//this.$route.meta.keepAlive
    {
      path:'/home',
      /*异步组件*/
      component:()=>import('../components/Home.vue'),
      meta:{keepAlive:true,title:'主页'},

    },
    {
      path:'/list',
      component:()=>import('../components/List.vue'),
      meta:{title:'列表页'}
    },
    {
      path:'/collect',
      component:()=>import('../components/Collect.vue'),
      meta:{title:'收藏'}
    },
    ///detail/1  {bid:1} 路径参数 必须有但是可以随机
    {
      path:'/detail/:bid',
      component:()=>import('../components/Detail.vue'),
      name:'detail',
      meta:{title:'详情页'}
    },
    {
      path:'/add',
      component:()=>import('../components/Add.vue'),
      meta:{title:'添加页'}
    },
    {
      path:'*',
      redirect:'/home'
    },
  ]
})
