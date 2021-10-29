<template>
  <div class="oxd-table-cell-actions" v-if="header && header.defaultCellRenderers">
    <component
      v-for="(action, propName, index) in defaultCellActions"
      :key="index"
      :is="action"
      :header="header"
      :item="item"
      :disabled="isDisabled"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DeleteAction from "./DeleteAction.vue";
import EditAction from "./EditAction.vue";
import DownlaodAction from "./DownlaodAction.vue";

export default defineComponent({
  name: "oxd-table-cell-actions",
  props: {
    header: Object,
    item: {
      type: Object,
      required: false,
    },
  },
  components: {
    delete: DeleteAction,
    edit: EditAction,
    download: DownlaodAction,
  },
  computed: {
    defaultCellActions() {
      return this.header.defaultCellRenderers.actions;
    },
    isDisabled() {
      return this.item?.disabled === undefined || this.item?.disabled === null
        ? false
        : this.item?.disabled;
    },
  },
});
</script>

<style src="../default-action.scss" lang="scss" scoped></style>
