import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../themes/style";
import StyledText from "../StyledText/StyledText";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const UploadModal = ({
  modalVisible,
  onPressOut,
  onPressCamera,
  onPressGallery,
  onRemoveImage
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Pressable style={styles.outsideModal} onPress={onPressOut}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Chose Photo</Text>
              <View style={styles.iconContainer}>
                <Pressable onPress={onPressCamera}>
                  <View style={styles.groupIcon}>
                    <AntDesign name="camera" size={24} color={colors.primary} />
                    <StyledText title="Camera" />
                  </View>
                </Pressable>
                <Pressable onPress={onPressGallery}>
                  <View style={styles.groupIcon}>
                    <Entypo name="image" size={24} color={colors.primary} />
                    <StyledText title="Gallery" />
                  </View>
                </Pressable>
                
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default UploadModal;
