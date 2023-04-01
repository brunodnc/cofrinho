<script setup lang="ts">
import TauriService from '@/service/tauriService';
import { store } from '@/state/store';
import { ref } from 'vue';

    
const props = defineProps<{
    type: String,
    name: String,
    values: {description: String, value: Number}[],
    }>()

let editingTableList = ref(props.values.map( v => false));
let valuesRef = ref(props.values);
let addTableRowToggle = ref(false);
let addTableRowDescription = ref("")
let addTableRowValue = ref("")

function editTableRow(row: {description: String, value: Number}, index: number) {
    editingTableList.value[index] = false;
    return null;
}

function toggleEditingOff(index: number) {
    editingTableList.value[index] = false;
}

function handleEditTableRowToggle(index: number) {
    editingTableList.value[index] = true;
}

function deleteTableRow(row: {description: String, value: Number}, index: number) {
    return null;
}

function handleToggleAddTableRow() {
    addTableRowToggle.value = true
}

function addTableRow() {
    addTableRowToggle.value = false
    return null;
}

function handleDescriptionChange(event: Event, i: number) {
    valuesRef.value[i].description = (event.target as HTMLInputElement).value;
}

function handleValueChange(event: Event, i: number) {
    valuesRef.value[i].value = Number((event.target as HTMLInputElement).value);
}

async function handleDeleteTable() {
    await TauriService.deleteTable(store.getSelectedYYYYMM(), props.name, props.type);
}

</script>

<template>
    <table>
        <h3>{{ name }}</h3>
        <tr>
            <th>Description</th>
            <th>Value</th>
        </tr>
        <tr v-for="(v, index) in values" :key="index+ ' - ' + v.description + ' - ' + v.value">
            <template v-if="editingTableList[index]">
                <td><input type="textarea" :value="v.description" @change="handleDescriptionChange($event, index)"></td>
                <td><input type="textarea" :value="v.value" @change="handleValueChange($event, index)"></td>
                <td><button @click="editTableRow(v, index)">Confirm</button></td>
                <td><button @click="toggleEditingOff(index)">Cancel</button></td>
            </template>
            <template v-else>
                <td>{{ v.description }}</td>
                <td>{{ v.value }}</td>
                <td><button @click="handleEditTableRowToggle(index)">Edit</button></td>
                <td><button @click="deleteTableRow(v, index)">Delete</button></td>
            </template>
        </tr>
        <tr>
            <template v-if="addTableRowToggle">
                <td><input v-model="addTableRowDescription" type="textarea"/></td>
                <td><input v-model="addTableRowValue" type="textarea" /></td>
                <td><button @click="addTableRow">Add</button></td>
            </template>
            <button v-else @click="handleToggleAddTableRow">Add</button>
        </tr>
        <button @click="handleDeleteTable">Delete Table</button>
    </table>
</template>
