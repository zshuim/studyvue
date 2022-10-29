<template>
  <div class="about">
    <h1 id="h1">{{msg}}</h1>
    <input type="button" id="but_con" value="console" @click="login"/>
  </div>
</template>
<script>
import * as loginapi from '@/utils/about'

export default {
data(){
  return{
    msg:"This is an about page",
  }
},
methods:{
  login(){
    loginapi.login(this,{uid:'root',pwd:"123456"})
  }
},
beforeMount(){
  // console.log(document.getElementById('h1').innerText)
},
mounted(){
  console.log(document.getElementById('h1').innerText)
}
}
</script>

<style src='@/style/about.css' scoped>
</style>

