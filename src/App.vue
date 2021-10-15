<template>
  <div id="app">
    <div id="nav">
      <Header />
    </div>
    <router-view />
    <div id="divider" />
    <Footer />
  </div>
</template>

<style lang="scss">
@import "@/scss/app.scss";
</style>

<script lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { Header, Footer },
})
export default class App extends Vue {}
</script>
