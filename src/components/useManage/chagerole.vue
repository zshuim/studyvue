<template>
  <div class="chageroleBox clearfix">
    <el-drawer
      :visible.sync="tabledialog"
      direction="rtl"
      size="50%"
      :before-close="handleClose"
    >
      <div
        class="searchRole"
        style="width: 25%; margin-left: 5%; margin-bottom: 50px"
      >
        <el-input>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="changeRoleTableBox" style="margin: 0 5% 0 5%">
        <el-table
          ref="userMangeTable"
          :data="tableInfo.Roles"
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
          <el-table-column label="启用" min-width="10%">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.open"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column min-width="20%" align="center">
            <template>
              <el-button size="mini">Role</el-button>
              <el-button size="mini">Edit</el-button>
              <el-button size="mini" type="danger">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pageBox" style="margin-top: 30px">
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
      <div class="buttonBox" style="margin-top: 40px; position: relative">
        <el-button
          type="primary"
          style="position: absolute; right: 120px"
          @click="commitRoleInfo"
          >commit</el-button
        >
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getSearchRoleList } from "@/utils/userManage";
export default {
  data() {
    return {
      tabledialog: true,
      tableInfo: {
        Roles: [],
        multipleSelection: [],
        // 数据库里选中
        UserselectedRoles: [],
        // 用于本地修改
        Modify_UserselectedRoles: [],
        add_roles: [],
        del_roles: [],
      },
      pageInfo: {
        pagesize: 5,
        pagenum: 1,
        total: 7,
      },
    };
  },
  created() {
    getSearchRoleList().then((resp) => {
      this.tableInfo.Roles = resp.tableData;
      var temp = resp.selectdate;
      this.tableInfo.Modify_UserselectedRoles = resp.selectdate;
      this.tableInfo.UserselectedRoles = JSON.parse(JSON.stringify(temp));
      this.npage_default_selected = [];
      for (var j = 0; j < this.tableInfo.Modify_UserselectedRoles.length; j++) {
        for (var i = 0; i < this.tableInfo.Roles.length; i++) {
          if (
            this.tableInfo.Roles[i].date ==
            this.tableInfo.Modify_UserselectedRoles[j].date
          ) {
            this.toggleSelection(this.tableInfo.Roles[i]);
            break;
          }
        }
      }
    });
  },
  mounted() {},
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          (this.tableInfo = {
            Roles: [],
            multipleSelection: [],
            // 数据库里选中
            UserselectedRoles: [],
            // 用于本地修改
            Modify_UserselectedRoles: [],
            add_roles: [],
            del_roles: [],
          }),
            (this.pageInfo = {
              pagesize: 5,
              pagenum: 1,
              total: 0,
            });
          this.giveThingToFar(false);
          done();
        })
        .catch((_) => {});
    },
    // 用于默认选中
    toggleSelection(row) {
      this.$nextTick(() => {
        this.$refs.userMangeTable.toggleRowSelection(row, true);
      });
    },
    /**
     * 当选中数据改变时触发
     * @param {*} valuse ----- 回调参数，选中的数据
     */
    handleSelectionChange(val) {
      console.log(val);
      for (var i = 0; i < this.tableInfo.Modify_UserselectedRoles.length; i++) {
        for (var j = 0; j < this.tableInfo.Roles.length; j++) {
          if (
            this.tableInfo.Modify_UserselectedRoles[i].date ==
            this.tableInfo.Roles[j].date
          ) {
            this.tableInfo.Modify_UserselectedRoles.pop(
              this.tableInfo.Roles[j]
            );
            // console.log(2);
            i--;
            break;
          }
        }
      }
      for (var j = 0; j < val.length; j++) {
        this.tableInfo.Modify_UserselectedRoles.push(val[j]);
      }
      this.tableInfo.multipleSelection = val;
    },

    handleSizeChange() {
      getSearchRoleList().then((resp) => {
        this.tableInfo.Roles = resp.tableData;
        var temp = resp.selectdate;
        this.tableInfo.Modify_UserselectedRoles = resp.selectdate;
        this.tableInfo.UserselectedRoles = JSON.parse(JSON.stringify(temp));

        for (
          var j = 0;
          j < this.tableInfo.Modify_UserselectedRoles.length;
          j++
        ) {
          for (var i = 0; i < this.tableInfo.Roles.length; i++) {
            if (
              this.tableInfo.Roles[i].date ==
              this.tableInfo.Modify_UserselectedRoles[j].date
            ) {
              this.toggleSelection(this.tableInfo.Roles[i]);
              break;
            }
          }
        }
      });
    },
    handleCurrentChange() {
      getSearchRoleList().then((resp) => {
        this.tableInfo.Roles = resp.tableData;
        var temp = resp.selectdate;
        this.tableInfo.Modify_UserselectedRoles = resp.selectdate;
        this.tableInfo.UserselectedRoles = JSON.parse(JSON.stringify(temp));

        for (
          var j = 0;
          j < this.tableInfo.Modify_UserselectedRoles.length;
          j++
        ) {
          for (var i = 0; i < this.tableInfo.Roles.length; i++) {
            if (
              this.tableInfo.Roles[i].date ==
              this.tableInfo.Modify_UserselectedRoles[j].date
            ) {
              this.toggleSelection(this.tableInfo.Roles[i]);
              break;
            }
          }
        }
      });
    },
    commitRoleInfo() {
      this.tableInfo.add_roles = [];
      this.tableInfo.del_roles = [];
      for (var i = 0; i < this.tableInfo.UserselectedRoles.length; i++) {
        for (
          var j = 0;
          j < this.tableInfo.Modify_UserselectedRoles.length;
          j++
        ) {
          if (
            this.tableInfo.UserselectedRoles[i].date ==
            this.tableInfo.Modify_UserselectedRoles[j].date
          ) {
            // console.log(this.tableInfo.Modify_UserselectedRoles[j])
            break;
          }
        }
        if (j == this.tableInfo.Modify_UserselectedRoles.length) {
          this.tableInfo.del_roles.push(this.tableInfo.UserselectedRoles[i]);
        }
      }
      for (var i = 0; i < this.tableInfo.Modify_UserselectedRoles.length; i++) {
        for (var j = 0; j < this.tableInfo.UserselectedRoles.length; j++) {
          if (
            this.tableInfo.UserselectedRoles[j].date ==
            this.tableInfo.Modify_UserselectedRoles[i].date
          ) {
            break;
          }
        }
        if (j == this.tableInfo.UserselectedRoles.length) {
          this.tableInfo.add_roles.push(
            this.tableInfo.Modify_UserselectedRoles[i]
          );
        }
      }
    },
    giveThingToFar(closePlane){
        this.$emit('closePlane', closePlane);
    },
  },
};
</script>
