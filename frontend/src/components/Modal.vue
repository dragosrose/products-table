<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["reload"],
  data() {
    return {
      newItem: {
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
      prompt: ref(false),
    };
  },
  methods: {
    async write(newItem: {
      name: string;
      code: string;
      weight: number;
      price: number;
      color: string;
      isDeleted: boolean;
    }) {
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
  },
});
</script>

<template>
  <q-btn label="Add Item" @click="prompt = true"></q-btn>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section> <div class="text-h6">Name</div> </q-card-section>
      <q-input
        dense
        v-model="newItem.name"
        autofocus
        @keyup.enter="prompt = false"
      ></q-input>
      <q-card-section> <div class="text-h6">Item code</div> </q-card-section>
      <q-input
        dense
        v-model="newItem.code"
        autofocus
        @keyup.enter="prompt = false"
      ></q-input>
      <q-card-section> <div class="text-h6">Weight</div> </q-card-section>
      <q-input
        dense
        v-model="newItem.weight"
        @keyup.enter="prompt = false"
      ></q-input>
      <q-card-section> <div class="text-h6">Price</div> </q-card-section>
      <q-input
        dense
        v-model="newItem.price"
        @keyup.enter="prompt = false"
      ></q-input>
      <q-card-section> <div class="text-h6">Color</div> </q-card-section>
      <q-input
        dense
        v-model="newItem.color"
        @keyup.enter="prompt = false"
      ></q-input>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Add item" @click="write(newItem)" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
