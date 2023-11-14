<template>
  <div class="home" v-size-ob="handleSizeChange">
    <h2>Resize</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const width = ref(500)

function handleSizeChange (size) {
  console.log(size)
  width.value = size.width
}
</script>

<style lang="less" scoped></style>
