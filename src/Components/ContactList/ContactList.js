import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, Image, TouchableOpacity, SectionList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

import { getAllContacts } from "../../sqlQueries/sqlQueries";
import { setCurrentContact } from "../../Redux/actions";
import { db } from "../../Components/ScanQr/ScanQr.js";
import { styles } from "./ContactList.style.js";

const ContactList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [favoritesData, setFavoritesData] = useState([]);
  const [nonFavoritesData, setNonFavoritesData] = useState([]);

  useEffect(() => {
    dispatch(setCurrentContact("invalidContact"));
  }, []);

  useEffect(() => {
    getAllContacts(db, (contacts) => {
      const favorites = contacts.filter((contact) => contact.isFavorite === 1);
      let nonFavorites = contacts.filter((contact) => contact.isFavorite !== 1);

      favorites.sort((a, b) => a.name.localeCompare(b.name));
      nonFavorites.sort((a, b) => a.name.localeCompare(b.name));

      const nonFavoritesSections = nonFavorites.reduce((sections, contact) => {
        const initial = contact.name.charAt(0).toUpperCase();
        const sectionIndex = sections.findIndex(
          (section) => section.title === initial
        );
        if (sectionIndex === -1) {
          sections.push({ title: initial, data: [contact] });
        } else {
          sections[sectionIndex].data.push(contact);
        }
        return sections;
      }, []);

      const combinedSections = [
        { title: "Favorites", data: favorites },
        ...nonFavoritesSections,
      ];

      setFavoritesData(favorites);
      setNonFavoritesData(nonFavoritesSections);
      setData(combinedSections);
    });
  }, [data]);

  const handleContactPress = (contact) => {
    contact = [contact];
    dispatch(setCurrentContact(contact));
    navigation.navigate("Contact Details", {
      barcodeData: contact,
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["purple", "maroon", "purple"]}
        style={styles.barCodeBox}>
        {nonFavoritesData.length === 0 && favoritesData.length === 0 ? (
          <Text style={styles.nullContacts} testID="null-contacts-list">
            No Valid Contact Scanned 😔
          </Text>
        ) : (
          <SectionList
            sections={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleContactPress(item)}>
                <View
                  style={[
                    styles.scannedContacts,
                    item.isFavorite === 1 && styles.favoriteContact,
                  ]}>
                  <Image
                    source={{ uri: item.profilePicLink }}
                    style={styles.profilePic}
                  />
                  <View style={styles.stackInfo}>
                    <View style={styles.nameAndIcon}>
                      <Text style={styles.name}>{item.name}</Text>
                      {item.notes && (
                        <AntDesign name="filetext1" style={styles.fileText} />
                      )}
                    </View>

                    <Text style={styles.status}>{item.status}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => {
              if (section.title === "Favorites" && section.data.length === 0) {
                return null;
              }
              return <Text style={styles.sectionHeader}>{section.title}</Text>;
            }}
          />
        )}
      </LinearGradient>
    </View>
  );
};

export default ContactList;
