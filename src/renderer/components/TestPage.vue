<template>
    <div>
        <h1>Yes it's me</h1>
        <el-rate v-model="value1"></el-rate>
        <el-button v-on:click="increnentCounter">Compteur</el-button>
        <h3> {{ count }}</h3>
        <router-link to="/">Retour accueil</router-link>
    </div>

</template>

<script>
    import ElButton from 'element-ui/packages/button/src/button'

    export default {
      components: {ElButton},
      name: 'test-page',
      data () {
        return {
          value1: null
        }
      },
      computed: {
        count () {
          return this.$store.state.Counter.main
        }
      },
      methods: {
        increnentCounter () {
          this.$store.commit('INCREMENT_MAIN_COUNTER')
        }
      },
      mounted () {
        setInterval(() => {
          this.$electron.ipcRenderer.send('ping')
        }, 1000)

         this.$electron.ipcRenderer.on('pong', (event, data) => {
            this.myDataVar = data
             console.log(data)
          })
        }
    }
</script>

<style scoped>

</style>