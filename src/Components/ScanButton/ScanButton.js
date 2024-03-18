import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

import { setScanned } from "../../Redux/actions";
import { styles } from "./ScanButton.style.js";

const ScanButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const scanned = useSelector((state) => state.scanned);

  const handleScanAgain = () => {
    if (scanned === true) dispatch(setScanned());
    navigation.navigate("Scan Qr Code");
  };

  const handleContactList = () => {
    navigation.navigate("Contact List");
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={handleScanAgain}
        testID="scan-btn-container">
        <Text style={styles.buttonText} testID="scan-qr-button">
          Scan QR Code
        </Text>
        <Icon name="qrcode" style={styles.qrIconStyle} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={handleContactList}
        testID="contact-btn-container">
        <Text style={styles.buttonText} testID="contact-list-button">
          Contact List
        </Text>
        <Icon name="phone" style={styles.qrIconStyle} />
      </TouchableOpacity>
    </View>
  );
};

export default ScanButton;
