<template>
  <div class="footer">
    <div class="title">{{ footerTitle }}</div>
    <div class="author">by {{ footerAuthor }}</div>
  </div>
</template>

<script>
import { footerTitle, footerAuthor } from "@/utils/constants";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {
  data() {
    return { footerTitle, footerAuthor };
  }
}
</script>
