import { reactive } from 'vue';

export const store = reactive({
    selectedYYYYMM: "2023-3",
    setSelectedYYYYMM(year: number, month: number) {
        this.selectedYYYYMM = year + "-" + month;
    }

});