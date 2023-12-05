import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RouterProps } from "../interfaces/InterfaceProps";
import { invalidLoginToast, validLoginToast } from "../utils/Toasts";
import tw from "twrnc";

const Login = ({ navigation }: RouterProps) => {
  const auth = FIREBASE_AUTH;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) validLoginToast();
    } catch (error) {
      invalidLoginToast();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles["off-container"]}>
        <Text style={styles.title}>Login</Text>
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
            <Button title="Login" onPress={signIn} color={"#d56b1f"} />
            <Button
              title="Create Account"
              color={"#d56b1f"}
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export const styles = {
  container: tw`flex flex-col w-full h-full px-10 justify-center`,
  "off-container": tw`flex flex-col gap-2`,
  title: tw`text-4xl font-bold text-center py-6`,
  input: tw`h-[50px] px-4 py-2 border border-[#d56b1f] rounded-md bg-white`,
  btn: tw`w-full gap-2 mt-2`,
};

export default Login;
