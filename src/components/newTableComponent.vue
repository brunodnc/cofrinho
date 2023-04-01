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
    let newTable = null;
    if (tableType.value === 'initial') {
        return null;
    }
    if (tableType.value === 'in') {
        return null;
    }
    if (tableType.value === 'out') {
        return null;   
    }
    // save table with tauri rust
    newTable = null
    
    return newTable;
}
</script>