<template>
  <div class="deptSearch">
    <el-cascader
      ref="deptRef"
      :props="deptProps"
      :options="deptOption"
      v-model="arr_selectedOptions"
      @change="deptChange"
      @visible-change="screen_User"
      clearable
    ></el-cascader>
  </div>
</template>

<script>
import requests from "@/api/request"
export default {
  props: {
    pageInfo: Object,
    deptsty:String,
  },
  created() {
    if(this.deptsty == "stu"){
        requests.get('/dept/get/college/adminclass').then((res)=>{
            for(var i=0;i<res.sysDeptList.length;i++){
                if(res.sysDeptList[i].parentDeptId==null){
                    this.deptOption.push(res.sysDeptList[i]);
                }
            }
            for(var j=0;j<this.deptOption.length;j++){
                this.deptOption[j].children=[];
                for(var i=0;i<res.sysDeptList.length;i++){
                    if(res.sysDeptList[i].parentDeptId == this.deptOption[j].id ){
                        this.deptOption[j].children.push(res.sysDeptList[i]);
                    }
                }
            }
        })
    }
    else{
        requests.get('/dept/get/college/tchgroup').then((res)=>{
            for(var i=0;i<res.sysDeptList.length;i++){
                if(res.sysDeptList[i].parentDeptId==null){
                    this.deptOption.push(res.sysDeptList[i]);
                }
            }
            for(var j=0;j<this.deptOption.length;j++){
                this.deptOption[j].children=[];
                for(var i=0;i<res.sysDeptList.length;i++){
                    if(res.sysDeptList[i].parentDeptId == this.deptOption[j].id ){
                        this.deptOption[j].children.push(res.sysDeptList[i]);
                    }
                }
            }
        })
    }
  },
  data() {
    return {
      // sj 键名可通过 Props 属性配置
      deptProps: {
        value: "deptName",
        label: "deptName",
        children: "children",
        checkStrictly: true,
      },
      // sj 可选项数据源
      deptOption: [],
      // sj 选中项绑定值
      arr_selectedOptions: [],
      // sj 选中的条件拼接成字符串
      str_selectedOptions: "",
      //
      users: [],
    };
  },
  methods: {
    // ff 当选中节点变化时触发
    deptChange(valuse) {
        if(this.$refs.deptRef.checkedValue.length === 0){
           this.arr_selectedOptions=[];
           this.str_selectedOptions="";
        }
        else{
           
        }
    },
    // ff 下拉框出现/隐藏时触发 下拉展开 callback:true  隐藏 callback:false
    screen_User(callback) {
      //    bz 1.将要筛选的组织名获取
      //    bz 2.将组织名进行拼接
      this.str_selectedOptions = "";
      if(this.deptsty=='stu'){
        if (!callback) {
        if(this.arr_selectedOptions.length == 0){
            this.str_selectedOptions = "";
        }
        for (var i = 0; i < this.arr_selectedOptions.length; i++) {
          if (this.arr_selectedOptions.length == 1) {
            this.str_selectedOptions = this.arr_selectedOptions[i];
          } else if (i == 0) {
          
            this.str_selectedOptions += this.arr_selectedOptions[i] + "/";
          } else {
            this.str_selectedOptions += this.arr_selectedOptions[i];
          }
        }
         requests.get('/user/get/dept',{params:{pagesize:this.pageInfo.pagesize,pagenum:this.pageInfo.pagenum,dept:this.str_selectedOptions,type:"student"}}).then(resp=>{
               this.users=resp.data.sysUserList;
               this.pageInfo.total=resp.data.sysUserCount;
               this.$emit("childPageInfo_Total",{total:this.pageInfo.total,users:this.users});
            })
      }
      
      }
      else {
        if (!callback) {
         if(this.arr_selectedOptions.length == 0){
            this.str_selectedOptions = "";
        }
        for (var i = 0; i < this.arr_selectedOptions.length; i++) {
          if (this.arr_selectedOptions.length == 1) {
            this.str_selectedOptions = this.arr_selectedOptions[i];
          } else if (i == 0) {
            this.str_selectedOptions += this.arr_selectedOptions[i] + "/";
          } else {
            this.str_selectedOptions += this.arr_selectedOptions[i];
          }
        }
         requests.get('/user/get/dept',{params:{pagesize:this.pageInfo.pagesize,pagenum:this.pageInfo.pagenum,dept:this.str_selectedOptions,type:"teacher"}}).then(resp=>{
               this.users=resp.data.sysUserList;
               this.pageInfo.total=resp.data.sysUserCount;
               this.$emit("childPageInfo_Total",{total:this.pageInfo.total,users:this.users});
            })
        
       
      }
      }
    },
  },
  watch:{
        
            
  },
};
</script>
