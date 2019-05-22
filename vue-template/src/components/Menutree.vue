<template>
  <div>
     <div v-for="item in routes">
      <div v-if="notshowRoutName.indexOf(item.name)==-1">
        <Submenu :name="item.name" v-if="item.children&&item.children.length>0">
          <template slot="title">{{item.name}}</template>
          <menuTree :routes="item.children"></menuTree>
        </Submenu>
        <MenuItem
          :name="item.name"
          v-else="!item.hidden&&!item.children"
          @click.native="addActive(item)"
        >{{item.name}}</MenuItem>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "menuTree",
  props: {
    routes: {
      type: Array
    }
  },
  computed: {
    notshowRoutName() {
      return this.$store.getters.notshowRoutName;
    }
  },
  methods: {
    addActive(item) {
      this.$router.push({
        name: item.name
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-icon {
  margin-right: 10px;
}
.hideSidebar .menu-indent {
  display: block;
  text-indent: 10px;
}
.col-input {
  width: 150px;
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
.router {
  transform: rotate(720deg);
  transition-duration: 3s;
}
.color {
  font-weight: 400;
  background-color: #3b5991 !important;
  color: #f8b500 !important;
}
/deep/ .ivu-input-wrapper-small .ivu-input-icon {
  width: 24px;
  font-size: 18px;
  height: 24px;
  line-height: 24px;
  transform: translateY(2.5px);
}
</style>
