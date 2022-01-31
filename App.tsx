import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, View } from "react-native";

type Member = {
  login: string;
  avatar_url: string;
};

export default function App() {
  const [members, setMembers] = useState<Member[]>();

  useEffect(() => {
    fetch(`https://api.github.com/orgs/google/members`)
      .then((response) => response.json())
      .then((data) => setMembers(data));
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.box}>
      <Image
        style={styles.image}
        source={{ uri: `${item.avatar_url}` }}
      ></Image>
      <Text style={styles.text}>{item.login}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <FlatList
          data={members}
          renderItem={renderItem}
          keyExtractor={(item) => item.login}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bbb",
  },
  text: {
    display: "flex",
    alignItems: "center",
    marginLeft: 10,
  },
  input: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 10,
    width: 125,
    marginTop: 10,
    height: 44,
    border: "2px solid gray",
    borderRadius: 10,
    paddingLeft: 10,
  },
  box: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 10
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
  },
});
