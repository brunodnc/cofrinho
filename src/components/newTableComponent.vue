<template>
    <h3>Nova tabela</h3>
    <form>
        <label for="tableNameInput">Nome da tabela: </label><input id="tableNameInput" v-model="tableName">
        <label>Tipo: </label> <select v-model="tableType">
            <option disabled value="">Selecionar</option>
            <option>Tabela Inicial</option>
            <option>Entrada</option>
            <option>Saída</option>
        </select>
    </form>
    <button @click="handleCreateTable">Criar tabela</button>
</template>

<script setup lang="ts">


let tableName = "";
let tableType = "";

function handleCreateTable() {
    if (tableType.length < 1 || tableName.length < 1) {
        alert("Preencha o formulário corretamente");
        return null;
    }
    // save table with tauri rust
    return null;
}
</script>