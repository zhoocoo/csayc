<template>
  <div>
    <div class="rellax">I’m slow and smooth</div>
  </div>
</template>

<script setup lang="ts">
import Rellax from "rellax";
onMounted(() => {
  const rellax = new Rellax(".rellax");
});
</script>
