<template>
  <div class="UserBox">
    <div class="headBox">
      <div class="searchBox">
        <el-input v-model="searchUserName">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchUserByName"
          ></el-button>
        </el-input>
      </div>
      <div class="collegeButtonBox">
        <el-button size="mini" @click="openUserDrawer = true ">Add</el-button>
        <el-button type="danger" size="mini" @click="delUsers"
          >Delete</el-button
        >
      </div>
    </div>
    <div class="tableBox">
      <el-table
        ref="userMangeTable"
        :data="tableInfo.Users"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        class="userMangeTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="0"> </el-table-column>
        <el-table-column type="index" label="#" width="90"> </el-table-column>
        <el-table-column prop="name" label="名称" min-width="20%">
        </el-table-column>
        <el-table-column prop="date" label="日期" min-width="20%">
        </el-table-column>
        <el-table-column prop="address" label="地址" min-width="20%">
        </el-table-column>
        <el-table-column label="启用" min-width="10%">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.open"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="switchChange($event, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column min-width="24%" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="margin-top: 5px"
              @click="delUser(scope.row)"
              >删除</el-button
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
        layout="total, prev, pager, next"
        :total="pageInfo.total"
      >
      </el-pagination>
    </div>
    <addUser v-if="openUserDrawer" :GroupInfo="Group" :openUserDrawer="openUserDrawer" @getcloseUserDrawer="setaddUserPaneClose"></addUser>
  </div>
</template>

<script>
import { getGroup_User, delORaddGroup_User } from "@/utils/deptMange";
import addUser from "@/components/deptManage/adduser.vue"
export default {
  components: {
    addUser,
  },
  props: {
    Group: Object,
  },
  data() {
    return {
      pageInfo: {
        pagenum: 1,
        pagesize: 5,
        total: 0,
      },
      tableInfo: {
        Users: [],
        selectUsers: [],
      },
      searchUserName: "",
      clearsearchUserName: "",
      openUserDrawer:false,
    };
  },
  created() {
    getGroup_User(this.pageInfo, this.clearsearchUserName, this.Group.id).then(
      (resp) => {
        this.tableInfo.Users = resp.tableData;
        this.pageInfo.total = resp.total;
      }
    );
  },
  mounted() {},
  methods: {
    searchUserByName() {
      this.pageInfo.pagenum = 1;
      this.clearsearchUserName = this.searchUserName;
      getGroup_User(
        this.pageInfo,
        this.clearsearchUserName,
        this.Group.id
      ).then((resp) => {
        this.tableInfo.Users = resp.tableData;
        this.pageInfo.total = resp.total;
      });
    },
    handleSelectionChange(callback) {
      this.tableInfo.selectUsers = callback;
    },
    switchChange(callback) {
      console.log(callback);
    },
    delUsers() {
      var delarr = [];
      var addarr = [];
      var selectUsers = this.tableInfo.selectUsers;
      selectUsers.forEach((item) => {
        delarr.push(item.id);
      });
      delORaddGroup_User(addarr, delarr, this.Group.id);
    },
    delUser(callback) {
      var delarr = [];
      var addarr = [];
      delarr.push(callback.id);
      delORaddGroup_User(addarr, delarr, this.Group.id);
    },
    handleSizeChange(callback) {
      this.pageInfo.pagesize = callback;
      getGroup_User(
        this.pageInfo,
        this.clearsearchUserName,
        this.Group.id
      ).then((resp) => {
        this.tableInfo.Users = resp.tableData;
        this.pageInfo.total = resp.total;
      });
    },
    handleCurrentChange(callback) {
      this.pageInfo.pagenum = callback;
      getGroup_User(
        this.pageInfo,
        this.clearsearchUserName,
        this.Group.id
      ).then((resp) => {
        this.tableInfo.Users = resp.tableData;
        this.pageInfo.total = resp.total;
      });
    },
    setaddUserPaneClose(callback){
        this.openUserDrawer = callback;
    },
  },
};
</script>

<style src="@/style/deptManage.css" scoped></style>
