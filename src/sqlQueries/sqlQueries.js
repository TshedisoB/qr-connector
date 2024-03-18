export const createTable = (db) => {
  db.transaction((tx) => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        name TEXT,
        profilePicLink TEXT,
        status TEXT,
        website TEXT,
        isFavorite BOOLEAN,
        notes TEXT
      )
    `);
  });
};

export const insertToDataBase = (db, data) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT id FROM Contacts WHERE email = ?;",
      [data.email],
      (_, resultSet) => {
        if (resultSet.rows.length === 0) {
          tx.executeSql(
            "INSERT INTO Contacts (email, name, profilePicLink, status, website, isFavorite, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              data.email,
              data.name,
              data.profilePicLink,
              data.status,
              data.website,
              data.isFavorite,
              data.notes,
            ]
          );
        }
      }
    );
  });
};

export const getAllContacts = (db, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM Contacts ORDER BY isFavorite DESC",
      [],
      (_, resultSet) => {
        const contacts = resultSet.rows;
        const contactsArray = [];
        for (let i = 0; i < contacts.length; i++) {
          contactsArray.push(contacts.item(i));
        }
        callback(contactsArray);
      },
      () => {
        callback([]);
      }
    );
  });
};

export const updateFavorites = (db, email, isFavorite) => {
  db.transaction((tx) => {
    tx.executeSql("UPDATE Contacts SET isFavorite = ? WHERE email = ?;", [
      !isFavorite,
      email,
    ]);
  });
};

export const deleteContact = (db, email, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM Contacts WHERE email = ?;",
      [email],
      (_, resultSet) => {
        const rowsAffected = resultSet.rowsAffected;
        callback(rowsAffected > 0);
      },
      () => {
        callback(false);
      }
    );
  });
};

export const addOrUpdateNotes = (db, email, notes) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM Contacts WHERE email = ?;",
      [email],
      (_, resultSet) => {
        const existingContact = resultSet.rows.item(0);

        if (existingContact) {
          const updatedContact = { ...existingContact, notes };

          tx.executeSql("UPDATE Contacts SET notes = ? WHERE email = ?;", [
            updatedContact.notes,
            updatedContact.email,
          ]);
        }
      }
    );
  });
};
