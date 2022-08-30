export class ResponseList<T>{
    Items!: Array<T>;
    Count!: number;
    pageNo!: number;
    pageSize!: number;
}