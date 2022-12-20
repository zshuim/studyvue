<template>
    <div class="app_useManage">
        <el-breadcrumb>
            <el-breadcrumb-item :to="{path:'home'}">主页</el-breadcrumb-item>
            <el-breadcrumb-item>教师管理</el-breadcrumb-item>
        </el-breadcrumb>
         <el-card class="main">
      <div class="headerBox">
        <div class="searchTool">
          <el-input
            placeholder="请输入内容"
            v-model="userName"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchUserName"
            ></el-button>
          </el-input>
        </div>
        <div class="deptsearchTool">
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
        <div class="filebuttonarea">
          <el-button>导出</el-button>
          <el-button>导入</el-button>
          <el-button>下载上传文件</el-button>
        </div>
        <div class="usermangebutton">
          <el-button type="primary" @click="contrall.userplay = 'add';contrall.addPlane = true">添加</el-button>
          <el-button type="primary" @click="delusers">删除</el-button>
        </div>
      </div>
      <div class="tableBox">
        <el-table
          ref="userMangeTable"
          :data="users"
          tooltip-effect="dark"
          style="width: 100%"
          stripe
          class="userMangeTable"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column prop="date" label="日期" min-width="10%">
          </el-table-column>
          <el-table-column prop="name" label="姓名" min-width="10%">
          </el-table-column>
          <el-table-column prop="address" label="地址" min-width="10%">
          </el-table-column>
          <el-table-column label="启用" min-width="10%">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.open"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="switchChange(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column min-width="20%" align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="contrall.RolePlane = true">Role</el-button>
              <el-button size="mini" @click="contrall.userplay = 'edit';contrall.addPlane = true">Edit</el-button>
              <el-button size="mini" type="danger" @click="delUser(scope.row)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pageBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.pagenum"
          :page-sizes="[5, 10]"
          :page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next"
          :total="pageInfo.total"
        >
        </el-pagination>
      </div>
    </el-card>
    <adduser v-if="contrall.addPlane" :userplay="contrall.userplay" :closeaddPlane="contrall.addPlane" @closePlane="getaddclosePlan"></adduser>
    <changeRole v-if="contrall.RolePlane" @closePlane="getRolecloseplan"></changeRole>
  </div>
</template>

<script>
import * as userManageapi from "@/utils/userManage";
import Adduser from "@/components/useManage/addTch.vue"
import changeRole from '@/components/useManage/chagerole.vue'
export default {
  components: {
    Adduser,
    changeRole,
  },
  /**
   * 组件创建时执行
   */
  created() {
    userManageapi.tchDeptList().then((resp) => {
      this.deptOption = userManageapi.modifyDeptStructure(resp);
    });
    userManageapi
      .getSearchUserList(
        this.pageInfo,
        this.clearUserName,
        this.str_selectedOptions,
        "teacher"
      )
      .then((resp) => {
        this.users = resp.tableData;
      });
  },
  mounted() {},

  data() {
    return {
        contrall:{
            addPlane:false,
            userplay:"add", // 默认是添加 add  编辑 edit 
            RolePlane:false,
        },


      userName: "",
      clearUserName: "",
      /**
        pagenum : 当前页
        pagesize ： 当前页大小
        total : 总共有几条记录
     */
      pageInfo: {
        // 页面信息
        pagenum: 1,
        pagesize: 5,
        total: 7,
      },
      deptsty: "tch", // 用户类型
      users: [], // 用户数组
      //键名可通过 Props 属性配置
      deptProps: {
        value: "deptName",
        label: "deptName",
        children: "children",
        checkStrictly: true,
      },
      //   组织架构可选数据源
      deptOption: [],
      //   选中项绑定值
      arr_selectedOptions: [],
      //   选中的条件拼接成字符串
      str_selectedOptions: "",
      tableInfo: {
        multipleSelection: [],
      },
    };
  },
  methods: {
    
    /**
     * 当选中数据改变时触发
     * @param {*} valuse ----- 回调参数，选中的数据
     */
    handleSelectionChange(val) {
      this.tableInfo.multipleSelection = val;
    },
    delUser(user) {
      var userid = [];
      userid.push(user.id);
      userManageapi.delUser(userid, true);
      userManageapi.getSearchUserList(
        this.pageInfo,
        this.clearUserName,
        this.str_selectedOptions,
        "teacher"
      );
    },
    delusers() {
      userManageapi.delUsers(this.tableInfo.multipleSelection);
      userManageapi.getSearchUserList(
        this.pageInfo,
        this.clearUserName,
        this.str_selectedOptions,
        "teacher"
      );
    },
    switchChange(state) {
      if (!state.open) {
        var userid = [];
        userid.push(state.id);
        userManageapi.delUser(userid, false);
      }
      else if(state.open){
        // !复活操作
      }
      console.log(state);
      
      userManageapi.getSearchUserList(
        this.pageInfo,
        this.clearUserName,
        this.str_selectedOptions,
        "teacher"
      );
    },
    // 组织清空时调用
    deptChange(valuse) {
      if (this.$refs.deptRef.checkedValue.length === 0) {
        this.arr_selectedOptions = [];
        this.str_selectedOptions = "";
        this.pageInfo.pagenum = 1;
        this.pageInfo.pagesize = 5;
        userManageapi.getSearchUserList(
          this.pageInfo,
          this.clearUserName,
          this.str_selectedOptions,
          "teacher"
        );
      } else {
      }
    },
    screen_User(callback) {
    console.log(callback)
      this.str_selectedOptions = userManageapi.screen_User(
        this.arr_selectedOptions,
        callback,
        this.deptsty
      );
      userManageapi.getSearchUserList(
        this.pageInfo,
        this.clearUserName,
        this.str_selectedOptions,
        "teacher"
      );
    },
    handleSizeChange(callback) {
      this.pageInfo.pagesize = callback;
      userManageapi.getSearchUserList(
        this.pageInfo,
        this.clearUserName,
        this.str_selectedOptions,
        "teacher"
      );
    },
    handleCurrentChange(callback) {
      this.pageInfo.pagenum = callback;
      userManageapi.getSearchUserList(
        this.pageInfo,
        this.clearUserName,
        this.str_selectedOptions,
        "teacher"
      );
    },
    searchUserName() {
      this.clearUserName = this.userName;
      this.pageInfo.pagenum = 1;
      this.pageInfo.pagesize = 5;
      userManageapi.getSearchUserList(
        this.pageInfo,
        this.clearUserName,
        this.str_selectedOptions,
        "teacher"
      );
    },
    getaddclosePlan(val){
        this.contrall.addPlane = val;
    },
    getRolecloseplan(val){
        this.contrall.RolePlane = val;
    }
  },
};
</script>

<style src="@/style/userManage.css" scoped></style>
