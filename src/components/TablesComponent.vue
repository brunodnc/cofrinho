<script setup lang="ts">
import InitialTable from './InitialTable.vue';
import TableComponent from './TableComponent.vue';
import { invoke } from '@tauri-apps/api';
import { store } from '@/state/store';
import NewTableComponent from './newTableComponent.vue';
import { ref } from 'vue';


const creatingNewTable = ref(false);

function handleToggleCreatingNewTable() {
    creatingNewTable.value = !creatingNewTable.value;
}

const initialTable = ref({
        values: [
            {
                description: "Salário",
                type: 'in',
                value: 2800,
            },
            {
                description: "Netflix",
                type: 'out',
                value: 100,
            },
        ]
    });
const tables =  {
        "in": [
            {
                "name": "Entrada inicial",
                "values": [
                    {
                        "description": "Salário",
                        "value": 2800
                    }
                ]
            }
        ],
        "out": [
            {
                "name": "Contas",
                "values": [
                    {
                        "description": "Conta de luz",
                        "value": 350
                    },
                    {
                        "description": "Conta de água",
                        "value": 75.22
                    }
                ]
            }
        ]
    }
</script>

<template>
    <button @click="handleToggleCreatingNewTable">Nova Tabela</button>
    <NewTableComponent v-show="creatingNewTable"/>
    <!-- {{ invoke('greet', { name: 'World'}) }} -->
    <h2>Finanças do mês</h2>    
     <InitialTable :initialTable="initialTable" />
     <template v-for="(table, i) in tables.in" :key="i +  ' - ' + table.name">
        <TableComponent :values="table.values" :type="'in'" :name="table.name" />
     </template>
     <template v-for="(table, i) in tables.out" :key="i +  ' - ' + table.name">
        <TableComponent :values="table.values" :type="'out'" :name="table.name" />
     </template>
</template>