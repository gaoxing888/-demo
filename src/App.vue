<template>
  <div id="app">
    <!--根据页面实现缓存-->
    <!--需要走缓存的-->
    <transition name="fadeIn">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    </transition>
    <!--正常访问走下面(不需要走缓存的)-->
    <transition name="fadeIn">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <Tab></Tab>
  </div>
</template>

<script>
  import Tab from './base/Tab.vue'

  export default {
    name: 'app',
    components: {
      Tab
    }
  }
</script>

<style>
  /*默认样式*/
  * {
    margin: 0;
    padding: 0;
  }

  ul li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  input, button {
    -webkit-appearance: none;
  }
  .content{
    position: fixed;
    top:40px;
    bottom: 50px;
    overflow: auto;
    width: 100%;
  }
  .fadeIn-enter{
    opacity:0;
  }
  .fadeIn-enter-active{
    transition:all 0.3s linear;
  }
  .fadeIn-leave-active{
    transition:all 0.3s linear;
    opacity:0;
  }
</style>
