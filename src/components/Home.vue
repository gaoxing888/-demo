<template>
  <div>
    <Mheader :back="false">首页</Mheader>
    <div class="content">
      <loading v-if="loading"></loading>
      <template v-else>
        <Swiper :swiperSlides="sliders"></Swiper>
        <div class="container">
          <h3>热门图书</h3>
          <ul>
            <li v-for="hot in hotBooks">
              <img :src="hot.bookCover" alt="">
              <b>{{hot.bookName}}</b>
            </li>
          </ul>
        </div>
      </template>
    </div>

  </div>
</template>
<script>
  //1.引用组件
  //2.注册组件
  //3.使用组件
  import Mheader from '../base/Mheader.vue';
  import Swiper from '../base/Swiper.vue';
  import loading from  '../base/loading.vue'
  import {getAll} from '../api';

  export default {
    created() {
      this.getData()
    },
    data() {
      return {sliders: [], hotBooks: [], loading: true}
    },
    methods: {
      async getData() {
        let [sliders, hotBooks] = await getAll(); //[sliders,books]
        this.sliders = sliders;
        this.hotBooks = hotBooks;
        //轮播图和热门图书已经获取完成
        this.loading = false
      }
    },
    computed: {},
    components: {Mheader, Swiper,loading}
  }
</script>
<style scoped lang="less">
  .container {
    width: 90%;
    margin: 0 auto;
    h3 {
      color: lightseagreen;
      text-align: center;
    }
    ul {
      display: flex;
      flex-wrap: wrap; //默认不换行
      margin: 5px 0;
      li {
        width: 50%;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
