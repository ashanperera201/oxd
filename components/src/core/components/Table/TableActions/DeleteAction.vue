<template>
  <oxd-icon-button :name="'trash'" @click="onClickAction($event)"></oxd-icon-button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import IconButton from "@orangehrm/oxd/core/components/Button/Icon.vue";
import { ActionCellEvent, DefaultActions } from "../TableTypes/table-cell-type";

export default defineComponent({
  name: "delete-action",
  props: {
    header: Object,
    item: {
      type: Object,
      required: false,
    },
  },
  components: {
    "oxd-icon-button": IconButton,
  },
  methods: {
    onClickAction(e: ActionCellEvent) {
      const action: any = this.header?.defaultCellRenderers;
      action?.actionClickHandler(DefaultActions.delete, this.item, e);
    },
  },
});
</script>
