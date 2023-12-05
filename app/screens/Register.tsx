import {
  View,
  Text,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { useState } from "react";
import { RouterProps } from "../interfaces/InterfaceProps";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { genericErrorToast, validLoginToast } from "../utils/Toasts";
import { doc, setDoc } from "firebase/firestore";
import { styles } from "./Login";
import tw from "twrnc";

const Register = ({ navigation }: RouterProps) => {
  const auth = FIREBASE_AUTH;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = await setDoc(doc(FIREBASE_DB, "users", res.user.uid), {
        email: email,
        isOwner: false,
      });
      if (res) validLoginToast();
    } catch (error) {
      genericErrorToast();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles["off-container"]}>
        <Text style={styles.title}>Register</Text>
        <View style={styles["off-container"]}>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.btn}>
            <Button title="Create Account" color={"#d56b1f"} onPress={signUp} />
            <Button
              title="Already have an account?"
              color={"#d56b1f"}
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;
