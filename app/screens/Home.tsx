import { View, Text, Button } from "react-native";
import React from "react";
import { RouterProps } from "../interfaces/InterfaceProps";

const Home = ({ navigation }: RouterProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
