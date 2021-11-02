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
  <oxd-clasic-table
    :selector="selector"
    :headers="headers"
    :items="items"
    :paginationConfig="paginationConfig"
    @click="onClick"
    selectable
    v-model:selected="checkedItems"
  />
</template>

<script>
import ClassicTable from "@orangehrm/oxd/core/components/Table/ClassicTable";

export default {
  data() {
    return {
      selector: {
        width: "3%",
      },
      paginationConfig: {
        showPagination: true,
        showPageNumbers: true,
        pageOptions: [
          {
            id: 1,
            label: "10",
          },
          {
            id: 2,
            label: "20",
          },
          {
            id: 3,
            label: "30",
          },
        ],
      },
      headers: [
        {
          name: "col1",
          title: "Column 1",
          width: "40%",
        },
        {
          name: "col2",
          title: "Column 2",
          width: "20%",
        },
        {
          name: "col3",
          title: "Action",
          width: "40%",
          defaultCellRenderers: {
            actions: ["edit", "delete", "download"],
            actionClickHandler(actionKey, dataItem, event) {
              console.log(actionKey);
              console.log(dataItem);
              console.log(event);
            },
          },
        },
      ],
      items: [
        {
          col1: "Data 1",
          col2: "Data 2",
        },
        {
          col1: "Data 2",
          col2: "Data 2",
        },
        {
          col1: "Data 3",
          col2: "Lorem Ipsum is simply dummy text of the printing and typesettin ",
        },
      ],
      checkedItems: [2, 0],
    };
  },

  components: {
    "oxd-clasic-table": ClassicTable,
  },

  methods: {
    onClick(e) {
      console.log(e);
    },
    onChange(event) {
      debugger;
    },
  },
};
</script>
