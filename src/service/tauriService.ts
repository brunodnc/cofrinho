import type { IFinance } from '@/interfaces/interfaces';
import { readDir, BaseDirectory, exists, writeTextFile, readTextFile, createDir } from '@tauri-apps/api/fs';

export default class TauriService {

  static dataDir = BaseDirectory.AppData;

    static getFilePath = (YYYYMM: string) => `data/${YYYYMM}.json`;

    static createDataFolder = async () => createDir('data', { dir: BaseDirectory.AppData, recursive: true });
    
    static async checkIfItHasPreviousFinanceData() {
        try {
          const entries = await readDir("data", {dir: BaseDirectory.AppData, recursive: true });
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
        const entries = await readDir("data", {dir: BaseDirectory.AppData, recursive: true });
        return entries.map(f => f.name);
    }

    static async YYYYMMJSONExists(YYYYMM: string) {
      const filepath = this.getFilePath(YYYYMM);
      const result = await exists(filepath, { dir: BaseDirectory.AppData})
      return result
    }
  
    static async getCurrentYYYYMMFinancialData(YYYYMM: string): Promise<IFinance | null> {
      try {
      const filePath = this.getFilePath(YYYYMM);
      const fileData = await readTextFile(filePath, { dir: BaseDirectory.AppData})
      return JSON.parse(fileData);
      } catch (error) {
        return null;
      }
    }

    static async saveFinanceData(YYYYMM: string, data: IFinance) {
      await this.createDataFolder();
      const filePath = this.getFilePath(YYYYMM);
      const strData = JSON.stringify(data);
      const result = await writeTextFile(filePath, strData, { dir: BaseDirectory.AppData});
      console.log(result);
    }

}