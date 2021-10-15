<template>
  <div class="home"><CitySelector /> <WeatherInfo /></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CitySelector from "@/components/CitySelector.vue";
import WeatherInfo from "@/components/WeatherInfo.vue";

@Component({
  components: {
    CitySelector,
    WeatherInfo,
  },
})
export default class Home extends Vue {}
</script>
