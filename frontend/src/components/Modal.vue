<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";
import type { Item } from "./interfaces";

export default defineComponent({
  props: ["selected"],
  emits: ["reload"],
  data() {
    return {
      newItem: {
        _id: "",
        name: "",
        code: "",
        weight: 0,
        price: 0,
        color: "",
        isDeleted: false,
      },
    };
  },
  setup() {
    return {
      create: ref(false),
      put: ref(false),
    };
  },
  methods: {
    async write(newItem: Item) {
      try {
        const response = await axios.post("http://localhost:3000/produse", {
          name: newItem.name,
          code: newItem.code,
          weight: newItem.weight,
          price: newItem.price,
          color: newItem.color,
          isDeleted: newItem.isDeleted,
        });

        this.$emit("reload");
      } catch (e) {
        console.error(e);
      }
    },
    async remove(_id: string) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/produse/${_id}/delete`
        );

        this.$emit("reload");
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
            isDeleted: newItem.isDeleted,
          }
        );
        this.$emit("reload");
      } catch (e) {
        console.error(e);
      }
    },
  },
});
</script>

<template>
  <div class="m-3 space-x-4">
    <q-btn
      class="dark: bg-slate-300"
      glossy
      label="Add Item"
      @click="create = true"
    ></q-btn>
    <q-btn
      v-if="selected.length"
      glossy
      label="Update Item"
      @click="put = true"
    ></q-btn>
    <!-- Delete -->
    <q-btn
      v-if="selected.length"
      color="red"
      glossy
      label="Delete"
      @click="remove(selected[0]._id)"
    ></q-btn>
  </div>

  <!-- Create modal -->
  <q-dialog v-model="create" persistent>
    <q-card class="q-pa-md" style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Name</div>
      </q-card-section>
      <q-input
        dense
        v-model="newItem.name"
        autofocus
        @keyup.enter="create = false"
      ></q-input>
      <q-card-section> <div class="text-h6">Item code</div> </q-card-section>
      <q-input
        dense
        v-model="newItem.code"
        autofocus
        @keyup.enter="create = false"
      ></q-input>
      <q-card-section> <div class="text-h6">Weight</div> </q-card-section>
      <q-input
        dense
        v-model="newItem.weight"
        @keyup.enter="create = false"
      ></q-input>
      <q-card-section> <div class="text-h6">Price</div> </q-card-section>
      <q-input
        dense
        v-model="newItem.price"
        @keyup.enter="create = false"
      ></q-input>
      <q-card-section> <div class="text-h6">Color</div> </q-card-section>
      <q-input
        dense
        v-model="newItem.color"
        @keyup.enter="create = false"
      ></q-input>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Add item" @click="write(newItem)" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- Update modal -->
  <q-dialog v-model="put" persistent>
    <q-card class="q-pa-md" style="min-width: 350px">
      <q-card-section> <div class="text-h6">Name</div> </q-card-section>
      <q-input
        dense
        :placeholder="selected[0].name"
        v-model="selected[0].name"
        autofocus
      ></q-input>
      <q-card-section> <div class="text-h6">Item code</div> </q-card-section>
      <q-input
        dense
        :placeholder="selected[0].code"
        v-model="selected[0].code"
        autofocus
      ></q-input>
      <q-card-section> <div class="text-h6">Weight</div> </q-card-section>
      <q-input
        dense
        :placeholder="selected[0].weight.toString()"
        v-model="selected[0].weight"
      ></q-input>
      <q-card-section> <div class="text-h6">Price</div> </q-card-section>
      <q-input
        dense
        :placeholder="selected[0].price.toString()"
        v-model="selected[0].price"
      ></q-input>
      <q-card-section> <div class="text-h6">Color</div> </q-card-section>
      <q-input
        dense
        :placeholder="selected[0].color"
        v-model="selected[0].color"
      ></q-input>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          flat
          label="Update item"
          @click="update(selected[0], selected[0]._id)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <div class="my-10 text-lg">Selected: {{ JSON.stringify(selected) }}</div>
</template>
