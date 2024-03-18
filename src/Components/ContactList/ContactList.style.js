import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  contactList: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  barCodeBox: {
    flex: 1,
    justifyContent: "center",
  },
  scannedContacts: {
    backgroundColor: "#b7dcb5",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  stackInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "purple",
  },
  status: {
    fontSize: 14,
    color: "white",
  },
  nullContacts: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  favoriteContact: {
    backgroundColor: "#032404",
    borderWidth: 2,
    borderColor: "red",
  },
  nameAndIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fileText: {
    fontSize: 14,
    color: "yellow",
  },
});
