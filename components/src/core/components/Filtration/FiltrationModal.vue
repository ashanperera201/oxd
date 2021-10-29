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
  <oxd-dialog v-if="show" @update:show="onClose">
    <div class="oxd-filtration">
      <div class="oxd-filtration-header">
        <div class="oxd-filtration-header-title header-section">
          <oxd-text class="oxd-table-filter-title" tag="h5">{{ filterTitle }}</oxd-text>
          <oxd-icon-button name="arrow-clockwise" withContainer @click="onReset" />
        </div>
        <div class="oxd-filtration-header-options">
          <div class="--toggle">
            <slot name="toggleOptions"></slot>
          </div>
          <div class="--export">
            <slot name="exportOptions"></slot>
          </div>
        </div>
      </div>
      <oxd-divider />
      <div class="oxd-filtration-area">
        <div class="container">
          <oxd-form @submitValid="onFilterSubmit">
            <div v-if="filtrationForm.length">
              <div v-for="(form, index) in filtrationForm" :key="index">
                <oxd-form-row v-for="(row, rowIndex) in form.formRow" :key="rowIndex">
                  <oxd-grid :cols="row.cols" class="orangehrm-filter-grid">
                    <oxd-grid-item
                      v-for="(item, itemIndex) in row.formItems"
                      :key="itemIndex"
                    >
                      <div v-if="item.type === 'text'">
                        <oxd-input-field
                          :id="item.id"
                          :label="item.label"
                          v-model="formModel[item.fieldName]"
                          :placeholder="item.label"
                        />
                      </div>

                      <div v-else-if="item.type === 'dropdown'">
                        <oxd-input-field
                          :type="item.type"
                          :label="item.label"
                          :id="item.id"
                          v-model="formModel[item.fieldName]"
                          :clear="item.clearable"
                          :options="item.options"
                        />
                      </div>
                    </oxd-grid-item>
                  </oxd-grid>
                </oxd-form-row>
              </div>
            </div>
            <div v-else>
              <span>Form is not found</span>
            </div>
            <oxd-divider />
            <oxd-form-actions class="button-container">
              <!-- <oxd-button
                class="orangehrm-left-space"
                displayType="ghost"
                label="Reset"
                @click="onReset"
              /> -->
              <oxd-button
                class="orangehrm-left-space"
                displayType="ghost"
                label="Cancel"
                @click="onClose"
              />
              <oxd-button displayType="secondary" label="Search" type="submit" />
            </oxd-form-actions>
          </oxd-form>
        </div>
      </div>
    </div>
  </oxd-dialog>
</template>

<script>
import Dialog from "@orangehrm/oxd/core/components/Dialog/Dialog";
import Grid from "@orangehrm/oxd/core/components/Grid/Grid";
import GridItem from "@orangehrm/oxd/core/components/Grid/GridItem";
import Form from "@orangehrm/oxd/core/components/Form/Form";
import FormRow from "@orangehrm/oxd/core/components/Form/FormRow";
import FormActions from "@orangehrm/oxd/core/components/Form/FormActions";
import InputField from "@orangehrm/oxd/core/components/InputField/InputField";
import InputGroup from "@orangehrm/oxd/core/components/InputField/InputGroup";
import IconButton from "@orangehrm/oxd/core/components/Button/Icon";
import Button from "@orangehrm/oxd/core/components/Button/Button";
import Divider from "@orangehrm/oxd/core/components/Divider/Divider";
import CardTable from "@orangehrm/oxd/core/components/CardTable/CardTable";
import Text from "@orangehrm/oxd/core/components/Text/Text.vue";

export default {
  name: "oxd-filtration-modal",
  components: {
    "oxd-dialog": Dialog,
    "oxd-grid": Grid,
    "oxd-grid-item": GridItem,
    "oxd-form": Form,
    "oxd-form-row": FormRow,
    "oxd-form-actions": FormActions,
    "oxd-input-group": InputGroup,
    "oxd-input-field": InputField,
    "oxd-button": Button,
    "oxd-icon-button": IconButton,
    "oxd-divider": Divider,
    "oxd-card-table": CardTable,
    "oxd-text": Text,
  },
  props: {
    show: Boolean,
    styles: Object,
    formModel: Object,
    filtrationForm: Array,
    filterTitle: {
      type: String,
      required: true,
    },
  },
  emits: ["on-closed", "on-filter-changed"],
  methods: {
    onReset() {
      const formKeys = Object.keys(this.formModel);
      formKeys.forEach((key) => {
        delete this.formModel[key];
      });
      console.log(this.formModel);
    },
    onClose() {
      this.$emit("on-closed", false);
    },
    onFilterSubmit() {
      this.$emit("on-filter-changed", { ...this.formModel });
    },
  },
};
</script>

<style src="./filtration-modal.scss" lang="scss" scoped></style>
<style lang="scss">
.oxd-filtration-header-options {
  & .oxd-icon-button {
    font-size: 12px;
    width: 24px !important;
    height: 24px !important;
    min-width: unset;
    min-height: unset;
    margin-right: 5px;
  }
  & .oxd-button {
    padding-right: 5px;
    padding-left: 5px;
    min-width: unset;
    margin-right: 5px;
  }
}
</style>
