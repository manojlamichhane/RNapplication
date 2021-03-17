import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, Modal, ScrollView } from "react-native";
import { Button, Item, Input, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../constants";
import {
  addUsersToFirebase,
  getUsers,
  afterLogin,
} from "./Redux/contact/contactActions";
import ProfileScreen from "../Screen/ProfileScreen";

const LoginPage = ({ navigation }) => {
  const [loginPage, setLoginPage] = useState("false");
  const [logMail, setLogMail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repassword, setRePassword] = useState("");
  const [logmailError, setLogMailError] = useState("");
  const [logPasswordError, setLogPasswordError] = useState("");
  const [ready, setReady] = useState(false);

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const Login = (value) => {
    users.forEach((user) => {
      value.logMail == ""
        ? setLogMailError("Required")
        : value.logMail.match(emailRegex)
        ? user.email == value.logMail
          ? user.password == value.logPassword
            ? setReady(true)
            : setLogPasswordError("Invalid password")
          : setLogMailError("Email  not registered")
        : setLogMailError("Invalid Email address");
      if (ready) {
        setLogMailError(""), setLogPasswordError("");
        dispatch(afterLogin(user));
        dispatch(getUsers());
        console.log("Login succesfull");
      } else {
        console.log("Login failed");
      }
    });
  };

  const createAccount = (value) => {
    value.name == "" ? setNameError("Required") : setNameError("");
    value.phone == ""
      ? setPhoneError("Required")
      : value.phone.length < 10
      ? setPhoneError("Number should be of 10 digit")
      : setPhoneError("");

    value.email == ""
      ? setEmailError("Required")
      : value.email.match(emailRegex)
      ? setEmailError("")
      : setEmailError("Invalid Email");
    value.password == value.repassword
      ? setPasswordError("")
      : setPasswordError("Password do not match");

    if (
      nameError == "" &&
      phoneError == "" &&
      emailError == "" &&
      passwordError == ""
    ) {
      setLoginPage(false);
      dispatch(addUsersToFirebase({ name, phone, email, password }));
      dispatch(getUsers);
    }
  };
  const openSignUp = () => {
    setLoginPage(true),
      setName(""),
      setEmail(""),
      setPhone(""),
      setPassword(""),
      setRePassword("");
  };
  const closeSignUp = () => {
    setLoginPage(false),
      setName(""),
      setEmail(""),
      setPhone(""),
      setPassword(""),
      setRePassword("");
  };
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  console.log(users);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
              marginTop: 80,
            }}
            source={{
              uri:
                "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
            }}
          />
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Welcome Back</Text>

          <Text style={{ color: "grey", fontSize: 15 }}>
            Signin to continue
          </Text>
        </View>
        <View style={{ paddingHorizontal: 30, paddingVertical: 60 }}>
          <Item>
            <Icon active name="mail" />
            <Input
              placeholder="Email"
              value={logMail}
              onChangeText={(text) => setLogMail(text)}
            />
          </Item>
          <Text style={{ color: Colors.primary }}>{logmailError}</Text>
          <Item>
            <Icon active name="key" />
            <Input
              secureTextEntry
              placeholder="Password"
              value={logPassword}
              onChangeText={(text) => setLogPassword(text)}
            />
          </Item>
          <Text style={{ color: Colors.primary }}>{logPasswordError}</Text>
          <Button style={{ paddingLeft: 185 }} transparent>
            <Text style={{ color: "#4DAD4A" }}>Forgot Password?</Text>
          </Button>
          <Button full success onPress={() => Login({ logMail, logPassword })}>
            <Text style={{ color: "white" }}>LOGIN</Text>
          </Button>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>Don't have account?</Text>
            <Button onPress={openSignUp} transparent>
              <Text style={{ color: "#4DAD4A" }}>Create a new account</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
      <Modal visible={loginPage} style={{ backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Ionicons
              onPress={closeSignUp}
              name="arrow-back"
              size={30}
              color="#4DAD4A"
            />
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                Create Account
              </Text>
              <Text>Create a new account</Text>
            </View>
            <View style={{ padding: 20 }}>
              <Item>
                <Icon active name="person" />
                <Input
                  placeholder="Name"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </Item>
              <Text style={{ color: Colors.primary }}>{nameError}</Text>
              <Item>
                <Icon active name="mail" />
                <Input
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </Item>
              <Text style={{ color: Colors.primary }}>{emailError}</Text>
              <Item>
                <Icon active name="call" />
                <Input
                  maxLength={10}
                  keyboardType="number-pad"
                  placeholder="Phone"
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                />
              </Item>
              <Text style={{ color: Colors.primary }}>{phoneError}</Text>
              <Item>
                <Icon active name="key" />
                <Input
                  secureTextEntry
                  placeholder="Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </Item>
              <Item>
                <Icon active name="key" />
                <Input
                  secureTextEntry
                  placeholder="Confirm Password"
                  value={repassword}
                  onChangeText={(text) => setRePassword(text)}
                />
              </Item>
              <Text style={{ color: Colors.primary }}>{passwordError}</Text>
            </View>
            <Button
              onPress={() =>
                createAccount({ name, email, phone, password, repassword })
              }
              full
              success
            >
              <Text style={{ color: "white" }}>CREATE ACCOUNT</Text>
            </Button>
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Already have a account?</Text>
              <Button onPress={closeSignUp} transparent>
                <Text style={{ color: "#4DAD4A" }}>Login</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});
export default LoginPage;
