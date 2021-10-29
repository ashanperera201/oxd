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
  <th>
    <div class="oxd-header-wrapper">
      <slot></slot>
      <div v-if="header && header.sortable">
        <oxd-card-th-sort :order="sortingOrder" @order="onOrder"></oxd-card-th-sort>
      </div>
    </div>
  </th>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Order } from "./TableTypes/card-type";
import TableHeaderSortDropdown from "./TableHeaderSortDropdown.vue";

export default defineComponent({
  name: "oxd-th",

  props: {
    order: {
      type: String,
      required: false,
      default: "DEFAULT",
    },
    header: Object,
  },
  data() {
    return {
      sortingOrder: "",
    };
  },
  mounted() {
    this.sortingOrder = this.order;
  },
  emits: ["order"],

  components: {
    "oxd-card-th-sort": TableHeaderSortDropdown,
  },

  methods: {
    onOrder(order: Order) {
      this.sortingOrder = order;
      let sortingObject = {
        order: order,
        header: this.header,
      };
      this.$emit(`order`, sortingObject);
    },
  },
});
</script>

<style src="./table-header-cell.scss" lang="scss" scoped></style>
