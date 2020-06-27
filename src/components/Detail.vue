<template>
    <div class="detail">
      <Mheader :back="true">详情页</Mheader>
        <ul>
          <li>
            <label for="bookname">书的名称</label>
            <input type="text" v-model="book.bookName" id="bookname">
          </li>
          <li>
          <label for="bookInfo">书的信息</label>
          <input type="text" v-model="book.bookInfo" id="bookInfo">
        </li>
          <li>
            <label for="bookPrice">书的价格</label>
            <input type="text" v-model.number="book.bookPrice" id="bookPrice">
          </li>
          <li>
            <button @click="update">确认修改</button>
          </li>

        </ul>

    </div>
</template>
<script>
  import Mheader from '../base/Mheader.vue';
  import {findOneBook,updateBook} from "../api"
    export default {
        data() {
            return {book:{}}
        },
        //页面一加载需要根据id发送数据请求
        created(){
          this.getData()
        },
      watch:{
          $route(){   //只要路径变化  重新获取数据
            this.getData()
          }
      },
        methods: {
          async getData(){ //通过id找到某一项后 赋给book属性
            this.book=await findOneBook(this.bid);
            //如果是空对象 需要跳转回列表页
            Object.keys(this.book).length>0?void 0:this.$router.push('/list')
          },
          async update(){  //点击修改图书信息
            await updateBook(this.bid,this.book);
            this.$router.push('/list');  //修改完成后跳转页面
          }
        },
        computed: {
          bid(){
           return   this.$route.params.bid   //将路径参数的id映射到bid上
          }
        },
        components: {Mheader}
    }
</script>
<style scoped lang="less">
   .detail{
     position: absolute;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     z-index: 1;
     background: #fff;
   }
  ul{
       margin: 50px 20px 0 20px;
       li{
         label{
           display: block;
           font-size: 25px;
         }
         input{
           margin: 10px 0;
           height: 25px;
           width: 90%;
         }
         button{
           display: block;
           width: 70px;
           height: 50px;
           background: #6cdee6;
           color: #fff;
           border: none;
           border-radius: 10px;
           outline: none;
         }
       }
  }
</style>
