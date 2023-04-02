<script setup lang="ts">
import TableComponent from './TableComponent.vue';
import { invoke } from '@tauri-apps/api';
import { store, financeData } from '@/state/store';
import NewTableComponent from './newTableComponent.vue';
import { ref, computed, watch } from 'vue';
import TauriService from '@/service/tauriService';
import type { IFinance } from '@/interfaces/interfaces';
import type { Ref } from 'vue';



const creatingNewTable = ref(false);

function handleToggleCreatingNewTable() {
    creatingNewTable.value = !creatingNewTable.value;
}

async function refreshFinanceData() {
    financeData.value = await TauriService.getCurrentYYYYMMFinancialData(store.getSelectedYYYYMM());
}


watch(
  () => store.getSelectedYYYYMM(),
  async (newValue) => {
    financeData.value = await TauriService.getCurrentYYYYMMFinancialData(newValue);
  },
  { immediate: true },
);

</script>

<template>
    <button @click="refreshFinanceData">Refresh</button>
    <button @click="handleToggleCreatingNewTable">New Table</button>
    <Suspense>
        <NewTableComponent v-if="creatingNewTable"/>
    </Suspense>
    <template v-if="financeData">
        <!-- {{ invoke('greet', { name: 'World'}) }} -->
        <h2>Monthly FinanceData </h2>
        <TableComponent v-if="financeData.initial" :values="(financeData as IFinance).initial?.values || []" :type="'initial'" :name="(financeData as IFinance).initial.name" />
        <template v-if="financeData.in">
            <template v-for="(table, i) in (financeData as IFinance).in" :key="i +  ' - ' + table.name">
                <TableComponent :values="table?.values || []" :type="'in'" :name="table.name" />
            </template>
        </template>
        <template v-if="financeData.in">
            <template v-for="(table, i) in (financeData as IFinance).out" :key="i +  ' - ' + table.name">
                <TableComponent :values="table?.values || []" :type="'out'" :name="table.name" />
            </template>
        </template>
    </template>
</template>