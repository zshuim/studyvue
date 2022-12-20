<template>
  <div class="collegeBox">
    <div class="headBox">
      <div class="searchBox">
        <el-input v-model="searchDept">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchCollegeByName"
          ></el-button>
        </el-input>
      </div>
      <div class="collegeButtonBox">
        <el-button size="mini" @click="addCollege">Add</el-button>
        <el-button type="danger" size="mini" @click="delColleges"
          >Delete</el-button
        >
      </div>
    </div>
    <div class="tableBox">
      <el-table
        ref="userMangeTable"
        :data="tableInfo.Colleges"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        class="userMangeTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="0"> </el-table-column>
        <el-table-column type="index" label="#" width="90"> </el-table-column>
        <el-table-column prop="deptName" label="学院名称" min-width="50%">
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
        <el-table-column min-width="24%" align="left" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="createTchPane(scope.row)">教师组</el-button>
            <el-button size="mini" @click="createNomalClasaaPane(scope.row)">普通班级</el-button>
            <el-button size="mini"  @click="createAdminClasaaPane(scope.row)">行政班级</el-button>
            <el-button size="mini" @click="editCollege(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="delCollege(scope.row)"
              style="margin-top: 5px"
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
  </div>
</template>

<script>
import { searchCollege , delDepts } from "@/utils/deptMange";
export default {
  components: {},
  props: {},
  data() {
    return {
      searchDept: "",
      clearsearchDept: "",

      deptType: "学院",
      tableInfo: {
        Colleges: [],
        selectCollege: [],
        selectCollegeID: [],
      },
      pageInfo: {
        pagesize: 5,
        pagenum: 1,
        total: 0,
      },
    };
  },
  created() {
    searchCollege(this.pageInfo, this.searchDept, this.deptType).then(
      (resp) => {
        this.pageInfo.total = resp.sysDeptCount;
        this.tableInfo.Colleges = resp.sysDeptList;
      }
    );
  },
  mounted() {},
  methods: {
    searchCollegeByName() {
      this.clearsearchDept = this.searchDept;
      this.pageInfo.pagesize = 5;
      this.pageInfo.pagenum = 1;
      searchCollege(this.pageInfo, this.clearsearchDept, this.deptType);
    },
    addCollege() {
      this.$prompt("请输入学院名", "创建学院", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator(value) {
          if (value == null) {
            return "学院名不能为空";
          } else if (!value.match("^[a-zA-Z0-9_\u4e00-\u9fa5]+$")) {
            return "不支持特殊字符";
          } else if (value.length > 10) {
            return "请输入20个字符以内的分组名称";
          }
        },
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "学院是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    handleSelectionChange(val) {
      this.tableInfo.selectCollegeID = [];
      this.tableInfo.selectCollege = val;
      for (var i = 0; i < val.length; i++) {
        this.tableInfo.selectCollegeID.push(val[i].id);
      }
    },
    delColleges() {
      delDepts(this.tableInfo.selectCollegeID)
    },
    switchChange($event, state) {
      if (!state.open) {
        var Collegeid = [];
        Collegeid.push(state.id);
      } else if (state.open) {
        // !复活操作
      }
    },
    delCollege(callback) {
      var Collegeid = [];
      Collegeid.push(callback.id);
      delDepts(Collegeid);
    },
    editCollege(callback) {
      this.$prompt(`原学院名：${callback.deptName}`, "编辑学院", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator(value) {
          if (value == null) {
            return "学院名不能为空";
          } else if (!value.match("^[a-zA-Z0-9_\u4e00-\u9fa5]+$")) {
            return "不支持特殊字符";
          } else if (value.length > 10) {
            return "请输入20个字符以内的分组名称";
          }
        },
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "学院是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消编辑",
          });
        });
    },
    handleSizeChange(callback) {
      this.pageInfo.pagesize = callback;
      searchCollege(this.pageInfo, this.clearsearchDept, this.deptType);
    },
    handleCurrentChange(callback) {
      this.pageInfo.pagenum = callback;
      searchCollege(this.pageInfo, this.clearsearchDept, this.deptType);
    },
    createTchPane(callback){
    this.$emit('CreatePane', [callback,"Tch",0])},
    createNomalClasaaPane(callback){
      this.$emit('CreatePane',[callback,"NomalClass",1])
    },
    createAdminClasaaPane(callback){
      this.$emit('CreatePane', [callback,"AdminClass",2])
    },
  },
};
</script>

<style src="@/style/deptManage.css" scoped></style>
