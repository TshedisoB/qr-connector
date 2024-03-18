import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, TextInput, Button } from "react-native";

import { addOrUpdateNotes } from "../../sqlQueries/sqlQueries";
import { setCurrentContact } from "../../Redux/actions";
import { styles } from "./Notes.style.js";
import { db } from "../ScanQr/ScanQr";

const Notes = ({ contact }) => {
  const [notes, setNotes] = useState(contact[0].notes);
  const [originalNotes, setOriginalNotes] = useState(contact[0].notes);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const updatedContact = [{ ...contact[0], notes }];
    dispatch(setCurrentContact(updatedContact));
  }, [notes]);

  useEffect(() => {
    setNotes(contact[0].notes);
    setOriginalNotes(contact[0].notes);
  }, [contact]);

  useEffect(() => {
    if (!isEditing) {
      addOrUpdateNotes(db, contact[0].email, notes);
    }
  }, [isEditing, contact, notes]);

  const handleSaveNotes = () => {
    setIsEditing(false);
    setOriginalNotes(notes);
  };

  const handleCancelEdit = () => {
    setNotes(originalNotes);
    setIsEditing(false);
  };

  const handleNotesChange = (text) => {
    setNotes(text);
    setIsEditing(text !== originalNotes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Additional Contact Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="You can make notes here..."
        value={notes}
        onChangeText={handleNotesChange}
        multiline
      />
      {isEditing && (
        <View style={styles.buttonsContainer}>
          <Button title="Cancel" onPress={handleCancelEdit} />
          <Button title="Save" onPress={handleSaveNotes} />
        </View>
      )}
    </View>
  );
};

export default Notes;
