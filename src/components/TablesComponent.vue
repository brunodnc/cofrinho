<script setup lang="ts">
import TableComponent from './TableComponent.vue';
import { invoke } from '@tauri-apps/api';
import { store, financeData, creatingNewTable } from '@/state/store';
import NewTableComponent from './newTableComponent.vue';
import { ref, computed, watch } from 'vue';
import TauriService from '@/service/tauriService';
import type { IFinance } from '@/interfaces/interfaces';
import type { Ref } from 'vue';





function handleToggleCreatingNewTable() {
    creatingNewTable.value = !creatingNewTable.value;
}

async function refreshFinanceData() {
    financeData.value = await TauriService.getCurrentYYYYMMFinancialData(store.getSelectedYYYYMM());
}
const computedFinanceData = computed(() => (financeData.value as IFinance));
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
        <NewTableComponent v-if="creatingNewTable" />
    </Suspense>
    <template v-if="computedFinanceData">
        <!-- {{ invoke('greet', { name: 'World'}) }} -->
        <h2>Monthly finance table </h2>
        <TableComponent :values="(computedFinanceData as IFinance).initial?.values || []" :type="'initial'" :name="(computedFinanceData as IFinance).initial.name || 'Initial table'" />
        <template v-if="computedFinanceData.in">
            <template v-for="(table, i) in (computedFinanceData as IFinance).in" :key="i +  ' - ' + table.name">
                <TableComponent :values="table?.values || []" :type="'in'" :name="table.name || 'Table without name'" />
            </template>
        </template>
        <template v-if="computedFinanceData.in">
            <template v-for="(table, i) in (computedFinanceData as IFinance).out" :key="i +  ' - ' + table.name">
                <TableComponent :values="table?.values || []" :type="'out'" :name="table.name || 'Table without name'" />
            </template>
        </template>
    </template>
    <template v-else>
        <p>No financial data found</p>
    </template>
</template>