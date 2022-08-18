import React, { useEffect } from "react";
import { AlertType } from "../../modal/ExpenseAlert";
import { UserContext, AlertContext } from "../../context";

export default function Home(){
    const alert = React.useContext(AlertContext);
    const user = React.useContext(UserContext);

    useEffect(() => {
        alert.setAlert?.(`Welcome ${user.name}!!!`,AlertType.SUCCESS);
    }, [])
    
    
    return(<>
    </>);
}