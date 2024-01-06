import {
    View,
    Text,
    Modal,
    Pressable,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { styles } from "./styles";
  import StyledText from "../StyledText/StyledText";
  import { Entypo } from "@expo/vector-icons";
  import { Divider } from "react-native-paper";
  
  const GroupMember = ({ visible, onPressOut, data }) => {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          style={styles.centeredView}
        >
          <Pressable style={styles.outsideModal} onPress={onPressOut}>
            <View style={styles.modalView}>
              <View>
                {data?.bannerUrl ? (
                  <Image
                    source={{ uri: data.bannerUrl }}
                    width={100}
                    height={200}
                  />
                ) : (
                  <Image
                    source={require("../../assets/img/backGroundDefault.png")}
                    style={styles.bgImage}
                  />
                )}
              </View>
              <View style={styles.groupInfo}>
                <StyledText title={data?.groupName} textStyle={styles.groupName} />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    marginVertical: 8,
                  }}
                >
                  <StyledText title="Private group" />
                  <Entypo name="dot-single" size={14} color="black" />
                  <StyledText title={`${data?.totalMember} members`} />
                </View>
              </View>
              <Divider />
              <View style={[styles.groupInfo]}>
                <StyledText title="Intro" textStyle={styles.groupDesc} />
                <StyledText title={data?.groupDesc} />
              </View>
              <View style={{ flex: 1 ,justifyContent:"flex-end", paddingBottom:60,paddingHorizontal:20}}>
                <TouchableOpacity style={styles.joinGroup}>
                  <StyledText title="Join Group" textStyle={styles.joinGroupText}/>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>
    );
  };
  
  export default GroupMember;
  