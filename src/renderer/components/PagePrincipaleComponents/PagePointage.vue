<template>
  <div>
    <h1>Pointage</h1>
    <h5>{{formFeuillePointage.jour}}</h5>
    <el-button @click="addPointageEntrant()">Pointage entrant</el-button>
    <el-button @click="addPointageSortant()">Pointage sortant</el-button>
    <div v-for="pointage in formFeuillePointage.pointages">{{pointage.horodatage}} -- {{pointage.type}}</div>
  </div>
</template>

<script>
  import moment from 'moment'
  import { convertHHMMssEnsecondes, convertSecondesEnHHMMss } from '../../util/convert-time'

  export default {
    name: 'page-pointage',
    data () {
      return {
        formFeuillePointage: {
          jour: '',
          mois: '',
          pointages: [],
          journeePleine: true
        }
      }
    },
    computed: {
      feuillePointage () {
        return this.$store.state.FeuillePointage.courant
      },
      settings () {
        return this.$store.state.Settings.settings
      }
    },
    watch: {
      feuillePointage: function (newFeuillePointage) {
        this.formFeuillePointage = {
          jour: newFeuillePointage.jour,
          mois: newFeuillePointage.mois,
          pointages: newFeuillePointage.pointages.map((pointage) => {
            return {horodatage: convertSecondesEnHHMMss(pointage.horodatage), type: pointage.type}
          }),
          journeePleine: newFeuillePointage.journeePleine
        }
      }
    },
    mounted () {
      this.$store.dispatch('getFeuillePointage', {jour: moment().format('YYYYMMDD'), mois: moment().format('YYYYMM')})
    },
    methods: {
      addPointageEntrant () {
        let pointage = moment().format('HH:mm:ss')
        this.formFeuillePointage.pointages.push({horodatage: pointage, type: 'entrant'})
        this.saveFeuillePointage()
      },
      addPointageSortant () {
        let pointage = moment().format('HH:mm:ss')
        this.formFeuillePointage.pointages.push({horodatage: pointage, type: 'sortant'})
        this.saveFeuillePointage()
      },
      saveFeuillePointage () {
        let feuillePointage = {
          jour: this.formFeuillePointage.jour,
          mois: this.formFeuillePointage.mois,
          pointages: this.formFeuillePointage.pointages.map((pointage) => {
            return {horodatage: convertHHMMssEnsecondes(pointage.horodatage), type: pointage.type}
          }),
          journeePleine: this.formFeuillePointage.journeePleine
        }

        this.$store.dispatch('saveFeuillePointage', feuillePointage)
      }
    }
  }
</script>

<style scoped>

</style>