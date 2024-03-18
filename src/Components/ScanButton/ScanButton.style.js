import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#58b3f4",
  },
  buttonWrapper: {
    justifyContent: "space-between",

    width: "48%",
    backgroundColor: "#0092de",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 16,
    margin: 5,
    color: "white",
  },
  qrIconStyle: {
    fontSize: 25,
  },
});
