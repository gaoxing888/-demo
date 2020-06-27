<template>
    <div>
      <Mheader :back="true">列表</Mheader>
      <div class="content" ref="scroll" @scroll="loadMore">
        <ul>
          <router-link :to="{name:'detail',params:{bid:book.bookId}} " v-for="(book,index) in books" :key="index" tag="li">
            <img v-lazy="book.bookCover" alt="">
            <div>
              <h4>{{book.bookName}}</h4>
              <p>{{book.bookInfo}}</p>
              <b>{{book.bookPrice}}</b>
              <div class="btn-list">
                <button @click.stop="remove(book.bookId)">删除</button>
                <button @click.stop="addCart(book)">加购物车</button>
              </div>
            </div>
          </router-link>
        </ul>
        <div @click="more" class="more">加载更多</div>
      </div>
    </div>
</template>
<script>
  import Mheader from '../base/Mheader.vue';
  import {removeBook,pagination} from '../api';
  import * as Types from '../store/mutations-type'

    export default {mounted(){
        let scroll = this.$refs.scroll; //获取到要拖拽的元素
        let top = scroll.offsetTop;
        let distance = 0;
        let isMove=false;
        scroll.addEventListener('touchstart',(e)=> {
          // 滚动条在最顶端时 并且当前盒子在顶端时候 才继续走
          if(scroll.scrollTop !=0 || scroll.offsetTop != top) return;
          let start = e.touches[0].pageY; //手指点击的开始
          let move = (e)=>{
            isMove=true;
            let current = e.touches[0].pageY;
            distance = current - start; //求的拉动的距离 负的就不要了
            if(distance>0){ // 如果大于50了 认为就是50像素
              if(distance<=50){
                scroll.style.top = distance + top +'px';
              }else{
                distance = 50;
                scroll.style.top = top+50+'px';
              }
            }else{
              // 如果不在考虑范围内 移除掉move和end事件
              scroll.removeEventListener('touchmove',move);
              scroll.removeEventListener('touchend',end);
            }
          };
          let end = (e)=>{
            if(!isMove) return;
            isMove=false;
            clearInterval(this.timer1);
            this.timer1 = setInterval(()=>{ // 一共distance 每次-1
              if(distance<=0){
                clearInterval(this.timer1);
                distance = 0;
                scroll.style.top = top+'px';
                scroll.removeEventListener('touchmove',move);
                scroll.removeEventListener('touchend',end);
                this.books = []; // 先清空数据
                this.offset=0;
                this.hasMore=true;
                this.getData();
                return
              }
              distance -=1;
              scroll.style.top =top + distance+'px';
            },1);
          };
          scroll.addEventListener('touchmove',move);
          scroll.addEventListener('touchend',end);
        },false);
      },
      created(){
          this.getData()
        },
        data() {
          //offset代表偏移量  hasmore代表是否有更多   默认不是正在加载
            return {books:[],offset:0,hasMore:true,isLoading:false}
        },
        methods: {
          async getData(){
           if(this.hasMore&&!this.isLoading){   //有更多的时候获取数据
             this.isLoading=true;
             let {hasMore,books}= await pagination(this.offset);
             this.books=[...this.books,...books];//获取的书放到books属性上
             this.hasMore=hasMore;
             this.isLoading=false;
             this.offset=this.books.length;//维护偏移量 就是总书的长度
           }
          },

          async remove(id){
            await removeBook(id);
            //要删除前台的数据
            this.books=this.books.filter(item=>item.bookId!==id);
          },
          more(){
            this.getData()
          },
          loadMore(){
            //  卷曲的高度  屏幕高度    总高度
            //触发scroll事件  可能触发n次 先进来开一个定时器,下次触发时将上一次的定时器清除掉
            clearTimeout(this.timer);//节约性能
            this.timer=setTimeout(()=>{
              let {scrollTop,clientHeight,scrollHeight}=this.$refs.scroll;
              if(scrollTop+clientHeight+20>scrollHeight){
                this.getData();  //获取更多
              }
            },60);
          },
          addCart(book){
            this.$store.commit(Types.ADD_CART,book)
          }
        },
        computed: {},
        components: {Mheader}
    }
</script>
<style scoped>
    .content ul {
      padding: 10px;
    }
    .content ul li{
      display: flex;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 6px;
    }
    .content ul li img{
      width: 110px;
      height: 120px;
    }
  .content h4{
    font-size: 18px;
    line-height: 25px;
  }
  .content p{
    color: #000000;
    line-height: 25px;
  }
  .content b{
    color: #f08367;
  }
    .content button{
    display: block;
      width: 60px;
      height: 40px;
      background: orangered;
      color: #fff;
      border: none;
      border-radius: 10px;
      outline: none;
  }
  .more{
    margin: 8px;
    background: #f0a08a;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 20px;
    color: #f1f1f1;
  }
  .btn-list{
    display:flex;
    justify-content: space-around;
  }
</style>
