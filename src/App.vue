<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
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
  <!-- <nav>
    <RouterLink to="/">Home</RouterLink>
  </nav>
  <RouterView /> -->
</template>

<style>

</style>