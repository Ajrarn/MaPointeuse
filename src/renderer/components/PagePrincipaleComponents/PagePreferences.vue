<template>
  <el-container>
    <el-header>
      <h1>Préférences</h1>
    </el-header>
    <el-main>
      <el-form ref="form" :model="formSettings" label-width="300px">
        <el-form-item  label="Utilisateur">
          <el-col :span="11">
            <el-input v-model="formSettings.utilisateur.prenom" placeholder="Prénom"></el-input>
          </el-col>
          <el-col :span="2" style="text-align: center;"> - </el-col>
          <el-col :span="11">
            <el-input v-model="formSettings.utilisateur.nom" placeholder="Nom"></el-input>
          </el-col>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item  label="Bonus pointage entrant">
              <el-time-picker
                      v-model="formSettings.pointage.bonusEntrant"
                      :format="'mm:ss'"
                      :valueFormat="'mm:ss'"
                      placeholder="Choisissez une durée">
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item  label="Bonus pointage sortant">
              <el-time-picker
                      v-model="formSettings.pointage.bonusSortant"
                      :format="'mm:ss'"
                      :valueFormat="'mm:ss'"
                      placeholder="Choisissez une durée">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Durée minimum pause médiane">
          <el-time-picker
                  v-model="formSettings.pointage.minPauseMediane"
                  :picker-options="{selectableRange: '00:00:00 - 04:00:00'}"
                  :format="'HH:mm'"
                  :valueFormat="'HH:mm'"
                  placeholder="Choisissez une durée">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="Fichier contenant les données de pointage">
            <el-input v-model="formSettings.dbFile" placeholder="Cliquez à droite pour choisir">
              <el-button slot="append" icon="el-icon-search" @click="selectFile"></el-button>
            </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Sauvegarder</el-button>
          <el-button>Annuler</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  import { remote } from 'electron'
  import { convertSecondesEnMMss, convertSecondesEnHHmm, convertHHmmEnsecondes, convertMMssEnsecondes } from '../../util/convert-time'

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
            bonusEntrant: 0,
            bonusSortant: 0
          },
          dbFile: ''
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
        this.formSettings = {
          utilisateur: {
            prenom: newSetting.utilisateur.prenom,
            nom: newSetting.utilisateur.nom
          },
          pointage: {
            bonusEntrant: convertSecondesEnMMss(newSetting.pointage.bonusEntrant),
            bonusSortant: convertSecondesEnMMss(newSetting.pointage.bonusSortant),
            minPauseMediane: convertSecondesEnHHmm(newSetting.pointage.minPauseMediane)
          },
          dbFile: newSetting.dbFile
        }
      }
    },
    methods: {
      onSubmit () {
        let formToDispatch = {
          utilisateur: {
            prenom: this.formSettings.utilisateur.prenom,
            nom: this.formSettings.utilisateur.nom
          },
          pointage: {
            bonusEntrant: convertMMssEnsecondes(this.formSettings.pointage.bonusEntrant),
            bonusSortant: convertMMssEnsecondes(this.formSettings.pointage.bonusSortant),
            minPauseMediane: convertHHmmEnsecondes(this.formSettings.pointage.minPauseMediane)
          },
          dbFile: this.formSettings.dbFile
        }
        this.$store.dispatch('setSetting', formToDispatch)
      },
      selectFile () {
        let that = this
        remote.dialog.showSaveDialog((fileName) => {
          that.formSettings.dbFile = fileName
        })
      }
    },
    mounted () {
      this.$store.dispatch('getSetting')
    }
  }
</script>

<style scoped>

</style>