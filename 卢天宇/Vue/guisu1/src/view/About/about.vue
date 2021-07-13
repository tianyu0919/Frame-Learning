<template>
  <div>我是About {{ this.$store.state.count }}</div>
</template>

<script>
export default {
  data() {
    return {
      count: this.$store.state.count,
    };
  },
};
</script>

<style lang="scss" scoped></style>
