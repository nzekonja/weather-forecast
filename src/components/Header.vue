<template>
  <div class="header">
    {{ headline }}
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { headline } from "@/utils/constants";

@Component
export default class Header extends Vue {
  data() {
    return { headline };
  }
}
</script>
