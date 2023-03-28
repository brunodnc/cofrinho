<script setup lang="ts">
const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8 , 9, 10, 11, 12];
const year = 2023;

const currentYear = new Date().getFullYear();

// TODO: need to get lowest year that exists an table in the user's data folder if it does not have an lowest year: 
function getLowestYearThatATableExists() {
    // if lowestYearTable exists... return year, else...
    return new Date().getFullYear();
}

const lowestYear = getLowestYearThatATableExists()

const years: number[] = [];
if (lowestYear !== currentYear) {
    for (let i = lowestYear; i <= currentYear; i += 1) {
        years.push(i);
    }
} else {
    years.push(year);
}


</script>

<template>
    <aside>
        <ul v-if="years.length <= 1">{{ currentYear }}
            <li v-for="month in months" :key="month">
                {{ month }}
            </li>
        </ul>
<!-- TODO: Transformar em select para selecionar os anos passados
        <ul v-if="years.length <= 1">{{ currentYear }}
            <li v-for="month in months" :key="month">
                {{ month }}
            </li>
        </ul> -->
    </aside>
</template>