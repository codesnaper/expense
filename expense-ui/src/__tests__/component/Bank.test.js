/**
 * @jest-environment jsdom
 */
import BankComponent from "../../component/Bank";
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { BankService } from "../../service/BankService";
import { ServiceContextProvider } from "../../provider/ServiceContext";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('Bank Component', () => {

    // jest.spyOn(new BankService(), 'fetchBanks').mockImplementation((pageNo, pageSize) => {
    //     console.log('fetch shubham')
    //     return Promise.resolve({
    //         Items: {
    //             name: "Test Bank",
    //             location: 'India',
    //             currency: 'INR',
    //             tags: [
    //                 {
    //                     name: 'Test Tag',
    //                     description: 'Sample Test Tag',
    //                     ID: 123
    //                 }
    //             ],
    //             ID: 1,
    //             creditAmount: 0,
    //             debitAmount: 0,
    //             accounts: 0,
    //             holdAmount: 0,
    //             totalAccounts: 0
    //         },
    //         Count: 1,
    //         pageNo: pageNo,
    //         pageSize: pageSize
    //     })
    // })
    it('Test Bank Component', async () => {
        await act(() => {
            render(<ServiceContextProvider><BankComponent /></ServiceContextProvider>, container);
        });
    })

});