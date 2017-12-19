<template>
    <div>
        <h1>Yes it's me</h1>
        <el-rate v-model="value1"></el-rate>
    </div>

</template>

<script>
    export default {
      name: 'test-page',
      data () {
        return {
          value1: null
        }
      }
    }
</script>

<style scoped>

</style>