<template>
    <form>
        <label for="tableTypeSelect">Table type: </label> <select id="tableTypeSelect" v-model="tableType">
            <option disabled value="">Select Type</option>
            <option value="initial">Initial Table</option>
            <option value="in">In</option>
            <option value="out">Out</option>
        </select>
        <div v-if="tableType === 'initial'">
            <label for="initialTableCopySelect">Copy initial table from: </label>
            <select id="initialTableCopySelect" v-model="initialTableCopySelect">
                <option disabled value="">None</option>
                <option v-for="financeData in previousFinanceData" v-bind:key="financeData"></option>
            </select>
        </div>
        <div v-if="tableType === 'in' || tableType === 'out'">
            <label for="tableNameInput">Table Name: </label>
            <input id="tableNameInput" v-model="tableName">
        </div>
        <span id="error"> {{ error }}</span>
        <button @click="handleCreateTable">Create Table</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import TauriService from '../service/tauriService';
import type { IFinance } from '../interfaces/interfaces';



// tauri
let previousFinanceData = await (await TauriService.getAllFinanceData()).map(data => data?.split(".")[0]);
// vue
let error: Ref<null | string> = ref(null);
let tableName: Ref<string> = ref("");
let tableType: Ref<string> = ref("");
let initialTableCopySelect: Ref<string> = ref("");


function handleCreateTable() {
    if (tableType.value.length < 1 || (tableName.value.length < 1 && (tableType.value === 'in' || tableType.value === 'out'))) {
        error.value = "Please fill the form correctly";
        return null;
    }
    try {
        let table = {} as IFinance;
        // load this month's table
        // let table = ;
        if (tableType.value === 'initial') {
            table.initial = {
                name: "Initial table",
                values: [],
            }
        }
        if (tableType.value === 'in') {
            table.in = [{ ...table.in,
                name: tableName.value,
                values: [],
            }]
        }
        if (tableType.value === 'out') {
            table.out = [{ ...table.out,
                name: tableName.value,
                values: [],
            }] 
        }
        // save table with tauri rust
        
        
        return table;


    } catch({ message }) {
        console.log(message)
    }
    
}
</script>