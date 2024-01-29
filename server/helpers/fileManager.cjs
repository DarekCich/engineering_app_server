const fs = require('fs/promises');
const CryptoJS = require('crypto-js');
const path = require('path');
const UsersPath = path.join(__dirname, '../../users')
const util = require('util');

// Funkcja do szyfrowania zawartości folderu
module.exports.encryptfile = ((filePath, password)=> {
      // Szyfrujemy zawartość pliku i zapisujemy zaszyfrowany plik
      const fileData = fs.readFileSync(filePath, 'utf8');
      const encryptedData = CryptoJS.AES.encrypt(fileData, password).toString();
      fs.writeFileSync(filePath, encryptedData)
  });

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

function createFolder(path){
  return new Promise((resolve, reject) => {
    let folderPath = path.join(UsersPath, path);
    fs.mkdir(folderPath, (err) => {
      if (err) {
        reject(err); // Jeśli wystąpił błąd podczas tworzenia folderu
      } else {
        resolve(true); // Jeśli folder został pomyślnie utworzony
      }
    });
  });
};

module.exports.createUserFiles = (user, password) => {
  createFolder(user);
  createFolder(path.join(user, 'files'));
  const userData = {
    "username": user,
    "lastLogin": new Date().toString(),
    "role": 'user'
  }
  const UserFilePath = path.join(UsersPath, user, 'option.json')
  fs.writeFile(UserFilePath, userData, (err) => {
    if (err) {
      console.error(`Błąd podczas tworzenia pliku ${file} w folderze ${folder}:`, err);
    } else {
      console.log(`Utworzono plik: ${file} w folderze ${folder}`);
    }
  });
  this.encryptfile(UserFilePath, password);
}

module.exports.returnListOfFiles = (folderName) => {
  return new Promise((resolve, reject) => {
    const folderPath = path.join(UsersPath, folderName);

    fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error('Błąd podczas czytania folderu:', err);
        reject({ error: 'Błąd podczas czytania folderu' });
        return;
      }

      const fileList = [];

      let pendingFiles = files.length;

      if (pendingFiles === 0) {
        resolve(fileList);
        return;
      }

      files.forEach(file => {
        const filePath = path.join(folderPath, file.name);
        const fileDetails = file.name;

        if (file.isDirectory()) {
          returnListOfFiles(path.join(folderName, file.name))
            .then(subFiles => {
              fileList.push({ "name": file.name, "files": subFiles });

              pendingFiles--;
              if (pendingFiles === 0) {
                resolve(fileList);
              }
            })
            .catch(err => {
              reject(err);
            });
        } else {
          fileList.push(fileDetails);
          pendingFiles--;
          if (pendingFiles === 0) {
            resolve(fileList);
          }
        }
      });
    });
  });
};

module.exports.addFile = async (route, file) => {
  const filePath = path.join(UsersPath, route);
  const directoryPath = filePath.substring(0, filePath.lastIndexOf(path.sep) + 1);

  try {
    var tmp = await fs.mkdir(directoryPath, { recursive: true });
    await fs.writeFile(filePath, file, (err)=>
    null);
    return { message: `Utworzono plik: ${filePath}`, status: 200 };
  } catch (err) {
    return { message: `Błąd podczas tworzenia ${filePath}: ${err}`, status: 400 };
  }
};

module.exports.delFile = (route) => {
  filePath = path.join(UsersPath, route)
  fs.rmSync(filePath, (err) => {
    if (err) {
      return {message: `Błąd podczas usuwania pliku pod ścieżką ${filePath}`, status: 400};
    } else {
      return {message: `Usunięto plik znajdujący się pod ścieżką ${filePath}`, status: 200};
    }
  });
};

module.exports.getFile = (route) => {
  return new Promise((resolve,reject) =>{
    filePath = path.join(UsersPath, route)
    fs.readFileSync(route,(err, data)=>{
      if(err){
        reject({message: `błąd odczytu pliku`})
      }  
      else{
        resolve({message: `udało się odczytać plik`, data: data})
      }
    })
  })
};