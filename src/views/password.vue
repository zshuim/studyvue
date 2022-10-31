// 忘记密码初始页
<template>
  <div class="app">
  <!-- 步骤条 -->
    <div class="stepBar">
      <el-steps :active="step" align-center finish-status="success" >
        <el-step
          title="步骤1"
          description="验证身份"
        ></el-step>
        <el-step
          title="步骤2"
          description="找回密码"
        ></el-step>
        <el-step
          title="步骤3"
          description="完成"
        ></el-step>
      </el-steps>
    </div>
    <!-- 身份验证 -->
    <div class="authenticate" v-if="step==0">
        <el-form class="code" label-width="100px" :rules="codeRules" ref="codeRefs" :model="codeForm">
            <el-form-item label="重置账号：" style="text-align:left">
                <span >{{codeForm.account}}</span>
            </el-form-item>
            <el-form-item label="验证码：" style="text-align:left;display: inline;" id="code" prop="code">
                <el-input style="display: inline-block;width:50%" v-model="codeForm.code"></el-input>
                <img :src="codeInfo.verifyCodeImgUrl" alt="点击刷新图片" @click="get_code" />
            </el-form-item>
            <el-button class="commitCode" type="primary" style="width:120px;" @click="commitCode">确定</el-button>
        </el-form>
    </div>
    <!-- 密码修改 -->
    <div class="changePwd" v-if="step==1">
        <el-form label-width="150px" id="changePwd" :rules="pwdRules" :model="pwdForm" ref="pwdRefs">
            <el-form-item label="新的登录密码：" prop="newpwd" :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }]">
                <el-input v-model="pwdForm.newpwd"></el-input>
            </el-form-item>
            <el-form-item label="确认新的登录密码：" prop="newpwds">
                <el-input v-model="pwdForm.newpwds" ></el-input>
            </el-form-item>
            <el-button class="commitPwd" type="primary" style="width:120px;" @click="commitPwd">确定</el-button>
        </el-form>
    </div>
  </div>
</template>

<script>
import * as loginapi from "@/utils/login"
export default {
  beforeCreate() {},
  created() {
    this.get_code();
  },
  mounted() {},

  data() {
    return {
        step:0,
        codeInfo:{},
        codeForm:{
            account:"20219***322",
            code:""
        },
        codeRules:{
            code:[ { required: true, message: '验证码不能为空', trigger: 'blur' },]
        },
        pwdForm:{
            newpwd:"",
            newpwds:"",
        },
        pwdRules:{
            newpwd:[{ required: true, message: '密码不能为空', trigger: 'blur' }],
            newpwds:[{ required: true, message: '密码不能为空', trigger: 'blur' }]
        },
    };
  },
  methods: {
    get_code(){
        loginapi.get_code().then((res)=>{this.codeInfo=res});
    },
    commitCode(){
        if(loginapi.comparisonCode(this.codeForm.code,this.codeInfo.verifyCode)){
            this.step = 1;
        }
        else {
            this.$message.error("验证码错误");
            this.get_code();
        }
    },
    commitPwd(){
        if(loginapi.judgeFormIntegrity(this.$refs['pwdRefs'])){
            if(loginapi.commitNewPwd(this)){
                this.$router.replace('/about');
            }
        }
        
    },
  },
};
</script>

<style src='@/style/password.css' scoped></style>

<style  scoped>

</style>