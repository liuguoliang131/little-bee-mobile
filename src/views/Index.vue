<template>
  <div class="index">
    <container></container>
  </div>
</template>

<script>
import Container from '@/components/Container'
export default {
  components:{
    Container
  },
  name:'Index',
  methods:{
    async testAxios() {
      try {
        const res = await this.$http.post(this.$getApi('test_api'),{})
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

<style scoped lang="less">
.index {
  width: 100%;
  height: 100%;
  background-color: skyblue;
}
</style>