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
                      placeholder="Choisissez une durée">
              </el-time-picker>
              {{formSettings.pointage.bonusDebut}}
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item  label="Bonus Dernier pointage">
              <el-time-picker
                      v-model="formSettings.pointage.bonusFin"
                      :format="'mm:ss'"
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
                      placeholder="Choisissez un horaire">
              </el-time-picker>
              {{formSettings.pointage.maxMatin}}
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item  label="Pointage minimum de l'après-midi">
              <el-time-picker
                v-model="formSettings.pointage.minApresMidi"
                :picker-options="{selectableRange: '06:30:00 - 20:00:00'}"
                :format="'HH:mm'"
                placeholder="Choisissez un horaire">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Durée minimum pause médiane">
          <el-time-picker
                  v-model="formSettings.pointage.minPauseMediane"
                  :picker-options="{selectableRange: '00:00:00 - 04:00:00'}"
                  placeholder="Choisissez une durée">
          </el-time-picker>
          {{formSettings.pointage.minPauseMediane}}
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