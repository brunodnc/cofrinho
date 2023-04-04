<script setup lang="ts">
import TableComponent from './TableComponent.vue';
import { store, financeData, creatingNewTable } from '@/state/store';
import NewTableComponent from './newTableComponent.vue';
import { computed, watch } from 'vue';
import TauriService from '@/service/tauriService';
import type { IFinance } from '@/interfaces/interfaces';
import { financeDataAreEqual } from '@/service/globalService';

function handleToggleCreatingNewTable() {
    creatingNewTable.value = !creatingNewTable.value;
}

const computedFinanceData = computed(() => (financeData.value as IFinance));

const computedTotalFinance = computed(() => {
    const data = financeData.value;
    const initialValues = data.initial.values.reduce((acc, cur) => {
        return acc += cur.value;
    }, 0);
    const inValues = data.in.reduce((acc, cur) => {
        const totalTableValue = cur.values.reduce((acc, cur) => {
        return acc += cur.value;
    }, 0);
        return acc += totalTableValue;
    }, 0);
    const outValues = data.out.reduce((acc, cur) => {
        const totalTableValue = cur.values.reduce((acc, cur) => {
        return acc += cur.value;
    }, 0);
        return acc -= totalTableValue;
    }, 0)
    return initialValues + inValues + outValues;
})
watch(
  () => store.getSelectedYYYYMM(),
  async (newValue) => {
    financeData.value = await TauriService.getCurrentYYYYMMFinancialData(newValue);
  },
  { immediate: true },
);

</script>

<template>
    <div class="tablesComponent">
    <button @click="handleToggleCreatingNewTable">New Table</button>
    <Suspense>
        <NewTableComponent v-if="creatingNewTable" />
    </Suspense>
    <template v-if="computedFinanceData">
        <h2>Monthly finance table </h2>
        <p>Total: {{ computedTotalFinance || 0 }}</p>
        <h3>Initial Table</h3>
        <TableComponent v-if="computedFinanceData.initial.name" :values="(computedFinanceData as IFinance).initial?.values || []" :type="'initial'" :name="(computedFinanceData as IFinance).initial.name || 'Initial table'" />
        <h3>"In" Table</h3>
        <template v-if="computedFinanceData.in">
            <template v-for="(table, i) in (computedFinanceData as IFinance).in" :key="i +  ' - ' + table.name">
                <TableComponent :values="table?.values || []" :type="'in'" :name="table.name || 'Table without name'" />
            </template>
        </template>
        <h3>"Out" Table</h3>
        <template v-if="computedFinanceData.in">
            <template v-for="(table, i) in (computedFinanceData as IFinance).out" :key="i +  ' - ' + table.name">
                <TableComponent :values="table?.values || []" :type="'out'" :name="table.name || 'Table without name'" />
            </template>
        </template>
    </template>
    <template v-else>
        <p>No financial data found</p>
    </template>
</div>
</template>

<style>
    .tablesComponent {
        padding: 10px;
    }
</style>