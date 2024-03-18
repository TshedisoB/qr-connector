import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    height: "100%",
  },
  scrollView: {
    backgroundColor: "purple",
  },
  favoriteDelete: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 50,
  },
  barCodeBox: {
    flex: 1,
    justifyContent: "center",
  },
  displayData: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    margin: 20,
    padding: 16,
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
    color: "green",
    fontSize: 20,
  },
  dataTextContainer: {
    marginLeft: 7,
  },
  dataText: {
    fontSize: 16,
  },
  dataTextInfo: {
    fontSize: 16,
    backgroundColor: "#054405",
    color: "white",
    padding: 3,
    borderRadius: 15,
  },
  previewImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginVertical: 5,
  },
  linkDescription: {
    fontSize: 14,
    color: "gray",
  },
  divider: {
    margin: 5,
  },
});
