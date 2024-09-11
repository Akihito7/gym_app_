import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { defaultTheme } from "../../configs/default-theme";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TypeAppRoutes } from "../../routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { useContextRoutine } from "../../hooks/useContextRoutine";

type ParamsRoutineCard = {
  id : number
  name : string;
  exercisesLength : number;
  exercises : {
    id: string;
    name: string;
    group: string;
    gif: string;
    description: string;
  }[]
}

type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>;

export function RoutineCard({ id, name, exercises, exercisesLength} : ParamsRoutineCard) {
  const [isModalVisible, setModalVisible] = useState(false);
  const { navigate } = useNavigation<TypeNavigation>();
  const { setRoutineSelected } = useContextRoutine()

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  function handleNavigateRoutine(){
    const routine = {
      id,
      name,
      exercises
    };
    setRoutineSelected(routine);
    navigate("view-routine")
  }
  return (
    <>
      <TouchableOpacity
        onPress={handleNavigateRoutine}
        onLongPress={toggleModal}
      >
        <View style={styles.container}>
          <View style={styles.containerDetails}>
            <Text style={styles.primaryText} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.secondaryText} numberOfLines={1}>
             {exercisesLength} exercícios
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => { }}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Opções da Rotina</Text>
          <TouchableOpacity onPress={() => console.log("Editar rotina")}>
            <View style={styles.containerOption}>
              <Feather name="edit" size={24} color={defaultTheme.colors.secondaryText} />
              <Text style={styles.optionText}>Editar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Excluir rotina")}>
            <View style={styles.containerOption}>
              <AntDesign name="delete" size={24} color={defaultTheme.colors.secondaryText} />
              <Text style={styles.optionText}>Excluir</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: defaultTheme.colors.backgroundComponents,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
  },
  containerDetails: {
    flex: 1,
    paddingRight: 20,
  },
  primaryText: {
    fontSize: 16,
    color: defaultTheme.colors.primaryText,
  },
  secondaryText: {
    fontSize: 14,
    color: defaultTheme.colors.secondaryText,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: defaultTheme.colors.button,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: defaultTheme.colors.primaryText,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: defaultTheme.colors.backgroundComponents,
    padding: 20,
    borderRadius: 10,
    alignSelf: "center",
    width: "100%"
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: defaultTheme.colors.primaryText,
  },
  containerOption: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  optionText: {
    fontSize: 16,
    color: defaultTheme.colors.secondaryText,
    paddingVertical: 10,
  },
});
