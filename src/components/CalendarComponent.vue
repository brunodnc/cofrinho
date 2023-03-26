<script setup lang="ts">
const months: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8 , 9, 10, 11];
const year = 2023;
</script>

<template>
    <aside>
        <ul>{{ year }}
            <li v-for="month in months" :key="month">
                {{ month }}
            </li>
        </ul>
    </aside>
</template>