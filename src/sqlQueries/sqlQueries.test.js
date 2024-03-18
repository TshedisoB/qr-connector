import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("QrCodeTestDB.db");

import {
  createTable,
  insertToDataBase,
  getAllContacts,
  updateFavorites,
  deleteContact,
  addOrUpdateNotes,
} from "./sqlQueries";

jest.mock("expo-sqlite", () => ({
  openDatabase: () => ({
    transaction: (callback) => {
      callback(mockTx);
    },
  }),
}));

const mockTx = {
  executeSql: jest.fn(),
};

describe("createTable", () => {
  it("should create the 'Contacts' table", () => {
    createTable(db);

    expect(mockTx.executeSql).toHaveBeenCalledWith(`
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
    expect(mockTx.executeSql).toHaveBeenCalledTimes(1);
  });
});

describe("insertToDataBase", () => {
  it("should insert a contact if it doesn't already exist", () => {
    const validData = [
      {
        name: "Tshediso Boshiana",
        email: "tshediso.boshiana@umuzi.org",
        profilePicLink: "https://github.com/tshedisoB.png",
        website: "https://tshedisob.github.io/",
        status:
          "Just discovered a hidden gem of a cafe in the heart of the city! ☕ Highly recommend trying their signature caramel latte.",
      },
    ];

    insertToDataBase(db, validData);

    expect(mockTx.executeSql).toHaveBeenCalledWith(
      expect.stringContaining("SELECT id FROM Contacts WHERE email = ?;"),
      [undefined],
      expect.any(Function)
    );
  });
});

describe("getAllContacts", () => {
  it("should retrieve all contacts from the database", () => {
    const mockCallback = jest.fn();

    getAllContacts(db, mockCallback);

    expect(mockTx.executeSql).toHaveBeenCalledWith(
      "SELECT * FROM Contacts ORDER BY isFavorite DESC",
      [],
      expect.any(Function),
      expect.any(Function)
    );
  });
});

describe("updateFavorites", () => {
  it("should update the 'isFavorite' field for a contact in the database", () => {
    const email = "tshediso.boshiana@umuzi.org";
    const isFavorite = true;

    updateFavorites(db, email, isFavorite);

    expect(mockTx.executeSql).toHaveBeenCalledWith(
      "UPDATE Contacts SET isFavorite = ? WHERE email = ?;",
      [!isFavorite, email]
    );
  });
});

describe("deleteContact", () => {
  it("should delete a contact from the 'Contacts' table by email", () => {
    const email = "tshediso.boshiana@umuzi.org";
    const successCallback = jest.fn();

    deleteContact(db, email, successCallback);

    expect(mockTx.executeSql).toHaveBeenCalledWith(
      "DELETE FROM Contacts WHERE email = ?;",
      [email],
      expect.any(Function),
      expect.any(Function)
    );
  });
});

describe("addOrUpdateNotes function", () => {
  it("should update notes for an existing contact", () => {
    const email = "tshediso.boshiana@umuzi.org";
    const existingNotes = "Initial notes";
    const newNotes = "Updated notes";

    const mockResultSet = {
      rows: {
        item: jest.fn(() => ({ email, notes: existingNotes })),
      },
    };

    mockTx.executeSql.mockImplementation((sql, params, successCallback) => {
      if (sql.includes("SELECT * FROM Contacts WHERE email = ?;")) {
        successCallback(null, mockResultSet);
      } else if (
        sql.includes("UPDATE Contacts SET notes = ? WHERE email = ?;")
      ) {
        expect(params).toEqual([newNotes, email]);
      }
    });

    addOrUpdateNotes(db, email, newNotes);

    expect(mockTx.executeSql).toHaveBeenCalledWith(
      "SELECT * FROM Contacts WHERE email = ?;",
      [email],
      expect.any(Function)
    );
  });
});
