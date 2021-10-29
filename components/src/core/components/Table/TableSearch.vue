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
  <div class="search">
    <div class="search--content">
      <oxd-text class="oxd-table-filter-title" tag="p">(0) Goals Found</oxd-text>
    </div>
    <div class="search--tools">
      <oxd-quick-search :createOptions="callAPI">
        <template v-slot:iconSlot>
          <oxd-icon-button name="oxd-search"></oxd-icon-button>
        </template>
        <template v-slot:option="{ data }">
          <span
            class="auto-complete-img"
            style="display: inline-block; padding-right: 15px"
          >
            <img :src="data.avatar_url" class="img-icon-size" />
          </span>
          <span> {{ data.label }}</span>
        </template>
      </oxd-quick-search>
      <oxd-icon-button name="funnel" @click="handleFilterVisibility" />
    </div>

    <oxd-filtration-modal
      :show="show"
      :filterTitle="'Author[Filtration] - #Ashan Perera'"
      :formModel="formModel"
      :filtrationForm="filtrationForm"
      @on-closed="handleFilterVisibility"
      @on-filter-changed="filterModalChange"
    ></oxd-filtration-modal>
  </div>
</template>

<script lang="ts">
import FiltrationModal from "@orangehrm/oxd/core/components/Filtration/FiltrationModal.vue";
import Input from "@orangehrm/oxd/core/components/Input/Input.vue";
import IconButton from "@orangehrm/oxd/core/components/Button/Icon.vue";
import QuickSearchInput from "@orangehrm/oxd/core/components/Input/Autocomplete/QuickSearchInput.vue";
import Text from "@orangehrm/oxd/core/components/Text/Text.vue";

export default {
  name: "oxd-table-search",
  props: {
    subjectOfItems: String,
    count: Number,
    filterForm: Object,
  },

  data() {
    return {
      show: false,
      quickSerach: "",
      // form model.
      formModel: {
        firstName: "",
        userRole: "",
        departments: "",
        location: "",
      },
      // form object.
      filtrationForm: [
        {
          formRow: [
            {
              formRowLabel: "Sample Row",
              formRowId: "#sampleRowId",
              cols: 4,
              formItems: [
                {
                  fieldName: "firstName",
                  label: "First Name",
                  type: "text",
                  id: "firstName",
                },
                {
                  fieldName: "userRole",
                  label: "User Role",
                  type: "dropdown",
                  id: "userRole",
                  clearable: true,
                  options: [
                    { id: 1, label: "All" },
                    { id: 2, label: "Admin" },
                    { id: 3, label: "ESS" },
                  ],
                },
                {
                  fieldName: "departments",
                  label: "Departments",
                  type: "dropdown",
                  id: "departments",
                  clearable: true,
                  options: [
                    { id: 1, label: "Department-1" },
                    { id: 2, label: "Department-2" },
                    { id: 3, label: "Department-3" },
                  ],
                },
                {
                  fieldName: "location",
                  label: "User Location",
                  type: "dropdown",
                  id: "location",
                  clearable: true,
                  options: [
                    { id: 1, label: "Austrailia" },
                    { id: 2, label: "Sri Lanka" },
                    { id: 3, label: "Kanada" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },

  components: {
    "oxd-input": Input,
    "oxd-icon-button": IconButton,
    "oxd-filtration-modal": FiltrationModal,
    "oxd-quick-search": QuickSearchInput,
    "oxd-text": Text,
  },

  emits: ["common-filter-change"],
  methods: {
    handleFilterVisibility() {
      this.show = !this.show;
    },
    quickSearchOnChange() {
      if (this.quickSerach) {
        this.$emit("common-filter-change", { quickSearch: this.quickSerach });
      }
    },
    filterModalChange(event: any) {
      this.$emit("common-filter-change", {
        quickSearch: { filterModal: event },
      });
      this.show = false;
    },
    callAPI(serachParam) {
      return new Promise((resolve) => {
        if (serachParam.trim()) {
          fetch(`https://api.github.com/search/users?q=${serachParam}`)
            .then((response) => response.json())
            .then((json) => {
              const { items } = json;
              resolve(
                items.map((item) => {
                  return {
                    id: item.id,
                    label: item.login,
                    avatar_url: item.avatar_url,
                  };
                })
              );
            });
        } else {
          resolve([]);
        }
      });
    },
  },
};
</script>

<style src="./table-search.scss" lang="scss" scoped></style>
