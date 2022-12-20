<template>
  <div class="app">
    <el-container class="HeaderBox">
      <el-header>
        <div class="sysName">温理练习系统</div>
        <div class="headerimg">
          {{ uernameimg }}
        </div>
        <div class="userNameBox"></div>
        <el-dropdown class="userNameBox">
          <span> {{ uername }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container class="midBox">
        <div class="asideBox">
          <el-aside width="200px" class="myaside">
            <el-menu
              background-color="#263238"
              text-color="#fff"
              active-text-color="#1684FC"
              active-background-color="#E6F7FF"
              ref="menu"
              router
              :default-active="$route.path"
            >
              <template v-for="(item, i) in Menus">
                <!-- 菜单不隐藏,hidden=false。 -->

                <!-- 判断是否只有一个节点 -->
                <el-menu-item
                  v-if="item.children.length == 0"
                  :index="item.linkUrl"
                  :key="i"
                  style="margin-left: 0px"
                >
                  <i class="el-icon-setting"></i>
                  <span slot="title">{{ item.menuName }}</span>
                </el-menu-item>

                <!-- 多个节点 -->
                <el-submenu v-else :index="item.linkUrl" :key="i">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.menuName }}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      v-for="(child, childId) in item.children"
                      :key="childId"
                      :index="child.linkUrl"
                    >
                      {{ child.menuName }}
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </template>
            </el-menu>
          </el-aside>
        </div>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import * as homeapi from "@/utils/home";
export default {
  created() {
    this.Menus = this.$store.state.sideRoute;
  },
  mounted() {},
  data() {
    return {
      Menus: {},
      uernameimg: "张",
      uername: "张水淼",
    };
  },
  methods: {
    logOut() {
      console.log(12);
      window.sessionStorage.clear();
      this.$router.replace("/login");
      console.log(1);
    },
  },
};
</script>
<style src="@/style/home.css" scoped></style>
