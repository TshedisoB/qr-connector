import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { updateFavorites, getAllContacts } from "../../sqlQueries/sqlQueries";
import { checkBoolValue } from "../../utils/helper";
import { styles } from "./Favorites.style";
import { db } from "../ScanQr/ScanQr";

const Favorites = ({ contact }) => {
  const [data, setData] = useState([]);
  const [isFavorite, setIsFavorite] = useState();
  const [favoriteBoolStatus, setFavoriteBoolStatus] = useState();

  useEffect(() => {
    getAllContacts(db, (data) => {
      setData(data);
    });

    const scannedEmail = contact[0].email;
    const matchingUser = data.find((user) => user.email === scannedEmail);

    if (matchingUser) {
      setIsFavorite(matchingUser.isFavorite);
    }

    setFavoriteBoolStatus(checkBoolValue(isFavorite));
  }, [data, isFavorite, favoriteBoolStatus]);

  const handleAddToFavorites = () => {
    const dbEmails = [];
    let email = contact[0].email;

    data.forEach((data) => {
      dbEmails.push(data.email);
    });

    if (dbEmails.includes(email)) {
      updateFavorites(db, email, favoriteBoolStatus);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleAddToFavorites}
        style={styles.button}
        testID="favorite-status">
        {favoriteBoolStatus ? (
          <>
            <Text style={styles.buttonText}>Remove from favorites</Text>
            <AntDesign name="star" style={styles.antIcon} />
          </>
        ) : (
          <>
            <Text style={styles.buttonText}>Add to favorites</Text>
            <AntDesign name="staro" style={styles.antIconInactive} />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Favorites;
