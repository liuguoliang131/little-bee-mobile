<template>
  <div>indexaaaa</div>
</template>

<script>
export default {
  name:'Index',
  methods:{
    async testAxios() {
      try {
        const res = await this.$http.post(this.$apis.test_api,{})
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.testAxios()
  }
}
</script>

<style>

</style>