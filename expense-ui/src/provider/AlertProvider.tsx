import * as React from "react";
import { AlertContextProps, AlertType } from "../modal/ExpenseAlert";
import ExpenseAlert from "../component/ExpenseAlert";
import { AlertContext } from "../context";
import { isTypeAssertionExpression } from "typescript";


const AlertContextProvider: any = (props: AlertContextProps) => {
    const [message, setMessage] = React.useState<string>('');
    const [alertType, setAlertType] = React.useState<AlertType>(AlertType.SUCCESS);
    const [open, setOpen] = React.useState<boolean>(false);

    const setAlert = (message: string, type: AlertType): void => {
        setMessage(message);
        setAlertType(type);
        setOpen(true);
        setTimeout(()=> {
            setOpen(false);
        }, 2000);
    }
// notisnack
    return (
        <AlertContext.Provider value={{setAlert}}>
            <ExpenseAlert open={open} message={message} type={alertType}></ExpenseAlert>
            {props.children}
        </AlertContext.Provider>
    );
};


export { AlertContextProvider };