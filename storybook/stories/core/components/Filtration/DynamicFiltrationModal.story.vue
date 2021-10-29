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
  <div>
    <p>Please click on this</p>
    <oxd-icon-button name="trash" @click="handleFilterVisibility" withContainer />
    <oxd-filtration-modal
      :show="show"
      :filterTitle="'Author[Filtration] - #Ashan Perera'"
      :formModel="formModel"
      :filtrationForm="filtrationForm"
      @on-closed="handleFilterVisibility"
    ></oxd-filtration-modal>
  </div>
</template>

<script>
import FiltrationModal from "@orangehrm/oxd/core/components/Filtration/FiltrationModal";
import IconButton from "@orangehrm/oxd/core/components/Button/Icon";

export default {
  components: {
    "oxd-filtration-modal": FiltrationModal,
    "oxd-icon-button": IconButton,
  },

  data() {
    return {
      show: false,
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

  methods: {
    handleFilterVisibility() {
      this.show = !this.show;
    },
  },
};
</script>
