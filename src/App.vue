<script setup lang="ts">
import CalendarComponentVue from './components/CalendarComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import TablesComponent from './components/TablesComponent.vue';
</script>

<template>
  <CalendarComponentVue />
  <HeaderComponent />
  <Suspense>
    <TablesComponent />
  </Suspense>
</template>