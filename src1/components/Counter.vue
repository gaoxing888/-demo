<template>
    <div>
      计数器: <button @click="reduce">-</button>
      <br>
      当前:{{this.$store.state.count}}
      <br>
      计数器: <button @click="add">+</button>
      {{$store.getters.val}}
    </div>
</template>
<script>
  import * as Types from '../store/mutations-type'
    export default {
        data() {
            return {}
        },
        methods: {
          add(){   //提交add的mutation
            this.$store.commit(Types.INCREMENT,3)   //载荷,payload
          },
          reduce(){
            this.$store.commit(Types.DECREMENT,1)
          }
        },
        computed: {},
        components: {}
    }
</script>
<style scoped>

</style>
