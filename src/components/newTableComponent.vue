<template>
    <h3>Nova tabela</h3>
    <form>
        <label>Table type: </label> <select v-model="tableType">
            <option disabled value="">Select Type</option>
            <option value="initial">Initial Table</option>
            <option value="in">In</option>
            <option value="out">Out</option>
        </select>
        <div v-if="tableType === 'initial'">
        </div>
        <div v-if="tableType === 'in' || tableType === 'out'">
            <label for="tableNameInput">Table Name: </label>
            <input id="tableNameInput" v-model="tableName">
        </div>
        <span id="error"> {{ error }}</span>
    </form>
    <button @click="handleCreateTable">Create Table</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';



let error: Ref<null | string> = ref(null);
let tableName: Ref<string> = ref("");
let tableType: Ref<string> = ref("");


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