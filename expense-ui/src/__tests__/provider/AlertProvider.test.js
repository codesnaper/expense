
import { render } from 'react-dom';
import renderer from 'react-test-renderer';
import BankComponent from '../../component/Bank';
import { AlertType } from '../../modal/ExpenseAlert';
import { AlertContextProvider } from '../../provider/AlertProvider';

describe('Test Alert Provider', () => {
    it('Test AlertProvider Loaded', () => {
        const component = renderer.create(
            <AlertContextProvider>
                <h1>Test Alert</h1>
            </AlertContextProvider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    // it('Test AlertPorvider props', () => {
    //     let tree = component.toJSON();
    //     tree.props.message='Test Alert Message';
    //     tree.props.alertType = AlertType.ERROR;
    //     tree.props.open = true;
    // })

});