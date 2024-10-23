import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const DeleteConfirmationModal = ({
  person,
  deletePerson,
  //   deleteIdea,
  //   personId,
  //   ideaId,
  //   ideaName,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    if (person && deleteIdea) {
      setModalVisible(false); // Close the modal
      deletePerson({ personId: person.id }); // Call the delete function with the person's id
    }
    // if (deleteIdea && ideaId && personId) {
    //   setModalVisible(false); // Close the modal
    //   deleteIdea({ personId, ideaId }); // Call the delete function with the person's id
    // }
  };

  return (
    <View style={styles.container}>
      {/* The Delete Button */}
      {/* <Button
        title="Delete"
        onPress={() => setModalVisible(true)}
        color="#fff"
      /> */}

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={[styles.delete]}>Delete</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete {person.name}?
              {/* {person && deleteIdea
                ? `Are you sure you want to delete ${person.name}?`
                : `Are you sure you want to delete this idea called ${ideaName}?`} */}
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "red",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  delete: {
    color: "#fff",
    fontWeight: "bold",
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 32,
    paddingRight: 32,
  },
});

export default DeleteConfirmationModal;
