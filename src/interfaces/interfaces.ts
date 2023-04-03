export interface IRow {
    description: string;
    value: number;
    id: number;
}

export interface ITable {
    name: string;
    values: IRow[]
}

export interface IFinance {
    initial: ITable;
    in: ITable[];
    out: ITable[];
}