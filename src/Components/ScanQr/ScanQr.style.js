import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "110%",
    left: -17,
  },
  barCodeBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "purple",
    borderRadius: 8,
    overflow: "hidden",
  },
  allowCamera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraView: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    marginTop: -50,
    alignItems: "center",
    width: "85%",
  },
  cameraScanner: {
    ...StyleSheet.absoluteFillObject,
  },
  dottedSquare: {
    width: 250,
    height: 250,
    borderColor: "green",
    borderWidth: 3,
    borderStyle: "dotted",
  },
  scanText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    alignSelf: "center",
    position: "absolute",
    bottom: "1.8%",
    right: -90,
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 5,
    padding: 3,
    backgroundColor: "black",
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    height: 50,
  },
  goBackButton: {
    position: "absolute",
    bottom: 2,
    left: 98,
  },
});
