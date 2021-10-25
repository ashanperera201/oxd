<template>
  <button @click="clickOnAction()">Action</button>
  <button>Action</button>
  <button>Action</button>
</template>

<script>
export default {
  props: {
    data: {},
  },
  created() {
    console.log(this.data);
  },
  methods: {
    clickOnAction() {
      console.log(this.data);
    },
  },
};
</script>
