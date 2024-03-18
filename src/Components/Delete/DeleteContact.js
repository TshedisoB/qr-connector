import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { deleteContact } from "../../sqlQueries/sqlQueries";
import { styles } from "./DeleteContact.style";
import { db } from "../ScanQr/ScanQr";

function DeleteContact({ contact }) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleDeleteContact = () => {
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    const email = contact[0].email;

    deleteContact(db, email, (isDeleted) => {
      if (isDeleted) {
        Alert.alert(
          "Success",
          `Contact '${contact[0].name}' deleted successfully.`
        );
        navigation.navigate("Contact List");
      } else {
        Alert.alert(
          "Error",
          `Failed to delete contact '${contact[0].name}'. Please try again.`
        );
      }
    });
    setModalVisible(false);
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.deleteText}
        onPress={handleDeleteContact}
        testID="delete-contact">
        <Text>Delete</Text>
        <Text>Contact</Text>
        <AntDesign name="delete" style={styles.antIcon} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to delete this contact?</Text>
            <View style={styles.deleteButtons}>
              <Button
                onPress={handleCancelDelete}
                title="Cancel"
                color="grey"
                testID="cancel-delete"
              />
              <Button
                onPress={handleConfirmDelete}
                title="Delete"
                color="red"
                testID="confirm-delete"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default DeleteContact;
