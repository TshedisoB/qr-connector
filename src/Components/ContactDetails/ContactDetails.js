import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { NativeBaseProvider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "@react-native-material/core";

import InvalidScan from "../InvalidScan/InvalidScan";
import Favorites from "../Favorites/Favorites";
import DeleteContact from "../Delete/DeleteContact";
import Notes from "../Notes/Notes";
import { setCurrentContact } from "../../Redux/actions";
import { styles } from "./ContactDetails.style";

const ContactDetails = ({ route }) => {
  const dispatch = useDispatch();
  const { barcodeData } = route.params;

  useEffect(() => {
    dispatch(setCurrentContact(barcodeData));
  }, [barcodeData]);

  if (barcodeData === "Invalid QR Code") {
    return <InvalidScan />;
  }

  const handleWebsiteLinkPress = () => {
    if (barcodeData) {
      Linking.openURL(barcodeData[0].website);
    }
  };

  const handleProfileLinkPress = () => {
    if (barcodeData) {
      Linking.openURL(barcodeData[0].profilePicLink);
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={["purple", "maroon", "purple"]}
          style={styles.barCodeBox}>
          <View style={styles.favoriteDelete}>
            <Favorites contact={barcodeData} />
            <DeleteContact contact={barcodeData} />
          </View>

          <View style={styles.displayData}>
            <View style={styles.dataRow}>
              <MaterialIcons name="person" style={styles.icon} />
              <View style={styles.dataTextContainer}>
                <Text style={styles.dataText}>Name</Text>
                <Text style={styles.dataTextInfo}>{barcodeData[0].name}</Text>
              </View>
            </View>
            <Divider style={styles.divider} leadingInset={16} color="pink" />
            <View style={styles.dataRow}>
              <MaterialIcons name="email" style={styles.icon} />
              <View style={styles.dataTextContainer}>
                <Text style={styles.dataText}>Email</Text>
                <Text style={styles.dataTextInfo}>{barcodeData[0].email}</Text>
              </View>
            </View>
            <Divider style={styles.divider} leadingInset={16} color="pink" />
            <View style={styles.dataRow}>
              <MaterialIcons name="image" style={styles.icon} />
              <View style={styles.dataTextContainer}>
                <Text style={styles.dataText}>Profile Picture Link</Text>
                <TouchableOpacity
                  onPress={handleProfileLinkPress}
                  testID="profile-link">
                  <Image
                    source={{ uri: barcodeData[0].profilePicLink }}
                    style={styles.previewImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Divider style={styles.divider} leadingInset={16} color="pink" />
            <View style={styles.dataRow}>
              <MaterialIcons style={styles.icon} />
              <View style={styles.dataTextContainer}>
                <Text style={styles.dataText}>Optional Info</Text>
                <Text style={styles.linkDescription}>
                  Personal Website Link
                </Text>
                <Text
                  style={styles.dataTextInfo}
                  onPress={handleWebsiteLinkPress}
                  testID="website-link"
                  selectable={true}>
                  {barcodeData[0].website}
                </Text>
              </View>
            </View>
            <Divider style={styles.divider} leadingInset={16} color="pink" />
            <Notes contact={barcodeData} />
          </View>
        </LinearGradient>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ContactDetails;
