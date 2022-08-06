import { useContext } from 'react';
import AlertContext from './alertProvider';


const useAlert = () => useContext(AlertContext);

export default useAlert;