<template>
  <div class="aside">
    <ul class="col-input lis">
      <li>
        <!-- 点击刷新页面 -->
        <Icon type="ios-refresh" class="refresh" @click="onLoad"></Icon>
        <Input class="col-input" search placeholder="请输入筛选字段" v-model="keySelect" size="small"/>
      </li>
    </ul>
    <Menu accordion>
      <Menutree :routes="menuRouter"></Menutree>
    </Menu>
  </div>
</template>
<script>
import Menutree from "./Menutree";
import { mapGetters } from "vuex";
export default {
  name: "dpsidebar",
  components: { Menutree },
  data() {
    return {
      keySelect: ""
    };
  },
  computed: {
    menuRouter() {
      let menus = [];
      if (this.keySelect) {
        let datatemp = this.$store.getters.siderbar_routers;
        for (let n = 0; n < datatemp.length; n++) {
          if (datatemp[n].name.indexOf(this.keySelect) != -1) {
            menus.push(datatemp[n]);
          }
          if (datatemp[n].children) {
            for (let m = 0; m < datatemp[n].children.length; m++) {
              if (datatemp[n].children[m].name.indexOf(this.keySelect) != -1) {
                menus.push(datatemp[n].children[m]);
              }
            }
          }
        }
      } else {
        menus = this.$store.getters.siderbar_routers;
      }
      // console.log(menus);

      return menus;
    }
  },
  methods: {
    // 点击刷新
    onLoad(e) {
      e.target.classList.add("router");
      window.location.reload([true]);
    }
  }
};
</script>

<style lang="css">
.nav-link {
  cursor: pointer;
}
/*搜索样式*/
.col-input {
  width: 180px;
  border-radius: 20px;
  margin: 3px;
  margin-left: 20px;
  position: relative;
}
.lis {
  list-style: none;
}
.refresh {
  position: absolute;
  top: 5px;
  left: -13px;
  font-size: 26px;
}
.ivu-input-wrapper-small .ivu-input-icon {
  width: 24px;
  font-size: 18px;
  height: 24px;
  line-height: 24px;
  transform: translateY(2.5px);
}
/*菜单背景色*/
.ivu-menu-light {
  background: #eff0f4;
}
/*子菜单字体大小*/
.ivu-menu-submenu-title {
  font-size: 14px;
}
/*菜单悬浮*/
.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #ffe100;
  background: #00368f;
}
/*菜单选中*/
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #ffe100;
  background: #00368f;
  z-index: 2;
}
.aside {
  margin-top: 50px;
  background-color: #eff0f4;
}
</style>
