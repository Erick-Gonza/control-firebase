import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { SelectList } from "react-native-dropdown-select-list";
import { useAuth } from "../../context/userContext";

interface Settings {
  name: string;
  category: string;
  language: string;
  ownerId: string | undefined;
  createdAt: Date;
}

const StoreSetup = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Settings>({
    name: "",
    category: "",
    language: "",
    ownerId: user?.uid,
    createdAt: new Date(),
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const options = async () => {
    const categories = await getDocs(collection(FIREBASE_DB, "category"));
    const languages = await getDocs(collection(FIREBASE_DB, "language"));
    const categoriesArray: string[] = [];
    const languagesArray: string[] = [];
    categories.forEach((category) => {
      categoriesArray.push(category.data().name);
    });
    languages.forEach((language) => {
      languagesArray.push(language.data().name);
    });
    setCategories(categoriesArray);
    setLanguages(languagesArray);
  };

  const createStore = async () => {
    try {
      const result = await addDoc(collection(FIREBASE_DB, "/store"), {
        ...settings,
      });
      if (result) {
        await updateDoc(doc(FIREBASE_DB, "users", user?.uid), {
          isOwner: true,
        });
      }
      setSettings({
        name: "",
        category: "",
        language: "",
        ownerId: user?.uid,
        createdAt: new Date(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    setLoading(true);
    options();
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Store Settings to set</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <TextInput
            placeholder="Store Name"
            value={settings.name}
            style={styles.input}
            onChangeText={(val) => setSettings({ ...settings, name: val })}
          />
          <SelectList
            setSelected={(val) => setSettings({ ...settings, category: val })}
            data={categories}
            save="value"
          />
          <SelectList
            setSelected={(val) => setSettings({ ...settings, language: val })}
            data={languages}
            save="value"
          />
        </>
      )}
      <View style={styles.btn}>
        <Button
          title="Create Store"
          onPress={() => createStore()}
          color={"#d56b1f"}
        />
      </View>
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
  btn: {
    marginHorizontal: 4,
    marginVertical: 10,
    flexDirection: "column",
    gap: 10,
    height: 100,
  },
});

export default StoreSetup;
