<script setup lang="ts">    
defineProps<{type: String
    name: String
    values: {description: String, value: Number}[]
    }>()


</script>

<template>
    <table>
        <tr>
            <th>Description</th>
            <th>Value</th>
        </tr>
        <tr v-for="(v, index) in values" :key="index+ ' - ' + v.description + ' - ' + v.value">
            <td>{{ v.description }}</td>
            <td>{{ v.value }}</td>
        </tr>
    </table>
</template>