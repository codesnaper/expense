import * as axios from "axios";
import api from "../../service/Api";
import { BankService } from "../../service/BankService";
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
describe('Test Bank Service', () => {
    const bankService = new BankService();
    test('Bank Service Object should be created', () => {
        expect(bankService).not.toBeNull();
    })

    test('Test Fetch Bank with success response', () => {
        api.get = jest.fn((url, config) => {
            return new Promise((resolve, reject) => {
                resolve({ data: {} })
            })
        });
        api.interceptors = jest.fn((arg) => {
            return { use: jest.fn(), eject: jest.fn() }
        })
        bankService.fetchBank("1");
        expect(api.get).toHaveBeenCalledWith("expense/api/v1/bank/1");
    });

    test('Test Fetch Banks with success response', () => {
        api.get = jest.fn((url, config) => {
            return new Promise((resolve, reject) => {
                resolve({ data: {} })
            })
        });
        api.interceptors = jest.fn((arg) => {
            return { use: jest.fn(), eject: jest.fn() }
        })
        bankService.fetchBanks(0,10);
        expect(api.get).toHaveBeenCalledWith("expense/api/v1/bank/", { "headers": { "pageNo": "0", "size": "10" } });
    });

    test('Test Save Bank with success response', () => {
        api.post = jest.fn((url, data) => {
            return new Promise((resolve, reject) => {
                resolve({ data: {} })
            })
        });
        api.interceptors = jest.fn((arg) => {
            return { use: jest.fn(), eject: jest.fn() }
        })
        bankService.addBank({});
        expect(api.post).toHaveBeenCalledWith("expense/api/v1/bank/", JSON.stringify({}));
    });

    test('Test Update Bank with success response', () => {
        api.put = jest.fn((url, data) => {
            return new Promise((resolve, reject) => {
                resolve({ data: {} })
            })
        });
        api.interceptors = jest.fn((arg) => {
            return { use: jest.fn(), eject: jest.fn() }
        })
        bankService.updateBank({});
        expect(api.put).toHaveBeenCalledWith("expense/api/v1/bank/", JSON.stringify({}));
    });

    test('Test Delete Bank with success response', () => {
        api.delete = jest.fn((url, data) => {
            return new Promise((resolve, reject) => {
                resolve({ data: {} })
            })
        });
        api.interceptors = jest.fn((arg) => {
            return { use: jest.fn(), eject: jest.fn() }
        })
        bankService.deleteBank('1');
        expect(api.delete).toHaveBeenCalledWith("expense/api/v1/bank/1");
    })

    
})