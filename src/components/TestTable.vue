<template>
  <DataTable :value="products">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
  </DataTable>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const products = ref()

onMounted(() => {
  //add data to products
  products.value = [
    { code: 'A121', name: 'Hard Drive', category: 'Electronics', quantity: 10 },
    { code: 'B532', name: 'Laptop', category: 'Electronics', quantity: 25 },
    {
      code: 'C982',
      name: 'LCD Monitor',
      category: 'Electronics',
      quantity: 50,
    },
    { code: 'D530', name: 'Memory', category: 'Electronics', quantity: 75 },
    { code: 'E110', name: 'Mouse', category: 'Electronics', quantity: 150 },
  ]

  console.log('products', products)
})
</script>
