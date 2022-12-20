<template>
  <div class="addUserBox">
    <div class="adduserDialogBox">
      <el-drawer
        :title="DrawerInfo.title"
        :visible.sync="openuserPane"
        direction="rtl"
        size="50%"
        :before-close="handleClose"
        class="userDialog"
      >
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
            <el-button size="mini" @click="commitUser">Add</el-button>
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
            <el-table-column type="index" label="#" width="90">
            </el-table-column>
            <el-table-column prop="name" label="名称" min-width="20%">
            </el-table-column>
            <el-table-column prop="id" label="学号" min-width="20%">
            </el-table-column>
            <el-table-column min-width="24%" align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="addUser(scope.row)"
                  >Add</el-button
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
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { getSearchUserList } from "@/utils/userManage";
export default {
  components: {},
  props: {
    GroupInfo: Object,
    openUserDrawer: Boolean,
  },
  data() {
    return {
      openuserPane: false,
      searchUserName: "",
      clearsearchUserName: "",
      GroupType: "",
      DrawerInfo: {
        title: "",
      },
      tableInfo: {
        Users: [],
        selectUsers: [],
      },
      pageInfo: {
        pagesize: 5,
        pagenum: 1,
        total: 0,
      },
    };
  },
  created() {
    this.openuserPane = this.openUserDrawer;
    this.DrawerInfo.title = this.GroupInfo.deptName;
    if (this.GroupInfo.groupType == "Tch") {
      this.GroupType = "teacher";
      getSearchUserList(
        this.pageInfo,
        this.clearsearchUserName,
        "",
        "teacher"
      ).then((resp) => {
        this.pageInfo.total = resp.total;
        this.tableInfo.Users = resp.tableData;
      });
    } else {
      this.GroupType = "student";
      getSearchUserList(
        this.pageInfo,
        this.clearsearchUserName,
        "",
        "student"
      ).then((resp) => {
        this.pageInfo.total = resp.total;
        this.tableInfo.Users = resp.tableData;
      });
    }
  },
  mounted() {},
  destroyed() {
    console.log("我没了");
  },
  methods: {
    searchUserByName() {
      this.clearsearchUserName = this.searchUserName;
      this.pageInfo.pagesize = 5;
      this.pageInfo.pagenum = 1;
      if (this.tableInfo.selectUsers.length == 0) {
        getSearchUserList(
          this.pageInfo,
          this.clearsearchUserName,
          "",
          this.GroupType
        ).then((resp) => {
          console.log(resp);
          this.pageInfo.total = resp.total;
          this.tableInfo.Users = resp.tableData;
        });
      } else {
        this.$confirm("是否将当前选中用户添加入组织, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            var UserIDs = this.tableInfo.selectUsers;
            var add_stuarray = [];
            var del_stuarray = [];
            UserIDs.forEach((item) => {
              add_stuarray.push(item.id);
            });
            console.log(add_stuarray, del_stuarray, this.GroupInfo.id);
            getSearchUserList(
              this.pageInfo,
              this.clearsearchUserName,
              "",
              this.GroupType
            ).then((resp) => {
              console.log(resp);
              this.pageInfo.total = resp.total;
              this.tableInfo.Users = resp.tableData;
            });
            this.$message({
              type: "success",
              message: "添加成功!",
            });
          })
          .catch(() => {
            getSearchUserList(
              this.pageInfo,
              this.clearsearchUserName,
              "",
              this.GroupType
            ).then((resp) => {
              console.log(resp);
              this.pageInfo.total = resp.total;
              this.tableInfo.Users = resp.tableData;
            });
            this.$message({
              type: "info",
              message: "已取消添加",
            });
          });
      }
    },
    handleSelectionChange(callback) {
      this.tableInfo.selectUsers = callback;
    },
    commitUser() {
      this.$confirm("是否将选中用户添加入组织, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var UserIDs = this.tableInfo.selectUsers;
          var add_stuarray = [];
          var del_stuarray = [];
          UserIDs.forEach((item) => {
            add_stuarray.push(item.id);
          });
          console.log(add_stuarray, del_stuarray, this.GroupInfo.id);
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加",
          });
        });
    },
    addUser(callback) {
      this.$confirm("是否要将此用户添加入组织, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var add_stuarray = [];
          var del_stuarray = [];
          add_stuarray.push(callback.id);
          console.log(add_stuarray, del_stuarray, this.GroupInfo.id);
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加",
          });
        });
    },
    handleSizeChange() {},
    handleCurrentChange(callback) {
      this.pageInfo.pagenum = callback;

      if (this.tableInfo.selectUsers.length == 0) {
        getSearchUserList(
          this.pageInfo,
          this.clearsearchUserName,
          "",
          this.GroupType
        ).then((resp) => {
          console.log(resp);
          this.pageInfo.total = resp.total;
          this.tableInfo.Users = resp.tableData;
        });
      } else {
        this.$confirm("是否将当前选中用户添加入组织, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            var UserIDs = this.tableInfo.selectUsers;
            var add_stuarray = [];
            var del_stuarray = [];
            UserIDs.forEach((item) => {
              add_stuarray.push(item.id);
            });
            console.log(add_stuarray, del_stuarray, this.GroupInfo.id);
            getSearchUserList(
              this.pageInfo,
              this.clearsearchUserName,
              "",
              this.GroupType
            ).then((resp) => {
              console.log(resp);
              this.pageInfo.total = resp.total;
              this.tableInfo.Users = resp.tableData;
            });
            this.$message({
              type: "success",
              message: "添加成功!",
            });
          })
          .catch(() => {
            getSearchUserList(
              this.pageInfo,
              this.clearsearchUserName,
              "",
              this.GroupType
            ).then((resp) => {
              console.log(resp);
              this.pageInfo.total = resp.total;
              this.tableInfo.Users = resp.tableData;
            });
            this.$message({
              type: "info",
              message: "已取消添加",
            });
          });
      }
    },
    handleClose(done) {
      if (this.tableInfo.selectUsers.length == 0) {
        this.$confirm("确认关闭？")
          .then((_) => {
            this.$emit("getcloseUserDrawer", false);
            done();
          })
          .catch((_) => {});
      } else {
        this.$confirm("是否将选中用户添加入组织, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            var UserIDs = this.tableInfo.selectUsers;
            var add_stuarray = [];
            var del_stuarray = [];
            UserIDs.forEach((item) => {
              add_stuarray.push(item.id);
            });
            console.log(add_stuarray, del_stuarray, this.GroupInfo.id);
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.$emit("getcloseUserDrawer", false);
            done();
          })
          .catch(() => {
            this.$confirm("确认关闭？")
              .then((_) => {
                this.$emit("getcloseUserDrawer", false);
                done();
              })
              .catch((_) => {});
            this.$message({
              type: "info",
              message: "已取消添加",
            });
          });
      }
    },
  },
};
</script>

<style src="@/style/deptManage.css" scoped></style>
