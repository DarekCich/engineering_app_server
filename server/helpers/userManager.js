
//----------------------------------------------------------------------\\
// Potrzebne importy 
import { createUserFiles, findFolder, decryptUserData } from "./fileManager.cjs";

//----------------------------------------------------------------------\\

// funkcje do ubsługi użytkowników
/**
 * Rejestruje użytkownika.
 * 
 * @param {String} username - Nazwa użytkownika do zarejestrowania.
 * @param {String} password - Hasło użytkownika.
 * @returns {Object} Obiekt zawierający informacje o wyniku operacji.
 * @returns {String} message - Komunikat informacyjny.
 * @returns {Number} code - Kod wyniku operacji.
 *    - 0: Rejestracja przebiegła pomyślnie.
 *    - 1: Użytkownik o podanej nazwie już istnieje.
 *    - 2: Nie udało się stworzyć konta dla użytkownika.
 *    - 3: Wystąpił ogólny błąd podczas rejestracji.
 */
export async function registerUser(username, password) {
  try {
    const folderExists = await findFolder(username, password);
    
    if (folderExists) {
      return {
        message: `Użytkownik o nazwie ${username} już istnieje`,
        code: 1
      };
    } else {
      const folderCreated = await createUserFiles(username, password);
      if (folderCreated) {
        return {
          message: `Pomyślnie zarejestrowano użytkownika ${username}`,
          code: 0
        };
      } else {
        return {
          message: `Nie udało się utworzyć konta dla użytkownika o nazwie ${username}`,
          code: 2
        };
      }
    }
  } catch (error) {
    // Obsługa błędów, np. w razie problemów z findFolder lub createFolder
    console.error('Wystąpił błąd:', error);
    return {
      message: 'Wystąpił błąd podczas rejestracji użytkownika',
      code: 3
    };
  }
}

//----------------------------------------------------------------------\\

/**
 * Loguje użytkownika na podstawie podanych danych.
 * 
 * @param {String} username - Nazwa użytkownika.
 * @param {String} password - Hasło użytkownika.
 * 
 * @returns {Object} Obiekt zawierający informacje o wyniku operacji.
 * @returns {String} message - Komunikat informacyjny.
 * @returns {Number} code - Kod wyniku operacji.
 *    - 0: Pomyślne zalogowanie użytkownika.
 *    - 1: Użytkownik o podanej nazwie nie istnieje.
 *    - 2: Błędne hasło lub błąd podczas logowania.
 *    - 3: Wystąpił ogólny błąd podczas logowania.
 */
export async function loginUser(username, password) {
  try {
    // Sprawdzamy czy użytkownik istnieje
    const userExists = await findFolder(username, password);

    if (!userExists) {
      return {
        message: `Użytkownik o nazwie ${username} nie istnieje`,
        code: 1,
      };
    } else {
      const loginSuccessful = decryptUserData(username, password);

      if (loginSuccessful) {
        return {
          message: `Pomyślnie zalogowano użytkownika ${username}`,
          code: 0,
        };
      } else {
        return {
          message: `Błędne hasło lub wystąpił błąd podczas logowania`,
          code: 2,
        };
      }
    }
  } catch (error) {
    // Obsługa błędów, np. w razie problemów z findFolder lub decryptUserData
    console.error('Wystąpił błąd:', error);
    return {
      message: 'Wystąpił ogólny błąd podczas logowania użytkownika',
      code: 3,
    };
  }
}


export const changePassword = ((username, oldPassword, newPassword)=>{

})

export const deleteUser = ((username, password)=>{

})

export const publicFile = ((username, password, fileName)=>{

})


