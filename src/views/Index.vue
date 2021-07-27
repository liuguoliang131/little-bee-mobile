<template>
  <div class="box">indexaaaa</div>
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
.box {
  width: 100px;
  height:100px;
  font-size: 20px;
  background-color: yellow;
}
</style>