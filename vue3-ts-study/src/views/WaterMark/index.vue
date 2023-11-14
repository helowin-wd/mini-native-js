<template>
   <div class="water-mark_container">
    <WaterMark text="版权所有" style="background: #c82828">
      <div class="content-wrapper"></div>
    </WaterMark>
    <WaterMark text="禁止转载" style="background: #28c840">
      <div class="content-wrapper"></div>
    </WaterMark>
   </div>
</template>

<script setup lang="ts">
import WaterMark from './components/WaterMark.vue'
</script>

<style scoped>
  .water-mark_container {
    width: 100%;
    display: flex;
  }

  .content-wrapper {
    width: 300px;
    height: 300px;
  }
</style>
