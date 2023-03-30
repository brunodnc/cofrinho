<script setup lang="ts">
import { MonthPicker } from 'vue-month-picker';
import { store } from '@/state/store';
import { ref } from 'vue';

let showCalendar = ref(false);

function handleToggleShowCalendar() {
    showCalendar.value = !showCalendar.value;
}

let splittedSelectedYYYYMM = store.getSelectedYYYYMM().split("-");
let selectedYear = Number(splittedSelectedYYYYMM[0]);
let selectedMonth = Number(splittedSelectedYYYYMM[1]);


function selectYearMonth(event: {from: Date, to: Date}) {
    const selectedDate: Date = event.from;
    store.setDateToSelectedYYYYMM(selectedDate);
    handleToggleShowCalendar();
    // se estivesse verdadeiramente reativo o set Selected acima não precisaria dessas 3 linhas de baixo...
    splittedSelectedYYYYMM = store.getSelectedYYYYMM().split("-");
    selectedYear = Number(splittedSelectedYYYYMM[0]);
    selectedMonth = Number(splittedSelectedYYYYMM[1]);
    
}
</script>

<template>
    <aside>
        <div class="selectedYYYYMM" @click="handleToggleShowCalendar()">{{  store.getSelectedYYYYMM() }}</div>
        <month-picker v-if="showCalendar" variant="dark" @input="selectYearMonth($event)"
        :default-year="selectedYear" :default-month="selectedMonth"/>    
    </aside>
</template>

<style>
    .selectedYYYYMM:hover {
        cursor: pointer;
    }
</style>