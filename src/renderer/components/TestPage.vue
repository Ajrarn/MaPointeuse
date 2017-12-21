<template>
  <div>
    <h1>Yes it's me</h1>
    <el-rate v-model="value1"></el-rate>
    <el-button v-on:click="increnentCounter">Compteur</el-button>
    <h3> {{ count }}</h3>
    <router-link to="/">Retour accueil</router-link>
    <el-input placeholder="Please input" v-model="nameForm.first"></el-input>
    <el-button v-on:click="saveSetting">Save</el-button>
  </div>

</template>

<script>
  import ElButton from 'element-ui/packages/button/src/button'

  export default {
    components: {ElButton},
    name: 'test-page',
    data () {
      return {
        value1: null,
        nameForm: {
          first: '',
          last: ''
        }
      }
    },
    computed: {
      count () {
        return this.$store.state.Counter.main
      },
      name () {
        return this.$store.state.Settings.name
      }
    },
    methods: {
      increnentCounter () {
        this.$store.commit('INCREMENT_MAIN_COUNTER')
      },
      saveSetting () {
        this.$store.dispatch('setSetting', this.nameForm)
      }
    },
    watch: {
      name: function (newName) {
        Object.assign(this.nameForm, newName)
      }
    },
    mounted () {
      this.$store.dispatch('getSetting')
    }
  }
</script>

<style scoped>

</style>