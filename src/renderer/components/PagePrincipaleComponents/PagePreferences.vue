<template>
  <el-container>
    <el-header>
      <h1>Préférences</h1>
    </el-header>
    <el-main>
      <el-form ref="form" :model="formSettings" label-width="120px">
        <el-form-item  label="Prénom">
          <el-input v-model="formSettings.utilisateur.prenom"></el-input>
        </el-form-item>
        <el-form-item  label="Nom">
          <el-input v-model="formSettings.utilisateur.nom"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Sauvergarder</el-button>
          <el-button>Annuler</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>

</template>

<script>
  export default {
    name: 'page-preferences',
    data () {
      return {
        formSettings: {
          utilisateur: {
            prenom: '',
            nom: ''
          },
          pointage: {
            maxMatin: 0,
            minApresMidi: 0,
            bonusDebut: 0,
            bonusFin: 0,
            minPauseMediane: 0
          }
        }
      }
    },
    computed: {
      settings () {
        return this.$store.state.Settings.settings
      }
    },
    watch: {
      settings: function (newSetting) {
        console.log('newSetting', newSetting)
        this.formSettings = {
          utilisateur: {
            prenom: newSetting.utilisateur.prenom,
            nom: newSetting.utilisateur.nom
          },
          pointage: {
            maxMatin: newSetting.pointage.maxMatin,
            minApresMidi: newSetting.pointage.minApresMidi,
            bonusDebut: newSetting.pointage.bonusDebut,
            bonusFin: newSetting.pointage.bonusFin,
            minPauseMediane: newSetting.pointage.minPauseMediane
          }
        }
        console.log('formSettings', this.formSettings)
      }
    },
    methods: {
      onSubmit () {
        this.$store.dispatch('setSetting', this.formSettings)
      }
    },
    mounted () {
      this.$store.dispatch('getSetting')
    }
  }
</script>

<style scoped>

</style>