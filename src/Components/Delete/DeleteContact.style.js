import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 20,
  },
  deleteText: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modalContent: {
    alignItems: "center",
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  deleteButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginTop: 20,
  },
  modalButton: {
    marginTop: 10,
    color: "blue",
  },
  antIcon: {
    fontSize: 22,
    color: "green",
  },
});

export { styles };
