import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { getUsers } from "../components/Redux/contact/contactActions";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../constants";
import { Button } from "native-base";
import Card from "../components/Card";

const users = [];
const userprofile = {};

const ProfileScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    () => fetchdata();
  }, []);

  const fetchdata = () => {
    async () => await dispatch(getUsers());
    users = useSelector((state) => state.users);
    userprofile = users.find(
      (user) => user.email == "lamichhanemanoj1@gmail.com",
      console.log(userprofile)
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Image
            style={{ width: 80, height: 80, borderRadius: 40 }}
            source={{
              uri:
                "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
            }}
          />
        </View>
        <View style={styles.profileDetail}>
          <Text style={{ color: Colors.primary, fontSize: 30 }}>Manoj</Text>
          <Text style={{ color: Colors.primary, fontSize: 15 }}>
            lamichhanemanoj1@gmail.com
          </Text>
          <Text style={{ color: Colors.primary, fontSize: 15 }}>
            9845286964
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 40,
        }}
      >
        <Card title="20" subtitle="Contacts" />
        <Card title="10" subtitle="Favourites" />
      </View>
      <Button full success>
        <Text style={{ color: "white" }}>LOG OUT</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 10,

    backgroundColor: "white",
  },
  profileDetail: {
    justifyContent: "center",
    paddingHorizontal: 30,
  },
});
export default ProfileScreen;
