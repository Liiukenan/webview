<template>
  <div id="app">
      <v-header>
      </v-header>
      <v-aside>
      </v-aside>
      <router-view/>
  </div>
</template>

<script>
import header from '@components/header.vue';
import aside from '@components/aside.vue';
import 'bootstrap/dist/css/bootstrap.css';
export default{
  name:'app',
  components:{
    'v-header':header,
    'v-aside':aside
  }
}
</script>

<style lang="scss" rel="stylesheet">
@import "./css/basic.css";
.section{
      padding:20px;
      margin-left: 200px;
      margin-top: 50px;
      legend{
          height: 48px;
          line-height: 48px;
          padding:0 15px;
          font-size: 14px;
          background: #1BB7A0;
          border:1px solid #1BB7A0;
          color: #fff;
        }
}
</style>
