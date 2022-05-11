<!--
 * @Date: 2022-05-11 19:27:09
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-11 20:02:00
 * @FilePath: \little-bee-mobile\src\views\empty\empty.vue
 * @Description: 
-->
<script>
export default {
  name:'Empty',
  created() {
    this.$store.commit('user/set_code',window.location.href)
    this.$router.back()
  }
}
</script>

<style>

</style>