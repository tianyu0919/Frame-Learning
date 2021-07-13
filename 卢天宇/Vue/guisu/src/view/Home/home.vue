<template>
  <div>
    <p>我是home</p>
    <div>
      <a-button @click="add">+</a-button>
      {{ count }}
      <a-button @click="jian">-</a-button>
      <a-button @click="request">请求</a-button>
    </div>
    <h2>{{ hitokoto }}</h2>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      hitokoto: "",
    };
  },
  methods: {
    ...mapMutations(["add", "jian"]),
    request() {
      this.$axios("http://v1.hitokoto.cn").then(({ data }) => {
        console.log(data);
        this.hitokoto = data.hitokoto;
      });
    },
  },
  activated() {
    console.log("xx");
    if (!this.hitokoto) {
      this.request();
    }
  },
  deactivated() {
    console.log('我是首页的，被停用了');
  },
  computed: {
    // ...mapGetters(['count']),
    ...mapState(["count"]),
    // count() {
    //   return this.$store.state.count;
    // },
  },
};
</script>

<style lang="scss" scoped></style>
