import CryptoJS from 'crypto-js';

const secretKey = 'minTask';

const encrypt = data => {
 const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
 return ciphertext;
};

const decrypt = data => {
 const bytes = CryptoJS.AES.decrypt(data, secretKey);
 const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
 try {
  return JSON.parse(decryptedData);
 } catch (error) {
  console.error('Decryption Error:', error);
  return null;
 }
};

const storeEncryptedData = (key, data) => {
 const encryptedData = encrypt(data);
 sessionStorage.setItem(key, encryptedData);
};

const getDecryptedData = key => {
 const encryptedData = sessionStorage.getItem(key);
 if (encryptedData) {
  return decrypt(encryptedData);
 } else {
  return null;
 }
};

export { encrypt, decrypt, storeEncryptedData, getDecryptedData };
