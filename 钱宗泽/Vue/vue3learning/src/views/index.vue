<template>
  <div>
    <div class="content">
      <search></search>
      <div v-for="(item, index) in list" :key="index">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>

import search from "../components/search.vue";

export default {
  components: {
    search,
  },
  data() {
    return {
      list: ["首页", ""],
    };
  },
  mounted() {
   
  },
  watch: {
    
  },
  computed: {
    
  },
  methods: {},
};
</script>
<style scoped lang="less"></style>
