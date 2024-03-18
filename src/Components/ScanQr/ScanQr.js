import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { LinearGradient } from "expo-linear-gradient";
import yaml from "js-yaml";

import { setScanned } from "../../Redux/actions";
import { checkValid } from "../../utils/helper";
import { createTable, insertToDataBase } from "../../sqlQueries/sqlQueries";
import { styles } from "./ScanQr.style.js";
export const db = SQLite.openDatabase("QrCodeDataDB.db");

function ScanQr() {
  const [hasPermission, setHasPermission] = useState(null);
  const scanned = useSelector((state) => state.scanned);
  const currentContact = useSelector((state) => state.currentContact);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    askForCameraPermission();
    createTable(db);
  }, []);

  const barcodeValidator = (data) => {
    let validData = checkValid(data);

    if (validData) {
      data.forEach((data) => {
        insertToDataBase(db, data);
      });

      navigation.navigate("Contact Details", {
        barcodeData: data,
      });
    } else {
      navigation.navigate("Contact Details", {
        barcodeData: "Invalid QR Code",
      });
    }
  };

  const handleBarCodeScanned = ({ _, data }) => {
    if (scanned === false) dispatch(setScanned());
    const parsedData = yaml.load(data);
    barcodeValidator(parsedData);
  };

  const handleGoBack = () => {
    if (currentContact === "invalidContact") {
      navigation.navigate("Contact List");
    } else {
      navigation.navigate("Contact Details", {
        barcodeData: currentContact,
      });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.noAccess}>No access to camera.</Text>
        <Button
          style={styles.allowCamera}
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  const displayGoBack = () => {
    return (
      currentContact && (
        <View style={styles.goBackButton}>
          <Button title="Go Back" onPress={handleGoBack} />
        </View>
      )
    );
  };

  return (
    isFocused && (
      <View style={styles.container}>
        <LinearGradient
          colors={["purple", "maroon", "purple"]}
          style={styles.barCodeBox}>
          <View style={styles.cameraView}>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.dottedSquare} />
            <View style={styles.textContainer}>
              <Text style={styles.scanText}>Fit QR code in dotted square</Text>
              {displayGoBack()}
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  );
}

export default ScanQr;
