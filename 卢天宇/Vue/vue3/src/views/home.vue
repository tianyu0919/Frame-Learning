<template>
  <div class="box">
    我是home页面
    <a-button @click="showAlert">xxx</a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    showAlert(){
      this.$message.info('ohoho')
    }
  },
  mounted() {
    console.log(this.$store.state.count);
  },
  activated() {
  },
};
</script>

<style lang="scss" scoped></style>
