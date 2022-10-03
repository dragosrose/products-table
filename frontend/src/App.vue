<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

interface Item {
  _id: string;
  name: string;
  code: string;
  weight: number;
  price: number;
  color: string;
}

export default defineComponent({
  data() {
    return {
      items: [] as Item[],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    // Write a GET request to http://localhost:3000/produse.
    async fetch() {
      try {
        const response = await axios.get("http://localhost:3000/produse");
        this.items = response.data;
      } catch (e) {
        console.error(e);
      }
    },

    async write(newItem: Item) {
      try {
        const response = await axios.post("http://localhost:3000/produse", {
          name: newItem.name,
          code: newItem.code,
          weight: newItem.weight,
          price: newItem.price,
          color: newItem.color,
        });
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
});
</script>

<template>
  <div>
    <table class="table table-bordered">
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
</template>

<style scoped></style>
