import { readDir, BaseDirectory } from '@tauri-apps/api/fs';
import { store } from '../state/store'

export default class TauriService {
    // private const resourceDirPath = await resourceDir()
    
    static async checkIfItHasPreviousFinanceData() {
        const today = store.getSelectedYYYYMM();
        try {
          const entries = await readDir("data", {dir: BaseDirectory.Resource, recursive: true });
          return entries.reduce((acc, cur) => {
            const split: any = cur.name?.split(".")[0].split("-");
            const year = Number(split[0]);
            const month = Number(split[1])

            const accSplit = acc.name?.split(".")[0].split("-");
            const accYear = Number(split[0]);
            const accMonth = Number(split[1]);

            const accDate = new Date(new Date(new Date().setFullYear(accYear)).setMonth(accMonth - 1));
            const curDate = new Date(new Date(new Date().setFullYear(year)).setMonth(month - 1));

            if (curDate.getTime() < accDate.getTime()) return cur;
            return acc
        }, entries[0])
        } catch ({ message }) {
          console.error(message);
          return false;

        }
    }

    static async getAllFinanceData() {
        const entries = await readDir("data", {dir: BaseDirectory.Resource, recursive: true });
        return entries.map(f => f.name);
    }

}