import {Injectable} from '@angular/core';

declare var aesjs: any;

export class Crypto {
    private aes: any;
    //private key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    constructor() {
        this.aes = aesjs;
    }

    crypt(data) {
        console.log(data)
        let key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        let textBytes = this.aes.utils.utf8.toBytes(data);
         let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
         let encryptedBytes = aesCtr.encrypt(textBytes);
         let dataCrypt = aesjs.utils.hex.fromBytes(encryptedBytes);
        return dataCrypt;
    }

    decrypt(data) {
        let key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        let encryptedBytes = aesjs.utils.hex.toBytes(data);
        let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        let decryptedBytes = aesCtr.decrypt(encryptedBytes);
        let decryptData = aesjs.utils.utf8.fromBytes(decryptedBytes);
        return decryptData;
    }
}