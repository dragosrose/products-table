<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import Modal from "./components/Modal.vue";
import type { Item } from "./components/interfaces";

export default defineComponent({
  data() {
    return {
      items: [] as Item[],
      renderComponent: true,
    };
  },
  created() {
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
      } catch (e) {
        console.error(e);
      }
    },
    async remove(_id: string) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/produse/${_id}/delete`
        );
      } catch (e) {
        console.error(e);
      }
    },
    async update(newItem: Item, _id: string) {
      try {
        const response = await axios.put(
          `http://localhost:3000/produse/${_id}/update`,
          {
            name: newItem.name,
            code: newItem.code,
            weight: newItem.weight,
            price: newItem.price,
            color: newItem.color,
          }
        );
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
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>Weight</th>
          <th>Price</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item._id">
          <td>{{ item.name }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.weight }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.color }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Modal @reload="forceRerender"></Modal>
</template>

<style scoped></style>
