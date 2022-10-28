<template>
  <div class="about">
    <h1 id="h1">{{msg}}</h1>
    <input type="button" id="but_con" value="console" @click="con_bald1"/>
  </div>
</template>
<script>
import con_bald from '@/utils/about'
export default {
data(){
  return{
    msg:"This is an about page",
  }
},
methods:{
  con_bald1(){
    con_bald();
  }
},
beforeMount(){
  console.log(document.getElementById('h1').innerText)
},
mounted(){
  console.log(document.getElementById('h1').innerText)
}
}
</script>

<style src='@/style/about.css' scoped>
</style>

