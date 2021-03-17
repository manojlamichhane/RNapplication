import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { List, Modal, TextInput, Button } from "react-native-paper";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Colors } from "../constants";
import {
  addContactToFirebase,
  getContacts,
} from "../components/Redux/contact/contactActions";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const AllContactsScreen = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addVisible, setAddVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const createContact = ({ name, email, phone }) => {
    name == ""
      ? setNameError("Required")
      : phone == ""
      ? setPhoneError("Required")
      : phone.length < 10
      ? setPhoneError("Phone number should be of 10 digits")
      : email == ""
      ? setEmailError("Required")
      : email.match(emailRegex)
      ? setIsReady(true)
      : setEmailError("Invalid Email address");
    if (isReady) {
      setNameError(""), setEmailError(""), setPhoneError("");
      console.log("contact added");
      dispatch(addContactToFirebase({ name, email, phone }));
    } else {
      console.log("adding failed");
    }
  };

  useEffect(() => {
    dispatch(getContacts);
  });
  console.log(contacts);
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(contact) => contact.id}
        data={contacts}
        renderItem={(contact) => (
          <List.Item
            title={contact.name}
            left={() => <Ionicons name="person" size={30} color="black" />}
          />
        )}
      />

      <View
        style={{
          alignItems: "flex-end",
          position: "absolute",
          right: 20,
          bottom: 20,
        }}
      >
        <AntDesign
          onPress={() => setAddVisible(true)}
          name="pluscircleo"
          size={50}
          color={Colors.primary}
        />
      </View>
      <Modal visible={addVisible} style={{ backgroundColor: "white" }}>
        <ScrollView>
          <Ionicons
            name="arrow-back"
            size={34}
            onPress={() => setAddVisible(false)}
            color={Colors.primary}
            style={{ paddingLeft: 20, alignItems: "flex-start" }}
          />
          <View style={{ alignItems: "center", margin: 30 }}>
            <AntDesign name="adduser" size={40} color={Colors.primary} />
            <Text style={{ color: "black", fontSize: 30, fontWeight: "bold" }}>
              Create Contact
            </Text>
          </View>
          <View style={{ margin: 20 }}>
            <TextInput
              style={{ marginVertical: 10 }}
              label="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text style={{ color: Colors.primary }}>{nameError}</Text>
            <TextInput
              label="Phone"
              maxLength={10}
              style={{ marginVertical: 10 }}
              keyboardType="number-pad"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
            <Text style={{ color: Colors.primary }}>{phoneError}</Text>
            <TextInput
              label="Email"
              style={{ marginVertical: 10 }}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={{ color: Colors.primary }}>{emailError}</Text>
          </View>
          <Button
            style={{ marginHorizontal: 20 }}
            mode="contained"
            onPress={() => createContact({ name, phone, email })}
          >
            Create Contact
          </Button>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: 20,
  },
});
export default AllContactsScreen;
