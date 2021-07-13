<template>
  <div>
    <div class="nav">
      <div class="title" @click="c">归宿网</div>
      <a-menu mode="horizontal" v-model="current">
        <a-menu-item key="home" @click="toHome">
          <a-icon type="home" />
          首页
        </a-menu-item>
        <a-menu-item key="about" @click="toAbout">
          <a-icon type="contacts" />
          关于
        </a-menu-item>
      </a-menu>
    </div>
    <transition name="tranFade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: ["home"],
    };
  },
  methods: {
    toHome() {
      this.$router.push("/index/home");
    },
    toAbout() {
      this.$router.push("/index/about");
    },
    c() {
      window.location.href = "http://" + window.location.host;
    },
  },
};
</script>

<style></style>

<style lang="scss" scoped>
.tranFade-enter-active,
.tranFade-leave-active {
  transition: all 0.3s;
}

.tranFade-enter,
.tranFade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 10px;

  .title {
    margin-left: 10px;
    font-size: 26px;
    cursor: pointer;
  }
}
</style>
