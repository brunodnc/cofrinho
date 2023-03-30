<template>
    <h3>Nova tabela</h3>
    <form>
        <label>Tipo da tabela: </label> <select v-model="tableType">
            <option disabled value="">Select Type</option>
            <option>Initial Table</option>
            <option>In</option>
            <option>Out</option>
        </select>
        <div v-if="tableType === 'In' || tableType === 'Out'">
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
    if (tableType.value.length < 1 || (tableName.value.length < 1 && (tableType.value === 'In' || tableType.value === 'Out'))) {
        error.value = "Please fill the form correctly";
        return null;
    }
    let newTable = null;
    if (tableType.value === 'Initial Table') {
        return null;
    }
    if (tableType.value === 'In') {
        return null;
    }
    if (tableType.value === 'Out') {
        return null;   
    }
    // save table with tauri rust
    newTable = null
    
    return newTable;
}
</script>