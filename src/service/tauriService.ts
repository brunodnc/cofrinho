import type { IFinance } from '@/interfaces/interfaces';
import { readDir, BaseDirectory, exists, writeTextFile, readTextFile } from '@tauri-apps/api/fs';

export default class TauriService {

    static getFilePath = (YYYYMM: string) => `data/${YYYYMM}.json`
    
    static async checkIfItHasPreviousFinanceData() {
        try {
          const entries = await readDir("data", {dir: BaseDirectory.Resource, recursive: true });
          return entries.reduce((acc, cur) => {
            const split: any = cur.name?.split(".")[0].split("-");
            const year = Number(split[0]);
            const month = Number(split[1])

            const accSplit: any = acc.name?.split(".")[0].split("-");
            const accYear = Number(accSplit[0]);
            const accMonth = Number(accSplit[1]);

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

    static async YYYYMMJSONExists(YYYYMM: string) {
      const filepath = this.getFilePath(YYYYMM);
      const result = await exists(filepath, { dir: BaseDirectory.Resource})
      return result
    }
  
    static async createYYYYMMJSON(YYYYMM: string, data: IFinance) {
      const dataStr = JSON.stringify(data);
      await writeTextFile(this.getFilePath(YYYYMM), dataStr, { dir: BaseDirectory.Resource });
    }
  
    static async getCurrentYYYYMMFinancialData(YYYYMM: string) {
      const filePath = this.getFilePath(YYYYMM);
      const fileData = await readTextFile(filePath, { dir: BaseDirectory.Resource})
      return JSON.parse(fileData);
    }

    static async saveFinanceData(YYYYMM: string, data: IFinance) {
      const filePath = this.getFilePath(YYYYMM);
      const strData = JSON.stringify(data);
      await writeTextFile(filePath, strData, { dir: BaseDirectory.Resource});
    }

}