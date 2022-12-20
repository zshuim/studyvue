<template>
  <div class="adduserBox">
    <el-drawer
      title="添加用户"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class="addformBox" style="width: 90%; margin-top: 60px">
        <el-form
          label-width="120px"
          class="addform"
          :rules="addformRules"
          ref="addUserRefs"
          :model="addForm"
        >
          <el-form-item label="姓名:" prop="real_name">
            <el-input v-model="addForm.real_name"></el-input>
          </el-form-item>
          <el-form-item label="性别:" size="medium" prop="sex">
            <el-radio-group
              v-model="addForm.sex"
              style="width: 100%; float: left"
            >
              <el-radio
                label="男"
                style="
                  position: absolute;
                  left: 10%;
                  top: 50%;
                  transform: translate(0, -50%);
                "
              ></el-radio>
              <el-radio
                label="女"
                style="
                  position: absolute;
                  left: 80%;
                  top: 50%;
                  transform: translate(0, -50%);
                "
              ></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学号:" prop="user_name">
            <el-input v-model="addForm.user_name"></el-input>
          </el-form-item>
          <el-form-item label="电话:" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="组织:" prop="dept">
            <el-cascader
              ref="deptRef"
              :props="deptProps"
              :options="deptOption"
              v-model="arr_selectedOptions"
              @change="deptChange"
              @visible-change="screen_User"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-form>
        <div class="commitaddUser" style="width: 100%; position: relative">
          <el-button
            type="primary"
            style="position: absolute; right: 9px; top: 100px"
            @click="commitaddUser"
            v-if="userplay == 'add' ">commit</el-button
          >
          <el-button
            type="primary"
            style="position: absolute; right: 9px; top: 100px"
            @click="commiteditUser"
            v-if="userplay == 'edit' ">commit</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { judgeFormIntegrity } from "@/utils/login";
import { tchDeptList , modifyDeptStructure ,getUserByID } from "@/utils/userManage"
export default {
 props:{
    userplay:String,
  
  },
  data() {
    return {
      drawer: true,
      direction: "rtl",
      addForm: {
        sex: "",
        user_name: "",
        real_name: "",
        phone: "",
        password: "",
        dept: "",
        type: "teacher",
      },
      addformRules: {
        sex: [{ required: true, message: "请确定信息1", trigger: "blur" }],
        user_name: [{ required: true, message: "请输入学号", trigger: "blur" }],
        real_name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        dept: [{ required: true, message: "请确定组织", trigger: "blur" }],
      },

       //键名可通过 Props 属性配置
      deptProps: {
        value: "id",
        label: "deptName",
        children: "children",
        checkStrictly: true,
      },
      //   组织架构可选数据源
      deptOption: [],
      //   选中项绑定值
      arr_selectedOptions: [],
      //   选中的条件拼接成字符串
      selectedOptionID: "",
    };
  },
  created(){
  console.log("我被创建了")
    tchDeptList().then((resp) => {
     console.log(3)
      this.deptOption = modifyDeptStructure(resp);
      if(this.userplay == "edit"){
        getUserByID();
        this.addForm = {
            sex: "男",
            user_name: "20219111322",
            real_name: "zshuim",
            phone: "12345678901",
            password: "1234567890",
            dept: "373605820643934208",
            type: "teacher",
          };
        for(var i =0;i<this.deptOption.length;i++){
         
            if(this.deptOption[i].id != this.addForm.dept && this.deptOption[i].children.length == 0){
                continue;
            }
            else if(this.deptOption[i].id == this.addForm.dept){
                this.arr_selectedOptions.push(this.addForm.dept);
                return;
            }
            else if(this.deptOption[i].id != this.addForm.dept && this.deptOption[i].children.length != 0){
                for(var j=0;j<this.deptOption[i].children.length;j++){
                     console.log(this.deptOption[i].children[j].id)
                     console.log(this.addForm.dept)
                    if(this.deptOption[i].children[j].id == this.addForm.dept){
                   
                         this.arr_selectedOptions.push(this.deptOption[i].id);
                         this.arr_selectedOptions.push(this.deptOption[i].children[j].id);
                         return;
                    }
                }
            }
        }
        
    }
    });
     
  
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.addForm = {
            sex: "",
            user_name: "",
            real_name: "",
            phone: "",
            password: "",
            dept: "",
            type: "teacher",
          };
          this.arr_selectedOptions = [];
          this.selectedOptionID = "";
          this.giveThingToFar(false);
          done();
        })
        .catch((_) => {});
    },
    // 组织清空时调用
    deptChange(valuse) {
      if (this.$refs.deptRef.checkedValue.length === 0) {
        this.arr_selectedOptions = [];
        this.selectedOptionID = "";
        this.addForm.dept = "";
      } else {
      }
    },
    screen_User(callback) {
      if(!callback && this.arr_selectedOptions.length == 2) {
        this.addForm.dept = this.selectedOptionID = this.arr_selectedOptions[1];
      }
      else if(!callback && this.arr_selectedOptions.length == 1){
         this.addForm.dept = this.selectedOptionID = this.arr_selectedOptions[0];
      }
    },
    commitaddUser() {
      judgeFormIntegrity(this.$refs["addUserRefs"]);
    },
    commiteditUser(){
         judgeFormIntegrity(this.$refs["addUserRefs"]);
    },


    giveThingToFar(closePlane){
        this.$emit('closePlane', closePlane);
    },
  },
};
</script>
