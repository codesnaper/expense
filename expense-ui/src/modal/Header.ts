export enum HeaderType{
    boolean= 'boolean',
    date = 'date',
    string = 'string',
    tag = 'tag',
    number = 'number',
    custom = 'custom',
    currency = 'currency'
}

export enum HeaderDisplay{
    HIDDEN = 'hidden',
    NONE = 'none'
}

export interface Header{
    alias?: string;
    isPrimaryKey?: boolean;
    isVisible?: boolean;
    type?: HeaderType;
    display?: HeaderDisplay
    customDisplay?: (value: object) => string;
}

export type Headers<T extends {}> = Record<keyof T, Header>;