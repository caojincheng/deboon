<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar/>
      <main class="main" >
        <!-- <Tabpanel/> -->
        <breadcrumb :list="list" />
        <div class="container-fluid">
          <keep-alive><!--页面缓存-->
            <router-view></router-view>
          </keep-alive><!--页面缓存-->
        </div>
      </main>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '../components/Header'
import Sidebar from '../components/Sidebar'
import AppFooter from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppFooter,
    Breadcrumb
  },
  computed: {
    name () {
      return this.$route.name
    },
    path (){
        return this.$route.path
    },
    list () {
      return this.$route.matched
    }
  }
}
</script>
