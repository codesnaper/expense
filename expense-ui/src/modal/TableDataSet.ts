import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import { Header, HeaderDisplay, Headers } from "./Header";

export enum Operator {
    EQUAL = 'equals',
    CONTAINS = 'contains',
    NOT_NULL = 'not null',
    IS_EMPTY = 'empty',
}

export interface TableAction {
    show: boolean,
    edit: boolean,
    delete: boolean,
    add: boolean
}

export class TableDataSet<T extends object>{
    headers: Headers<T>;
    rows: Array<T>;
    filterRow: Array<T>;
    action!: TableAction;
    rowBGColor?: (value: object) => string;
    rowTextColor?: (value: object) => string;

    constructor(headers: Headers<T>, rows: Array<T>, rowBgColor?: (value: object) => string, rowTextColor?: (value: object) => string) {
        this.headers = headers;
        this.rows = rows;
        this.filterRow = rows;
        this.rowBGColor = rowBgColor;
        this.rowTextColor = rowTextColor;
    }

    getColumns(): Array<Header> {
        const columns: Array<Header> = new Array<Header>();
        for (const key in this.headers) {
            if (this.headers[key].display === HeaderDisplay.NONE && this.headers[key].isVisible === true) {
                columns.push(this.headers[key]);
            }
        }
        return columns;
    }

    getAllColumns(): Array<Header> {
        const columns: Array<Header> = new Array<Header>();
        for (const key in this.headers) {
            if (this.headers[key].display === HeaderDisplay.NONE) {
                columns.push(this.headers[key]);
            }
        }
        return columns;
    }

    toggleHiddenColumn(header: Header) {
        for (const key in this.headers) {
            if (this.headers[key].alias === header.alias) {
                this.headers[key].isVisible = header.isVisible;
            }
        }
    }

    getRows(): Array<Array<string>> {
        const rows: Array<Array<string>> = new Array();
        this.filterRow.forEach(row => {
            const data: Array<string> = new Array();
            for (const key in this.headers) {
                if (this.headers[key].display === HeaderDisplay.NONE && this.headers[key].isVisible === true) {
                    data.push(`${row[key]}`)
                }
            }
            rows.push(data);
        })
        return rows;
    }

    get<K extends keyof T>(key: K, data: T): T[K] {
        return data[key];
    }

    private containsData (datas:T[] , data: T, key: keyof T): boolean {
        return datas.some(d => {
            if(d[key] === data[key] )
                return true;
            return false;
        })
    }

    getIndexedData(index: number): T {
        return this.filterRow[index];
    }

    applyFilter = (header: string, operator: Operator, value?: string) => {
        this.filterRow = new Array<T>;
        this.rows.forEach((row: T) => {
            for (const key in this.headers) {
                if (header === this.headers[key].alias) {
                    switch (operator) {
                        case Operator.EQUAL:
                            if (`${row[key]}` === value && !this.containsData(this.filterRow, row, key)) {
                                this.filterRow.push(row);
                            }
                            break;

                        case Operator.CONTAINS:
                            if (`${row[key]}`.indexOf(`${value}`) !== -1 && !this.containsData(this.filterRow, row, key)) {
                                this.filterRow.push(row);
                            }
                            break;

                        case Operator.IS_EMPTY:
                            if ((`${row[key]}` === '' || `${row[key]}` === undefined || `${row[key]}` === null) && !this.containsData(this.filterRow, row, key)) {
                                this.filterRow.push(row);
                            }
                            break;

                        case Operator.NOT_NULL:
                            if ((`${row[key]}` === '' || `${row[key]}` === undefined || `${row[key]}` === null) && !this.containsData(this.filterRow, row, key)) {
                                this.filterRow.push(row);
                            }
                            break;
                    }
                }
            }
        })

    }

    getRowStyle = (row: object): SxProps<Theme> => {
        const style:SxProps<Theme> = {"color": "inherit", backgroundColor: "inherit"};
        if(this.rowBGColor){
            style.backgroundColor = this.rowBGColor(row);
        } else if (this.rowTextColor) {
            style.color = this.rowTextColor(row);
        }
        return style;
    }
}