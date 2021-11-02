<template>
  <div class="side-panel">
    <div class="side-panel__header">
      <oxd-button :displayType="'secondary'" :label="'Top Main Button'"></oxd-button>
    </div>
    <div class="side-panel__body"></div>
    <div class="side-panel__footer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@orangehrm/oxd/core/components/Button/Button.vue";

export default defineComponent({
  name: "oxd-side-panel",

  components: {
    "oxd-button": Button,
  },
});
</script>

<style src="./table-side-panel.scss" lang="scss" scoped></style>
<style lang="scss">
// .oxd-table-filter-header-options {
//   & .oxd-icon-button {
//     font-size: 12px;
//     width: 24px !important;
//     height: 24px !important;
//     min-width: unset;
//     min-height: unset;
//     margin-right: 5px;
//   }
//   & .oxd-button {
//     padding-right: 5px;
//     padding-left: 5px;
//     min-width: unset;
//     margin-right: 5px;
//   }
// }
//
</style>
