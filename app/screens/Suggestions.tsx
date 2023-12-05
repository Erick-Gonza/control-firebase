import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Button,
  ScrollView,
} from "react-native";
import { useState } from "react";

const Suggestions = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.title}>Suggestions Form</Text>
        <TextInput
          style={styles.input}
          value={title}
          placeholder="Title"
          autoCapitalize="none"
          onChangeText={(text) => setTitle(text)}
        />
        <ScrollView>
          <TextInput
            style={styles.message}
            multiline
            value={message}
            placeholder="Message or problem"
            autoCapitalize="none"
            onChangeText={(text) => setMessage(text)}
          />
        </ScrollView>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.btn}>
            <Button title="Send" color={"#d56b1f"} />
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#d56b1f",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  message: {
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#d56b1f",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 18,
    textAlignVertical: "top",
    height: 200,
  },
  btn: {
    marginHorizontal: 4,
    marginVertical: 10,
    flexDirection: "column",
    gap: 10,
    height: 100,
  },
});

export default Suggestions;
