<template>
  <el-container id="wrapper">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-menu-item index="1"
                    v-on:click="changeCollapse()">
        <i v-show="isCollapse" class="el-icon-arrow-right"></i>
        <i v-show="!isCollapse" class="el-icon-arrow-left"></i>
        <!--span slot="title">Réduire</span-->
      </el-menu-item>
      <el-menu-item index="2"
      v-on:click="goTo('/principale')">
        <i class="el-icon-date"></i>
        <span slot="title">Pointage</span>
      </el-menu-item>
      <el-menu-item index="3"
                    v-on:click="goTo('/preferences')">
        <i class="el-icon-setting"></i>
        <span slot="title">Préférences</span>
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </el-container>
</template>

<script>
  import ElContainer from 'element-ui/packages/container/src/main'

  export default {
    components: {ElContainer},
    name: 'page-principale',
    data () {
      return {
        isCollapse: true
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      changeCollapse () {
        this.isCollapse = !this.isCollapse
      },
      goTo (route) {
        this.$router.push(route)
      }
    }
  }
</script>

<style>
  #wrapper {
    background:
            radial-gradient(
                    ellipse at top left,
                    rgba(255, 255, 255, 1) 40%,
                    rgba(229, 229, 229, .9) 100%
            );
    height: 100vh;
    padding: 0;
    width: 100vw;
  }
  .el-menu-vertical-demo {
    min-height: 100vh;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }

</style>