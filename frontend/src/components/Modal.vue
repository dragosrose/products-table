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
  <q-btn label="Add Item" @click="create = true"></q-btn>
  <q-btn v-if="selected.length" label="Update Item" @click="put = true"></q-btn>
  <!-- Create modal -->
  <q-dialog v-model="create" persistent>
    <q-card style="min-width: 350px">
      <q-card-section> <div class="text-h6">Name</div> </q-card-section>
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
    <q-card style="min-width: 350px">
      <q-card-section> <div class="text-h6">Name</div> </q-card-section>
      <q-input
        dense
        :placeholder="selected[0].name"
        v-model="newItem.name"
        autofocus
      ></q-input>
      <q-card-section> <div class="text-h6">Item code</div> </q-card-section>
      <q-input
        dense
        :placeholder="selected[0].code"
        v-model="newItem.code"
        autofocus
      ></q-input>
      <q-card-section> <div class="text-h6">Weight</div> </q-card-section>
      <q-input
        dense
        :placeholder="selected[0].weight.toString()"
        v-model="newItem.weight"
      ></q-input>
      <q-card-section> <div class="text-h6">Price</div> </q-card-section>
      <q-input
        dense
        :placeholder="selected[0].price.toString()"
        v-model="newItem.price"
      ></q-input>
      <q-card-section> <div class="text-h6">Color</div> </q-card-section>
      <q-input
        dense
        :placeholder="selected[0].color"
        v-model="newItem.color"
      ></q-input>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          flat
          label="Update item"
          @click="update(newItem, selected[0]._id)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Delete -->
  <q-btn
    v-if="selected.length"
    label="Delete"
    @click="remove(selected[0]._id)"
  ></q-btn>

  <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
</template>
