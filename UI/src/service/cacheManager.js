import * as localforage from 'localforage'
export class CacheManager{

    constructor(){
        localforage.config({
            name: 'expense-management',
            size: 4980736,
        });
    }

    deleteKey(key){
        localforage.removeItem(key);
    }

    fetchData(key, url, option){
        return new Promise((resolve, reject) => {
            localforage.getItem(key)
            .then(value => {
                if(value){
                    resolve(JSON.parse(value));
                } else{
                    fetch(url, option)
                    .then(res => res.json())
                    .then(res=>{
                        localforage.setItem(key, JSON.stringify(res));
                        resolve(res);
                    })
                    .catch(err => reject(err));
                }
            })
            .catch(err => reject(err));
        });
    }
}