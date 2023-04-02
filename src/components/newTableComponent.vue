<template>
    <form>
        <label for="tableTypeSelect">Table type: </label> <select id="tableTypeSelect" v-model="tableType">
            <option disabled value="">Select Type</option>
            <option v-if="!hasInitialTable" value="initial">Initial Table</option>
            <option value="in">In</option>
            <option value="out">Out</option>
        </select>
        <div v-if="tableType === 'initial'">
            <label for="initialTableCopySelect">Copy initial table from: </label>
            <select id="initialTableCopySelect" v-model="initialTableCopySelect">
                <option disabled value="">None</option>
                <option v-for="fileName in previousFinanceData" v-bind:key="fileName">{{ fileName }}</option>
            </select>
        </div>
        <div v-if="tableType === 'in' || tableType === 'out'">
            <label for="tableNameInput">Table Name: </label>
            <input id="tableNameInput" v-model="tableName">
        </div>
        <span id="error"> {{ error }}</span>
        <button @click.prevent="handleCreateTable">Create Table</button>
    </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import TauriService from '../service/tauriService';
import type { IFinance } from '../interfaces/interfaces';
import { financeData, store } from '@/state/store';
import { path } from '@tauri-apps/api';

// tauri
let previousFinanceData = ref((await TauriService.getAllFinanceData()).map(d => d?.split(".")[0]).sort());
const selectedYYYYMM = store.getSelectedYYYYMM();

const hasInitialTable = ref(await TauriService.hasInitialTable(selectedYYYYMM));

// vue
let error: Ref<null | string> = ref(null);
let tableName: Ref<string> = ref("");
let tableType: Ref<string> = ref("");
let initialTableCopySelect: Ref<string> = ref("");
console.log(await path.appDataDir());

async function handleCreateTable(): Promise<null> {
    const selectedYYYYMM = store.getSelectedYYYYMM()
    let data = {
        initial: {},
        in: [],
        out: []
        } as unknown as IFinance;
    if (tableType.value.length < 1 || (tableName.value.length < 1 && (tableType.value === 'in' || tableType.value === 'out'))) {
        error.value = "Please fill the form correctly";
        return null;
    }
    try {
        // create finantial month data file if it does not exists
        if (!(await TauriService.YYYYMMJSONExists(selectedYYYYMM))) {
            await TauriService.saveFinanceData(selectedYYYYMM, data)
        } else {
            // load this month's table
            data = await TauriService.getCurrentYYYYMMFinancialData(selectedYYYYMM) as IFinance
        }
        if (tableType.value === 'initial') {
            if (initialTableCopySelect.value.length > 1) {
                data.initial = (await TauriService.getCurrentYYYYMMFinancialData(initialTableCopySelect.value) as IFinance).initial
            } else {
                data.initial = {
                name: "Initial table",
                values: [],
                }
            }
        }
        if (tableType.value === 'in') {
            data.in = [...data.in, { 
                name: tableName.value,
                values: [],
            }]
        }
        if (tableType.value === 'out') {
            data.out = [...data.out, {
                name: tableName.value,
                values: [],
            }] 
        }
        // save table with tauri rust
        console.log("data na criação: ", data);
        financeData.value = data;
        await TauriService.saveFinanceData(selectedYYYYMM, data);
        return null;
    } catch(error) {
        console.log(error)
    }
    
}
</script>