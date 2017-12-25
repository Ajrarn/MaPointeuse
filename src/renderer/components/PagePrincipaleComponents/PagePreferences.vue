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
            <el-form-item  label="Bonus Premier pointage">
              <el-time-picker
                      v-model="formSettings.pointage.bonusDebut"
                      :format="'mm:ss'"
                      :valueFormat="'mm:ss'"
                      placeholder="Choisissez une durée">
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item  label="Bonus Dernier pointage">
              <el-time-picker
                      v-model="formSettings.pointage.bonusFin"
                      :format="'mm:ss'"
                      :valueFormat="'mm:ss'"
                      placeholder="Choisissez une durée">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item  label="Pointage Maximum du matin">
              <el-time-picker
                      v-model="formSettings.pointage.maxMatin"
                      :picker-options="{selectableRange: '06:30:00 - 20:00:00'}"
                      :format="'HH:mm'"
                      :valueFormat="'HH:mm'"
                      placeholder="Choisissez un horaire">
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item  label="Pointage minimum de l'après-midi">
              <el-time-picker
                v-model="formSettings.pointage.minApresMidi"
                :picker-options="{selectableRange: '06:30:00 - 20:00:00'}"
                :format="'HH:mm'"
                :valueFormat="'HH:mm'"
                placeholder="Choisissez un horaire">
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
            maxMatin: this.convertSecondesEnHHmm(newSetting.pointage.maxMatin),
            minApresMidi: this.convertSecondesEnHHmm(newSetting.pointage.minApresMidi),
            bonusDebut: this.convertSecondesEnMMss(newSetting.pointage.bonusDebut),
            bonusFin: this.convertSecondesEnMMss(newSetting.pointage.bonusFin),
            minPauseMediane: this.convertSecondesEnHHmm(newSetting.pointage.minPauseMediane)
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
            maxMatin: this.convertHHmmEnsecondes(this.formSettings.pointage.maxMatin),
            minApresMidi: this.convertHHmmEnsecondes(this.formSettings.pointage.minApresMidi),
            bonusDebut: this.convertMMssEnsecondes(this.formSettings.pointage.bonusDebut),
            bonusFin: this.convertMMssEnsecondes(this.formSettings.pointage.bonusFin),
            minPauseMediane: this.convertHHmmEnsecondes(this.formSettings.pointage.minPauseMediane)
          },
          dbFile: this.formSettings.dbFile
        }
        this.$store.dispatch('setSetting', formToDispatch)
      },
      padTime (nombre) {
        if (nombre < 10) {
          return `0${nombre}`
        } else {
          return nombre
        }
      },
      convertSecondesEnMMss (secondesIn) {
        if (secondesIn) {
          let minutes = Math.floor(secondesIn / 60)
          let secondes = secondesIn % 60
          return `${this.padTime(minutes)}:${this.padTime(secondes)}`
        } else {
          return '00:00'
        }
      },
      convertMMssEnsecondes (mmss) {
        if (mmss) {
          let mmssArray = mmss.split(':')
          let minutes = Number.parseInt(mmssArray[0])
          let secondes = Number.parseInt(mmssArray[1])
          return minutes * 60 + secondes
        } else {
          return 0
        }
      },
      convertSecondesEnHHmm (secondesIn) {
        if (secondesIn) {
          let heures = Math.floor(secondesIn / 3600)
          let minutes = Math.floor((secondesIn % 3600) / 60)
          return `${this.padTime(heures)}:${this.padTime(minutes)}`
        } else {
          return '00:00'
        }
      },
      convertHHmmEnsecondes (hhmm) {
        if (hhmm) {
          let hhmmArray = hhmm.split(':')
          let heures = Number.parseInt(hhmmArray[0])
          let minutes = Number.parseInt(hhmmArray[1])
          return heures * 3600 + minutes * 60
        } else {
          return 0
        }
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