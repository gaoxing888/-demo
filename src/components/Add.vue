<template>
    <div >
      <Mheader :back="true">添加</Mheader>
      <div class="content">
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
            <label for="bookCover">书的封面</label>
            <input type="text" v-model="book.bookCover" id="bookCover">
          </li>
          <li>
            <button @click="add">添加</button>
          </li>

        </ul>
      </div>
    </div>
</template>
<script>
  import Mheader from '../base/Mheader.vue'
  import {addBook}  from '../api'
    export default {
        data() {
            return {book:{}}
        },
        methods: {
          async add(){
            await addBook(this.book);
            this.$router.push('/list')
          }
        },
        computed: {},
        components: {Mheader}
    }
</script>
<style scoped lang="less">
  ul {
    margin: 50px 20px 0 20px;
    li {
      label {
        display: block;
        font-size: 25px;
      }
      input {
        margin: 10px 0;
        height: 25px;
        width: 90%;
      }
      button {
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
