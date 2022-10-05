<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import Modal from "./components/Modal.vue";
import type { Item } from "./components/interfaces";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    $q.dark.set(true);

    return {
      selected: ref([]),
    };
  },
  watch: {
    selected(newVal, oldVal) {
      this.selected = newVal;
    },
  },
  data() {
    return {
      items: [] as Item[],
      rendered: false,

      columns: [
        {
          name: "name",
          label: "Name",
          field: "name",
          sortable: true,
        },
        {
          name: "code",
          label: "Code",
          field: "code",
        },
        {
          name: "weight",
          label: "Weight",
          field: "weight",
          sortable: true,
          sort: (a: number, b: number) => a - b,
        },
        {
          name: "price",
          label: "Price",
          field: "price",
          sortable: true,
          sort: (a: number, b: number) => a - b,
        },
        {
          name: "color",
          label: "Color",
          field: "color",
        },
      ],
      renderComponent: true,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    forceRerender() {
      this.fetch();
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    async fetch() {
      try {
        const response = await axios.get("http://localhost:3000/produse");
        this.items = response.data;
        this.rendered = true;
        console.log(this.items);
      } catch (e) {
        console.error(e);
      }
    },
  },
  components: { Modal },
});
</script>

<template>
  <div>
    <q-table
      title="Items"
      :rows="items"
      :columns="columns"
      row-key="_id"
      selection="single"
      v-model:selected="selected"
      v-if="rendered"
    >
    </q-table>
  </div>
  <Modal @reload="forceRerender" :selected="selected"></Modal>
</template>

<style scoped></style>
