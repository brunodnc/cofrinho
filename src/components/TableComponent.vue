<script setup lang="ts">
import type { IFinance, IRow, ITable } from '@/interfaces/interfaces';
import TauriService from '@/service/tauriService';
import { store } from '@/state/store';
import { ref, computed } from 'vue';

    
const props = defineProps<{
    type: string,
    name: string,
    values: IRow[],
    }>()

let editingTableList = ref(props.values.map( () => false));
let valuesRef = ref(props.values);
let addTableRowToggle = ref(false);
let addTableRowDescription = ref("")
let addTableRowValue = ref("")

let computedTotal = computed(() => valuesRef.value
    .map((v) => v.value)
    .reduce((acc, cur) => acc + Number(cur), 0).toFixed(2));

async function editTableRow(name: string, type: string, value: IRow, index: number) {
    editingTableList.value[index] = false;
    let data: any = await TauriService.getCurrentYYYYMMFinancialData(store.getSelectedYYYYMM());
    let selectedTable = null;
    if (type === 'initial') {
        selectedTable = data[type];
    } else {
        selectedTable = data[type]?.find((table: ITable) => table.name === name );
    }
    selectedTable.values = selectedTable.values.filter((v: IRow) => v.id !== value.id)
    selectedTable.values.push(value);
    valuesRef.value.find((v) => v.id === value.id).value = value.value;
    valuesRef.value.find((v) => v.id === value.id).description = value.description;
    await TauriService.saveFinanceData(store.getSelectedYYYYMM(), data);
}

function toggleEditingOff(index: number) {
    editingTableList.value[index] = false;
}

function handleEditTableRowToggle(index: number) {
    editingTableList.value[index] = true;
}

async function deleteTableRow(name: string, type: string, id: number, index: number) {
    editingTableList.value[index] = false;
    let data: any = await TauriService.getCurrentYYYYMMFinancialData(store.getSelectedYYYYMM());
    let selectedTable = null;
    if (type === 'initial') {
        selectedTable = data[type];
    } else {
        selectedTable = data[type]?.find((table: ITable) => table.name === name );
    }

    selectedTable.values = selectedTable.values.filter((v: IRow) => v.id !== id)
    valuesRef.value = valuesRef.value.filter((v) => v.id !== id);
    await TauriService.saveFinanceData(store.getSelectedYYYYMM(), data);
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
    valuesRef.value.push(value);
    await TauriService.saveFinanceData(store.getSelectedYYYYMM(), data);
}

function handleDescriptionChange(event: Event, id: number) {
    valuesRef.value.find(v => v.id === id).description = (event.target as HTMLInputElement).value;
}

function handleValueChange(event: Event, id: number) {
    valuesRef.value.find(v => v.id === id).value = Number((event.target as HTMLInputElement).value);
}

async function handleDeleteTable() {
    await TauriService.deleteTable(store.getSelectedYYYYMM(), props.name, props.type);
}

</script>

<template>
    <table class="table">
        <h3>{{ name }}</h3>
        <h3>Total:{{ computedTotal || 0 }}</h3>
        <tr>
            <th>Description</th>
            <th>Value</th>
        </tr>
        <tr v-for="(v, index) in values" :key="v.id">
            <template v-if="editingTableList[index]">
                <td><input type="textarea" :value="v.description" @change="handleDescriptionChange($event, v.id)"></td>
                <td><input type="textarea" :value="v.value" @change="handleValueChange($event, v.id)"></td>
                <td><button @click="editTableRow(name, type, v, index)">Confirm</button></td>
                <td><button @click="toggleEditingOff(index)">Cancel</button></td>
            </template>
            <template v-else>
                <td>{{ v.description }}</td>
                <td>{{ v.value }}</td>
                <td><button @click="handleEditTableRowToggle(index)">Edit</button></td>
                <td><button @click="deleteTableRow(name, type, v.id, index)">Delete</button></td>
            </template>
        </tr>
        <tr>
            <template v-if="addTableRowToggle">
                <td><input v-model="addTableRowDescription" type="textarea"/></td>
                <td><input v-model="addTableRowValue" type="textarea" /></td>
                <td><button @click="addTableRow(name, type, { id: values.length + 1, description: addTableRowDescription, value: Number(addTableRowValue)})">Add</button></td>
            </template>
            <button v-else @click="handleToggleAddTableRow">Add</button>
        </tr>
        <button @click="handleDeleteTable">Delete Table</button>
    </table>
</template>

<style>
    .table {
        border: 1px solid black;
        width: 90vw;
        margin: 0 auto;
    }

    h3 {
        word-wrap: normal;
        white-space: nowrap;
        text-align: center;
    }

    td {
        word-wrap: break-word;
        white-space: normal;
    }
</style>