<!--
/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */
-->

<template>
  <div v-if="header.defaultCellConfig" class="oxd-table-cell-actions">
    <component
      class="oxd-table-cell-action-space"
      v-for="(cell, propName, index) in header.defaultCellConfig"
      :key="index"
      v-bind="getProps(cell, propName)"
      :is="cell.componentName"
      :disabled="isDisabled"
      @click="onClickAction(cell, propName, $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, mergeProps } from "vue";
import IconButton from "@orangehrm/oxd/core/components/Button/Icon.vue";
import Button from "@orangehrm/oxd/core/components/Button/Button.vue";
import Dropdown from "@orangehrm/oxd/core/components/CardTable/Cell/Dropdown.vue";
import { Action, RowItem, ActionCellEvent } from "./TableTypes/table-cell-type";

export default defineComponent({
  name: "oxd-table-cell-actions",

  props: {
    header: Object,
    item: {
      type: Object,
      // not required, since actions evaluate from `this.header.cellConfig`
      required: false,
    },
  },
  components: {
    "oxd-icon-button": IconButton,
    "oxd-button": Button,
    "oxd-table-dropdown": Dropdown,
  },
  computed: {
    showDeleteButton(): boolean {
      return this.header.defaultCellConfig.delete.visibility;
    },
    showEditButton(): boolean {
      return this.header.defaultCellConfig.edit.visibility;
    },
    showDownloadButton() {
      return this.header.defaultCellConfig.download.visibility;
    },
    isDisabled(): boolean {
      const disabledPropertyKey: string = this.header.defaultCellConfig.cellDisabledPropertyKey
        ? this.header.defaultCellConfig.cellDisabledPropertyKey
        : "disabled";
      const receivedValue = typeof this.item[disabledPropertyKey] === 'boolean';
      return receivedValue ? this.item[disabledPropertyKey] : false;
    },
  },
  methods: {
    onClickAction(action: Action<RowItem>, key: string, e: ActionCellEvent) {
      const cellConfig = this.header?.defaultCellConfig;
      if (typeof action.onClick === "function") {
        action.onClick(this.item, e);
      } else if (cellConfig && typeof cellConfig[key]?.onClick === "function") {
        this.header?.cellConfig[key]?.onClick(this.item, e);
      }
    },
    getProps(action: Action<RowItem>, key: string) {
      const cellConfig = this.header?.cellConfig;
      return mergeProps(
        cellConfig ? cellConfig[key]?.props : {},
        action?.props ? action?.props : {}
      );
    },
  },
});
</script>

<style src="./default-action.scss" lang="scss" scoped></style>
