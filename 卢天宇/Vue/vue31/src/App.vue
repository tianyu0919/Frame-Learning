<template>
  <div>
    <nav>
      <div class="logo">Vue3的例子</div>
      <a-menu class="nav-item" mode="horizontal" v-model="current">
        <a-menu-item key="home" @click="toHome"><HomeOutlined /> 主页 </a-menu-item>
        <a-menu-item key="about" @click="toAbout"> 关于</a-menu-item>
      </a-menu>
    </nav>
    <div class="container">
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
import { HomeOutlined } from "@ant-design/icons-vue";

export default {
  name: "app",
  data() {
    return {
      current: ["home"],
    };
  },
  components: {
    HomeOutlined,
  },
  watch: {
    current(value, oldValue) {
      console.log(value, oldValue);
    },
  },
  methods: {
    toHome() {
      this.$router.push({ name: "home" });
    },
    toAbout() {
      this.$router.push({ name: "about" });
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  --width: 100px;
  margin-bottom: 10px;

  .logo {
    width: var(--width);
    text-align: center;
    height: 46px;
    line-height: 46px;
    border-bottom: 1px solid #f0f0f0;
  }

  .nav-item {
    width: calc(100% - var(--width));
    justify-content: flex-end;
  }
}

.container {
  height: calc(100vh - 10px - 46px);
  /deep/ div.box {
    text-align: center;
  }
}
</style>
