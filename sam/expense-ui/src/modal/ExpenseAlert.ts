import * as PropTypes from 'prop-types';

export enum AlertType{
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info'
}

export interface ExpenseAlertPropsType{
    message: typeof PropTypes.string.isRequired;
    type: typeof PropTypes.object.isRequired;
}

export interface ExpenseAlertProp{
    message: string;
    type: AlertType;
    open: boolean
}

export interface AlertContextProps  { 
    children: React.ReactNode
 }

 export type ExpenseAlertModal = {
    setAlert?: (message: string, type: AlertType) => void
 }
