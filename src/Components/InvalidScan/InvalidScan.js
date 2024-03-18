import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NativeBaseProvider } from "native-base";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./InvalidScan.style";

const InvalidScan = () => {
  const [displayText, setDisplayText] = useState(false);

  useEffect(() => {
    setDisplayText(true);
  }, []);

  return (
    <NativeBaseProvider>
      <LinearGradient
        colors={["purple", "maroon", "purple"]}
        style={styles.barCodeBox}>
        <View style={styles.invalidDataContainer}>
          {displayText && (
            <Text style={styles.invalidDataText} testID="invalid-data">
              Invalid QR code data
            </Text>
          )}
        </View>
      </LinearGradient>
    </NativeBaseProvider>
  );
};

export default InvalidScan;
