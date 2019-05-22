<template>
  <header class="app-header navbar">
    <slot></slot>
  </header>
</template>
<script>
export default {
  name: "dpnavbar",
  created() {
    this._navbar = true;
  }
};
</script>
<style>
.header-fixed .app-body {
  margin: 0px;
  height: 100%;
}
</style>

