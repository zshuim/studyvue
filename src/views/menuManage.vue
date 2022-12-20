<template>
  <div class='app_menuManage'>
      <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: 'home' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="main">
    <div class="menutableBox">
        <el-table
          ref="menuMangeTable"
          :data="tableDate.menus"
          tooltip-effect="dark"
          style="width: 100%"
          stripe
          class="userMangeTable"
        >
          <el-table-column type="index" label="#" width="90" > </el-table-column>
          <el-table-column prop="menuName" label="menuName" min-width="10%" >
          </el-table-column>
          <el-table-column prop="iconUrl" label="iconUrl" min-width="10%" >
          </el-table-column>
          <el-table-column prop="linkUrl" label="linkUrl" min-width="10%" align="center">
          </el-table-column>
          <!-- <el-table-column label="启用" min-width="10%">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.open"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="switchChange(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column> -->
          <el-table-column min-width="20%" align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" >AddRole</el-button>
              <el-button size="mini" >DelRole</el-button>
              <el-button size="mini" disabled>Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    </el-card>
  </div>
</template>

<script>
import requests from "@/api/request";
export default {
  components: {},
  props: {},
  data() {
    return {
      tableDate:{
        menus:[],
      },
    }
  },
  created() {
    this.getMenuList();
  },
  mounted() {},
  methods: {
      getMenuList(){
        requests.get('http://localhost:3005/data').then((resp)=>{
            this.tableDate.menus = resp.sysMenuList;
            
        })
      },
  }
};
</script>

<style src="@/style/menuManage.css" scoped >

</style>
