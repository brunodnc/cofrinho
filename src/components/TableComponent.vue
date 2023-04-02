<script setup lang="ts">
import type { IFinance, IRow, ITable } from '@/interfaces/interfaces';
import TauriService from '@/service/tauriService';
import { store } from '@/state/store';
import { ref } from 'vue';

    
const props = defineProps<{
    type: string,
    name: string,
    values: {description: string, value: number}[],
    }>()

let editingTableList = ref(props.values.map( () => false));
let valuesRef = ref(props.values);
let addTableRowToggle = ref(false);
let addTableRowDescription = ref("")
let addTableRowValue = ref("")

async function editTableRow(name: string, type: string, value: {description: string, value: number}, index: number) {
    editingTableList.value[index] = false;
    let data: any = await TauriService.getCurrentYYYYMMFinancialData(store.getSelectedYYYYMM());
    let selectedTable = null;
    if (type === 'initial') {
        selectedTable = data[type];
    } else {
        selectedTable = data[type]?.find((table: ITable) => table.name === name);
    }
    selectedTable.values = selectedTable.values.filter((v: IRow) => v.description !== value.description)
    selectedTable.values.push(value);
    await TauriService.saveFinanceData(store.getSelectedYYYYMM(), data);
}

function toggleEditingOff(index: number) {
    editingTableList.value[index] = false;
}

function handleEditTableRowToggle(index: number) {
    editingTableList.value[index] = true;
}

function deleteTableRow(row: IRow, index: number) {
    
}

function handleToggleAddTableRow() {
    addTableRowToggle.value = true
}

async function addTableRow(name: string, type: string, value: IRow) {
    addTableRowToggle.value = false
    let data: any = await TauriService.getCurrentYYYYMMFinancialData(store.getSelectedYYYYMM());
    console.log(data);
    let selectedTable = null;
    if (type === 'initial') {
        selectedTable = data[type];    
    } else {
        selectedTable = data[type]?.find((table: ITable) => table.name === name);
    }
    selectedTable.values.push(value);
    console.log(data);
    await TauriService.saveFinanceData(store.getSelectedYYYYMM(), data);
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
                <td><button @click="editTableRow(name, type, v, index)">Confirm</button></td>
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
                <td><button @click="addTableRow(name, type, {description: addTableRowDescription, value: Number(addTableRowValue)})">Add</button></td>
            </template>
            <button v-else @click="handleToggleAddTableRow">Add</button>
        </tr>
        <button @click="handleDeleteTable">Delete Table</button>
    </table>
</template>
