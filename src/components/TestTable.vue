
<template>
  <div class="card">
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

onMounted(() => {
  //add data to products
  products.value = [
    { code: 'A121', name: 'Hard Drive', category: 'Electronics', quantity: 10 },
    { code: 'B532', name: 'Laptop', category: 'Electronics', quantity: 25 },
    { code: 'C982', name: 'LCD Monitor', category: 'Electronics', quantity: 50 },
    { code: 'D530', name: 'Memory', category: 'Electronics', quantity: 75 },
    { code: 'E110', name: 'Mouse', category: 'Electronics', quantity: 150 }
  ];
});

const products = ref();

</script>
