const fs = require('fs');
const CryptoJS = require('crypto-js');
const readline = require('readline');
const path = require('path');
const UsersPath = path.join(__dirname, '../../users')
// Funkcja do szyfrowania zawartości folderu
module.exports.encryptFolderContent = ((folderPath, password)=> {
  fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);

    if (fs.lstatSync(filePath).isDirectory()) {
      // Jeśli to jest podfolder, rekurencyjnie szyfrujemy jego zawartość
      encryptFolderContent(filePath, password);
    } else {
      // Szyfrujemy zawartość pliku i zapisujemy zaszyfrowany plik
      const fileData = fs.readFileSync(filePath, 'utf8');
      const encryptedData = CryptoJS.AES.encrypt(fileData, password).toString();
      fs.writeFileSync(filePath, encryptedData);
    }
  });

  console.log(`Zaszyfrowano zawartość folderu: ${folderPath}`);
})

module.exports.findFolder = ((user, password) => {
  const folderPath = path.join(UsersPath, user)
  return new Promise((resolve, reject) => {
    fs.stat(folderPath, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve(false);
        } else {
          reject(err)
        }
      } else {
        if (stats.isDirectory()) {
          resolve(true)
        } else {
          resolve(false);
        }
      }
    });
  }) 
  
})

module.exports.decryptUserData = ((user, password) => {
  return true
})

module.exports.createFolder = (user, password) => {
  return new Promise((resolve, reject) => {
    const folderPath = path.join(UsersPath, user);

    fs.mkdir(folderPath, (err) => {
      if (err) {
        reject(err); // Jeśli wystąpił błąd podczas tworzenia folderu
      } else {
        resolve(true); // Jeśli folder został pomyślnie utworzony
      }
    });
  });
};
