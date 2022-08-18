import { useState } from "react";
import { Header, HeaderDisplay, Headers } from "../modal/Header";
export const useDataSet = <T extends Record<keyof T, any> = {}>(options?: {
    dataHeader: Headers<T>;
    data: T[];
    loadData?: (data: Array<Partial<T>>) => void
  }) => {

    const[header, setHeader] = useState<Header[]>();
    const[data, setData] = useState<Array<Partial<T>>>();

    const getData = () => {
        for (const key in options?.dataHeader) {
            const header: Header| undefined = options?.dataHeader[key];
            if(header?.display !== HeaderDisplay.HIDDEN){
               
            }
        }
        return [];
    }

    const applyFilter = (headerName: keyof T, operator: number, value?: string) => {

    }

    const loadData = (data: Array<Partial<T>>) => {
        setData(data);
    }

    return {
        header,
        data,
        applyFilter,
      };

  }