import { AccountType } from "../../modal/response/Account";
import { AccountService } from "../../service/AccountService";
import * as axios from "axios";
import api from "../../service/Api";
const error = {
    response: {
        data: {
            status: 500,
            errorCode: 1,
            message: 'test',
            field: 'test',
            timestamp: new Date()
        }
    }
}
describe('Test Account Service', () => {
    const accountService = new AccountService();
    test('Account Service Object should be created', () => {
        expect(accountService).not.toBeNull();
    })

    test('Test Fetch Account with success response', () => {
        api.get = jest.fn((url, config) => {
            return new Promise((resolve, reject) => {
                resolve({ data: {} })
            })
        });
        api.interceptors = jest.fn((arg) => {
            return { use: jest.fn(), eject: jest.fn() }
        })
        accountService.fetchAccounts("1", AccountType.ACCOUNT);
        expect(api.get).toHaveBeenCalledWith("expense/api/v1/bank/1/account/type=ACCOUNT", { "headers": { "pageNo": "0", "size": "10" } });
        accountService.fetchAccounts("2", AccountType.LOAN);
        expect(api.get).toHaveBeenCalledWith("expense/api/v1/bank/2/account/type=LOAN", { "headers": { "pageNo": "0", "size": "10" } });
    });

    test('Test Fetch Account Summary with success response', () => {
        api.get = jest.fn((url, config) => {
            return new Promise((resolve, reject) => {
                resolve({ data: {} })
            })
        });
        api.interceptors = jest.fn((arg) => {
            return { use: jest.fn(), eject: jest.fn() }
        })
        accountService.fetchAccountSummary("1");
        expect(api.get).toHaveBeenCalledWith("expense/api/v1/bank/1/account/summary");
        accountService.fetchAccountSummary("2");
        expect(api.get).toHaveBeenCalledWith("expense/api/v1/bank/2/account/summary");
    });

    test('Test Save Account with success response', () => {
        const account = {};
        api.post = jest.fn((url, data) => {
            return new Promise((resolve, reject) => {
                resolve({ data: {} })
            })
        });
        api.interceptors = jest.fn((arg) => {
            return { use: jest.fn(), eject: jest.fn() }
        })
        accountService.saveAccount("1", AccountType.ACCOUNT, account);
        expect(api.post).toHaveBeenCalledWith("expense/api/v1/bank/1/account/type=ACCOUNT", JSON.stringify(account));
    });

    test('Test Update Account with success response', () => {
        const account = {};
        api.put = jest.fn((url, data) => {
            return new Promise((resolve, reject) => {
                resolve({ data: {} })
            })
        });
        api.interceptors = jest.fn((arg) => {
            return { use: jest.fn(), eject: jest.fn() }
        })
        accountService.updateAccount("1", AccountType.ACCOUNT, account);
        expect(api.put).toHaveBeenCalledWith("expense/api/v1/bank/1/account/type=ACCOUNT", JSON.stringify(account));
    });

    test('Test Delete Account with success response', () => {
        const account = {};
        api.delete = jest.fn((url) => {
            return new Promise((resolve, reject) => {
                resolve({ data: {} })
            })
        });
        api.interceptors = jest.fn((arg) => {
            return { use: jest.fn(), eject: jest.fn() }
        })
        accountService.deleteAccount("1", "1");
        expect(api.delete).toHaveBeenCalledWith("expense/api/v1/bank/1/account/1");
    });

})