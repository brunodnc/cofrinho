import type { IFinance, ITable } from '@/interfaces/interfaces';
import { financeData } from '@/state/store';
import { readDir, BaseDirectory, exists, writeTextFile, readTextFile, createDir, removeFile } from '@tauri-apps/api/fs';
import { financeDataAreEqual } from './globalService';

export default class TauriService {

  static dataDir = BaseDirectory.AppData;

  static getFilePath = (YYYYMM: string) => `data/${YYYYMM}.json`;

  static createDataFolder = async () => createDir('data', { dir: BaseDirectory.AppData, recursive: true });

  static async hasInitialTable(YYYYMM: string) {
    const data: IFinance =  await this.getCurrentYYYYMMFinancialData(YYYYMM) as IFinance;
    if (data?.initial?.name) {
      return true;
    }
    return false;
  }
  
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
      console.log(entries);
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
    financeData.value = data;
    await writeTextFile(filePath, strData, { dir: BaseDirectory.AppData});
  }

  static async removeFinanceData(YYYYMM: string) {
    const filePath = this.getFilePath(YYYYMM);
    financeData.value = null;
    await removeFile(filePath, { dir: BaseDirectory.AppData });
  };

  static async deleteTable(YYYYMM: string, name: string, type: string) {
    const filePath = this.getFilePath(YYYYMM);
    const strData  = await readTextFile(filePath, { dir: BaseDirectory.AppData});
    const data = JSON.parse(strData);
    if (type !== 'initial') {
      data[type] = data[type].filter((table: ITable) => table.name !== name);
    } else {
      data.initial = {};
    }
    const emptyData: IFinance = {initial:{} as ITable, in:[], out:[]};
    if (financeDataAreEqual(data, emptyData)) {
      await this.removeFinanceData(YYYYMM);
    } else {
      await this.saveFinanceData(YYYYMM, data);
    }
  }

}