import * as Types from './mutations-type'
const mutations={
  [Types.INCREMENT](state,count){   //state是自动放进去的,默认指的是当前的state
    state.count+=count;
  },
  [Types.DECREMENT](state,count){
    state.count-=count;
  }
};
export default mutations;


