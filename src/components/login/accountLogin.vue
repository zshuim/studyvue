// 忘记密码第一步组件
<template>
    <div class="accountBox">
        <el-form :model="loginForm" :rules="loginRules" ref="loginRefs">
            <el-form-item prop="account">
                <el-input v-model="loginForm.account" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
                <el-input v-model="loginForm.pwd" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item class="codeitem" prop="code">
                <el-input v-model="loginForm.code" placeholder="验证码" id="code" style="width: 50%;margin-right:10px;"></el-input>
                 <img :src="codeInfo.verifyCodeImgUrl" alt="点击刷新图片" @click="get_code" />
            </el-form-item>
            <el-button class="commitUser" type="primary" @click="commitUser">登录</el-button>
            <nav class="chagepwd"><router-link to="/password">忘记密码</router-link></nav>
        </el-form>
    </div>
</template>

<script>
import * as loginapi from '@/utils/login'
import { login } from '@/utils/about'
export default {
    beforeCreate(){},
    created(){
        this.get_code();
    },
    mounted(){},

    data(){
        return{
            loginForm:{
                account:'',
                pwd:'',
                code:"",
            },
            loginRules:{
                account:[ { required: true, message: '请输入账号', trigger: 'blur' },],
                pwd:[ { required: true, message: '请输入密码', trigger: 'blur' },],
                code:[ { required: true, message: '请输入验证码', trigger: 'blur' },],
            },
            codeInfo:{},
        }
    
    },
    methods : {
        get_code(){
            loginapi.get_code().then((res)=>{this.codeInfo=res});
        },
        commitUser(){
            if(loginapi.judgeFormIntegrity(this.$refs['loginRefs'])){
                if(loginapi.comparisonCode(this.loginForm.code,this.codeInfo.verifyCode)){
                // 验证码正确执行
                    var response = loginapi.commitLoginUser(this);
                    response.then((resp)=>{
                        if(resp){
                            window.sessionStorage.setItem('token',resp.token);
                            loginapi.transformationRouter(resp.route);
                            this.$store.dispatch('setUserINfoAsync',resp);
                            this.$router.push('/home');
                        }
                    })
                }
                else { 
                    this.$message.error("验证码错误");
                    this.get_code();
                }
            }
        }
    }
}
</script>
<style scoped>
 .accountBox {
    margin-top: 50px;
    margin-left: 20px;
    width: 90%;
    position: relative;
    height: 100%;
 }
 .commitUser {
    width: 90%;
    position:absolute;
    bottom:40px;
    left:5%;
    height: 15%;
 }
.codeitem {
    text-align: left;
}
.codeitem img {
    height: 50px;
}
.accountBox .chagepwd{
    position:absolute;
    bottom: 2px;
    right: 5%;
    padding: 0 ;
}
</style>