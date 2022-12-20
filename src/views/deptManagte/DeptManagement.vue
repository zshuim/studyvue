<template>
  <div class="app_deptManage">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: 'home' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item>组织管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tabsBox">
      <el-tabs
        type="border-card"
        class="tabBox"
        @tab-click="clicktabpane"
        @tab-remove="closetabpane"
        v-model="currentTabpane"
      >
        <el-tab-pane
          key="collage"
          label="collage"
          name="collage"
          :closable="collegeclosecss"
        >
          <collegePane @CreatePane="createPane"></collegePane>
        </el-tab-pane>
        <el-tab-pane
          v-for="item in TabPanes"
          :key="item.name"
          :label="item.title"
          :name="item.name"
          closable
        >
          <classPane
            v-if="item.tabpaneType == 'Group'"
            :groupType="item.groupType"
            :collageID="item.collageID"
            @CreateUserPane="createUserPane"
          ></classPane>
          <userPane v-if="item.tabpaneType == 'User'" :Group="item.dept_Group"></userPane>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import collegePane from "@/components/deptManage/collegePane.vue";
import classPane from "@/components/deptManage/GroupPane.vue";
import userPane from "@/components/deptManage/user.vue";
export default {
  components: {
    collegePane,
    classPane,
    userPane,
  },
  props: {},
  data() {
    return {
      collegeclosecss: false,
      currentTabpane: "collage",
      TabPanes: [
        // {
        //   title: "电机学院-Tch",
        //   name: "3469002011406499840",
        //   tabpaneType: "Group",
        // },
        // {
        //   title: "电机学院-Tch-User",
        //   name: "346900201140649984",
        //   tabpaneType: "User",
        //   dept_Group:{
        //     id:1,
        //   }
        // },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    createPane(callback) {
      var tabs = this.TabPanes;
      var pushfalg = true;
      tabs.forEach((tab) => {
        if (tab.name == `${callback[0].id}${callback[2]}`) {
          this.currentTabpane = `${callback[0].id}${callback[2]}`;
          pushfalg = false;
        }
      });
      if (pushfalg) {
        this.TabPanes.push({
          title: `${callback[0].deptName}-${callback[1]}`,
          name: `${callback[0].id}${callback[2]}`,
          tabpaneType: "Group",
          groupType: callback[1],
          collageID: callback[0].id,
        });
        this.currentTabpane = `${callback[0].id}${callback[2]}`;
      }
    },
    createUserPane(callback) {
      var tabs = this.TabPanes;
      var pushfalg = true;
      tabs.forEach((tab) => {
        if (tab.name == callback.id) {
          this.currentTabpane = callback.id;
          pushfalg = false;
        }
      });
      if (pushfalg) {
        this.TabPanes.push({
          title: `${callback.deptName}-${callback.groupType}-User`,
          name: `${callback.id}`,
          tabpaneType: "User",
          collageID: callback.id,
          dept_Group : callback,
        });
        this.currentTabpane = `${callback.id}`;
      }
    },
    closetabpane(callback) {
      var tabs = this.TabPanes;
      tabs.forEach((tab) => {
        if (tab.name == callback) {
          this.TabPanes.pop(tab);
          this.currentTabpane = "collage";
        }
      });
    },
    clicktabpane(callback) {
      console.log(callback);
      console.log("点击了");
    },
  },
};
</script>

<style src="@/style/deptManage.css" scoped></style>
