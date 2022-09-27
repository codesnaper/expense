/**
 * @jest-environment jsdom
 */

import BankComponent from "../../component/Bank";
import renderer from 'react-test-renderer';
import {cleanup, fireEvent, render} from '@testing-library/react';

describe('Test Bank Component', () => {

    it('Bank Component should be created.', () => {
        const component = render(
            <BankComponent/>
        );
        expect(component).not.toBeNull();
    })
});