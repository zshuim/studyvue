<template>
  <div class="GroupBox">
    <div class="headBox">
      <div class="searchBox">
        <el-input v-model="searchGroupName">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="collegeButtonBox">
        <el-button size="mini" @click="addGroup">Add</el-button>
        <el-button type="danger" size="mini" @click="delGroups"
          >Delete</el-button
        >
      </div>
    </div>
    <div class="tableBox">
      <el-table
        ref="userMangeTable"
        :data="tableInfo.Groups"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        class="userMangeTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="0"> </el-table-column>
        <el-table-column type="index" label="#" width="90"> </el-table-column>
        <el-table-column prop="deptName" label="名称" min-width="50%">
        </el-table-column>
        <el-table-column label="启用" min-width="10%">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.delFlag"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="switchChange($event, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column min-width="24%" align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="createUserPane(scope.row)"
              >人员</el-button
            >
            <el-button size="mini" @click="editCollege(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              style="margin-top: 5px"
              @click="delGroup(scope.row)"
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
    <!-- <UserPane v-if="openUserDrawerflag" :GroupInfo="GroupInfo" :openUserDrawer="openUserDrawerflag" @getcloseUserDrawer="setopenUserDrawerflag"></UserPane> -->
  </div>
</template>

<script>
import { searchGroup, delDepts } from "@/utils/deptMange";
import UserPane from "@/components/deptManage/adduser.vue"
export default {
  components: {
     UserPane,
  },
  props: {
    // Tch 教师组
    // NomalClass 普通班级
    // AdminClass 行政班级
    groupType: String,
    collageID: String,
  },
  data() {
    return {
      pageInfo: {
        pagesize: 5,
        pagenum: 1,
        total: 0,
      },
      tableInfo: {
        Groups: [],
        selectGroupID: [],
        selectGroup: [],
      },
      searchGroupName: "",
      clearsearchGroupName: "",
      GroupInfo:{},
      openUserDrawerflag:true,
    };
  },
  created() {
    if (this.groupType == "Tch") {
      searchGroup(
        this.pageInfo,
        this.collageID,
        "教师组",
        this.clearsearchGroupName
      ).then((resp) => {
        console.log(resp);

        this.pageInfo.total = resp.sysDeptCount;
        this.tableInfo.Groups = resp.sysDeptList;
      });
    } else if (this.groupType == "NomalClass") {
      searchGroup(
        this.pageInfo,
        this.collageID,
        "普通班级",
        this.clearsearchGroupName
      ).then((resp) => {
        this.pageInfo.total = resp.sysDeptCount;
        this.tableInfo.Groups = resp.sysDeptList;
      });
    } else if (this.groupType == "AdminClass") {
      searchGroup(
        this.pageInfo,
        this.collageID,
        "行政班级",
        this.clearsearchGroupName
      ).then((resp) => {
        this.pageInfo.total = resp.sysDeptCount;
        this.tableInfo.Groups = resp.sysDeptList;
      });
    }
  },
  mounted() {},
  methods: {
    searchGroupByName() {
      this.clearsearchGroupName = this.searchGroupName;
      this.pageInfo.pagesize = 5;
      this.pageInfo.pagenum = 1;
      if (this.groupType == "Tch") {
        searchGroup(
          this.pageInfo,
          this.collageID,
          "教师组",
          this.clearsearchGroupName
        ).then((resp) => {
          console.log(resp);

          this.pageInfo.total = resp.sysDeptCount;
          this.tableInfo.Groups = resp.sysDeptList;
        });
      } else if (this.groupType == "NomalClass") {
        searchGroup(
          this.pageInfo,
          this.collageID,
          "普通班级",
          this.clearsearchGroupName
        ).then((resp) => {
          this.pageInfo.total = resp.sysDeptCount;
          this.tableInfo.Groups = resp.sysDeptList;
        });
      } else if (this.groupType == "AdminClass") {
        searchGroup(
          this.pageInfo,
          this.collageID,
          "行政班级",
          this.clearsearchGroupName
        ).then((resp) => {
          this.pageInfo.total = resp.sysDeptCount;
          this.tableInfo.Groups = resp.sysDeptList;
        });
      }
    },
    addGroup() {
      this.$prompt("请输入组织名", "创建组织", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator(value) {
          if (value == null) {
            return "组织名不能为空";
          } else if (!value.match("^[a-zA-Z0-9_\u4e00-\u9fa5]+$")) {
            return "不支持特殊字符";
          } else if (value.length > 10) {
            return "请输入20个字符以内的组织名称";
          }
        },
      })
        .then(({ value }) => {
          if (this.groupType == "Tch") {
            console.log(this.collageID, "教师组", value);
            this.$message({
              type: "success",
              message: "组织是: " + value,
            });
          } else if (this.groupType == "NomalClass") {
            console.log(this.collageID, "普通班级", value);
            this.$message({
              type: "success",
              message: "组织是: " + value,
            });
          } else if (this.groupType == "AdminClass") {
            console.log(this.collageID, "行政班级", value);
            this.$message({
              type: "success",
              message: "组织是: " + value,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    editCollege(callback) {
      this.$prompt(`原组织名：${callback.deptName}`, "编辑组织", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator(value) {
          if (value == null) {
            return "组织名不能为空";
          } else if (!value.match("^[a-zA-Z0-9_\u4e00-\u9fa5]+$")) {
            return "不支持特殊字符";
          } else if (value.length > 10) {
            return "请输入20个字符以内的组织名称";
          }
        },
      })
        .then(({ value }) => {
          console.log(callback.id, value);
          this.$message({
            type: "success",
            message: "组织是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消编辑",
          });
        });
    },
    delGroups() {
      delDepts(this.tableInfo.selectGroupID);
    },
    handleSelectionChange(val) {
      this.tableInfo.selectGroupID = [];
      this.tableInfo.selectGroup = val;
      for (var i = 0; i < val.length; i++) {
        this.tableInfo.selectGroupID.push(val[i].id);
      }
    },
    delGroup(callback) {
      delDepts(callback.id);
    },
    switchChange($event, callback) {
      console.log($event);
      console.log(callback);
    },
    handleSizeChange(callback) {
      this.pageInfo.pagesize = callback;
      if (this.groupType == "Tch") {
        searchGroup(
          this.pageInfo,
          this.collageID,
          "教师组",
          this.clearsearchGroupName
        ).then((resp) => {
          console.log(resp);

          this.pageInfo.total = resp.sysDeptCount;
          this.tableInfo.Groups = resp.sysDeptList;
        });
      } else if (this.groupType == "NomalClass") {
        searchGroup(
          this.pageInfo,
          this.collageID,
          "普通班级",
          this.clearsearchGroupName
        ).then((resp) => {
          this.pageInfo.total = resp.sysDeptCount;
          this.tableInfo.Groups = resp.sysDeptList;
        });
      } else if (this.groupType == "AdminClass") {
        searchGroup(
          this.pageInfo,
          this.collageID,
          "行政班级",
          this.clearsearchGroupName
        ).then((resp) => {
          this.pageInfo.total = resp.sysDeptCount;
          this.tableInfo.Groups = resp.sysDeptList;
        });
      }
    },
    handleCurrentChange() {
      this.pageInfo.pagenum = callback;
      if (this.groupType == "Tch") {
        searchGroup(
          this.pageInfo,
          this.collageID,
          "教师组",
          this.clearsearchGroupName
        ).then((resp) => {
          console.log(resp);

          this.pageInfo.total = resp.sysDeptCount;
          this.tableInfo.Groups = resp.sysDeptList;
        });
      } else if (this.groupType == "NomalClass") {
        searchGroup(
          this.pageInfo,
          this.collageID,
          "普通班级",
          this.clearsearchGroupName
        ).then((resp) => {
          this.pageInfo.total = resp.sysDeptCount;
          this.tableInfo.Groups = resp.sysDeptList;
        });
      } else if (this.groupType == "AdminClass") {
        searchGroup(
          this.pageInfo,
          this.collageID,
          "行政班级",
          this.clearsearchGroupName
        ).then((resp) => {
          this.pageInfo.total = resp.sysDeptCount;
          this.tableInfo.Groups = resp.sysDeptList;
        });
      }
    },
    // openUserPane(callback){
    //     this.GroupInfo = callback;
    //     this.openUserDrawerflag = true;
    // },
    // setopenUserDrawerflag(){
    //     this.openUserDrawerflag = false;
    // },
    createUserPane(callback){
        callback.groupType = this.groupType;
        this.$emit("CreateUserPane",callback);
    }
  },
};
</script>

<style src="@/style/deptManage.css" scoped></style>
