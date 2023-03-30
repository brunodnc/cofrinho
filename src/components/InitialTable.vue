<script setup lang="ts">
const props = defineProps({
  initialTable: {
    type: Object,
    required: true,
    default: () => ({
      values: []
    })
  }
});
</script>

<template>
    <h3>Initial Table</h3>
    <table>
        <tr>
            <th>Description</th>
            <th>Value</th>
        </tr>
        <tr v-for="(v, index) in initialTable.values" :key="index+ ' - ' + v.description + ' - ' + v.value">
            <td>{{ v.description }}</td>
            <td>{{ v.value }}</td>
        </tr>
    </table>
</template>