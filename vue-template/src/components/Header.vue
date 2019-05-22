<template>
  <navbar>
    <button
      class="navbar-toggler mobile-sidebar-toggler d-lg-none"
      type="button"
      @click="mobileSidebarToggle"
    >&#9776;</button>
    <a class="navbar-brand"></a>
    <ul class="nav navbar-nav ml-auto">
      <!--<li class="nav-item d-md-down-none">
        <a class="nav-link" ><Icon type="android-notifications" size="20"></Icon><span class="badge badge-pill badge-danger">5</span></a>
      </li>-->
      <li class="dept">
        <span id="deptName">上海嘉定区江桥营业部</span>
      </li>
      <Dropdown class="nav-item">
        <a href="javascript:void(0)">
          <span slot="button">
            <img src="static/img/avatars/6.jpg" class="img-avatar" alt="o">
            <span class="d-md-down-none">admin</span>
          </span>
        </a>
        <Dropdown-menu class="list">
          <Dropdown-item>
            <a href @click="Logout">
              <p style="font-color:#00368f">
                <Icon type="md-power" color="#00368f"/>退出登录
              </p>
            </a>
          </Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
    </ul>
  </navbar>
</template>
<script>
import navbar from "./Navbar";

export default {
  name: "dpheader",
  components: {
    navbar
  },
  methods: {
    Logout(e) {
      e.preventDefault();
      this.$store
        .dispatch("LogOut")
        .then(() => {
          localStorage.removeItem("TOKEN");
          this.delCookie("TGC");
          this.delCookie("U");
          this.delCookie("_TOKENUUMS");
          this.$store.dispatch("loginToServer");
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    sidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-hidden");
    },
    sidebarMinimize(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-minimized");
    },
    mobileSidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-mobile-show");
    },
    asideToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("aside-menu-hidden");
    }
  }
};
</script>

<style type="text/css" scoped>
.list {
  height: 42.5px;
  color: #000;
  padding-top: 5px;
  display: none;
  position: absolute;
  left: 0px;
  bottom: -46px;
  background-color: #eff0f4;
  border-radius: 3px;
}
.list a p {
  color: #333;
}
.nav-item {
  height: 36px;
  position: relative;
}
.nav-item:hover .list {
  display: inline-block;
}

.navbar-brand {
  background-position: 20px center !important;
  background-size: 130px 40px !important;
}
.navbar-nav {
  display: inline-block;
  float: right;
  color: #ffffff;
  font-size: 12px;
  padding-right: 20px;
  margin-top: 10px;
}
.dept {
  display: inline-block;
  margin-right: 15px;
}
.img-avatar {
  width: 29px;
  height: 29px;
  margin-right: 5px;
}
.dropdown-itemp {
  text-align: left;
  font-size: 15px;
  padding: 10px;
}
.header-item .ivu-dropdown-item {
  padding: 15px;
}
.header-item {
  width: 130px;
  height: 55px;
}
.nav-item a {
  display: inline-block;
  color: white !important;
}
.d-md-down-none {
  position: relative;
  padding-right: 12px;
}
.d-md-down-none::after {
  position: absolute;
  content: "";
  width: 0.5em;
  height: 0.5em;
  border-width: 2px 0 0 2px;
  border-style: solid;
  border-color: #fff;
  right: 0;
  -webkit-transform-origin: top;
  -ms-transform-origin: top;
  -o-transform-origin: top;
  transform-origin: top;
  top: 9px;
  -webkit-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  transform: rotate(45deg) translate(0, -50%);
  -webkit-transform: rotate(45deg) translate(0, -50%);
}
</style>
