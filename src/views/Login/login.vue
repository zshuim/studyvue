<template>
  <div class="app">
    <div class="panel">
      <div class="imgBox"></div>
      <div class="operationBox">
        <ul class="loginMethod">
            <li id="account" class="login_li" @click="change_li_bg($event)">账号</li>
            <li id="wechat" class="login_li" @click="change_li_bg($event)">微信</li>
        </ul>
      <div class="methodBox">
        <accountLogin v-if="loginMethod=='account'"></accountLogin>
        <wachetLogin v-else></wachetLogin>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import accountLogin from '@/components/login/accountLogin.vue'
import wachetLogin from '@/components/login/wachetLogin.vue'
export default {
    components:{
        accountLogin,
        wachetLogin,
    },
  created() {},
  mounted() {},
  data() {
    return {
        loginMethod:"account"
    };
  },
  methods: {
    // li标签点击切换背景色和登陆方式
    change_li_bg(e){
        // 1.获取两个li元素
        var liObj = document.getElementsByClassName("login_li");
        liObj[0].style.fontWeight=400;
        liObj[0].style.color="black";
        liObj[0].style.borderBottom="None"
        liObj[1].style.fontWeight=400;
        liObj[1].style.color="black";
        liObj[1].style.borderBottom="None"
        var obj_li = document.getElementById(e.target.id);
        obj_li.style.fontWeight=600;
        obj_li.style.color="rgba(0, 62, 248, 0.9)";
        obj_li.style.borderBottom="";
        obj_li.style.borderBottomColor="rgba(0, 62, 248, 0.9)"
        obj_li.style.borderBottomWidth="2px";
        obj_li.style.borderBottomStyle="solid"
        this.loginMethod = e.target.id;
    },
  },
};
</script>

<style src="@/style/login.css" scoped></style>
<style scoped>
.app {
  /* width: 100%;
  height: 100%; */
  background-color: antiquewhite;
  background-image: url(../../assets/login_background.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
