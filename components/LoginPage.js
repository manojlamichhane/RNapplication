import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Modal } from "react-native";
import { Button, Item, Input, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const LoginPage = () => {
  const [loginPage, setLoginPage] = useState("false");
  return (
    <View style={styles.container}>
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
        <Text style={{ color: "grey", fontSize: 15 }}>Signin to continue</Text>
      </View>
      <View style={{ paddingHorizontal: 30, paddingVertical: 60 }}>
        <Item>
          <Icon active name="mail" />
          <Input placeholder="Email" />
        </Item>
        <Item>
          <Icon active name="key" />
          <Input placeholder="Password" />
        </Item>
        <Button style={{ paddingLeft: 185 }} transparent>
          <Text style={{ color: "#4DAD4A" }}>Forgot Password?</Text>
        </Button>
        <Button full success>
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
          <Button onPress={() => setLoginPage(true)} transparent>
            <Text style={{ color: "#4DAD4A" }}>Create a new account</Text>
          </Button>
        </View>
      </View>
      <Modal visible={loginPage} style={{ backgroundColor: "white" }}>
        <View style={{ padding: 20 }}>
          <Ionicons
            onPress={() => setLoginPage(false)}
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
          <View style={{ paddingVertical: 10 }}>
            <Item>
              <Icon active name="person" />
              <Input placeholder="Name" />
            </Item>
            <Item>
              <Icon active name="mail" />
              <Input placeholder="Email" />
            </Item>
            <Item>
              <Icon active name="call" />
              <Input placeholder="Phone" />
            </Item>
            <Item>
              <Icon active name="key" />
              <Input placeholder="Password" />
            </Item>
            <Item>
              <Icon active name="key" />
              <Input placeholder="Confirm Password" />
            </Item>
          </View>
          <Button full success>
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
            <Button onPress={() => setLoginPage(false)} transparent>
              <Text style={{ color: "#4DAD4A" }}>Login</Text>
            </Button>
          </View>
        </View>
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
