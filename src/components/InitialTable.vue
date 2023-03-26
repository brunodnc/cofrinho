<script setup lang="ts">
    const initialTable = {
        values: [
            {
                description: "Salário",
                type: 'in',
                value: 2800,
            },
            {
                description: "Netflix",
                type: 'out',
                value: 100,
            },
        ]
    }
</script>

<template>
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