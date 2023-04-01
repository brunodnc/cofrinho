import type { IFinance } from '@/interfaces/interfaces';
import { reactive, ref } from 'vue';

export const store = reactive({
    _selectedYYYYMM: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
    getSelectedYYYYMM(): string {
        return this._selectedYYYYMM;
    },
    setSelectedYYYYMM(year: number, month: number): void {
        this._selectedYYYYMM = year + "-" + month;
    },
    setDateToSelectedYYYYMM(date: Date): void {
        this._selectedYYYYMM = date.getFullYear() + "-" + (date.getMonth() + 1);
    }
});

export const financeData = ref<IFinance | null>(null);