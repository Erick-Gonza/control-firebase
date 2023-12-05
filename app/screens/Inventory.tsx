import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { FIREBASE_DB } from "../../FirebaseConfig";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDocs,
} from "firebase/firestore";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: string;
  stock: string;
  createdAt: Date;
}

const Inventory = () => {
  const collectionRef = collection(FIREBASE_DB, "products");
  const [products, setProducts] = useState<Product[]>([]);
  const [newItem, setNewItem] = useState<Product>({
    id: "",
    sku: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    createdAt: new Date(),
  });

  // Function to add an item
  const addItem = async () => {
    try {
      const result = await addDoc(collection(FIREBASE_DB, "/products"), {
        ...newItem,
      });
      console.log("Document written with ID: ", result.id);
      setNewItem({
        id: "",
        sku: "",
        name: "",
        category: "",
        price: "",
        stock: "",
        createdAt: new Date(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Function to delete an item
  const deleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(collectionRef, id));
      console.log("Document successfully deleted!");
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  // Function to update an item
  const updateItem = async (id: string, updatedData: Partial<Product>) => {
    try {
      await updateDoc(doc(collectionRef, id), updatedData);
      console.log("Document successfully updated!");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  // Function to fetch items
  const fetchItems = async () => {
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  // Function to fetch and display products
  // useEffect(() => {
  //   fetchItems();
  // }, []);

  return (
    <View>
      <Text>Inventory</Text>
      <TextInput
        placeholder="SKU"
        value={newItem.sku}
        onChangeText={(text) => setNewItem({ ...newItem, sku: text })}
      />
      <TextInput
        placeholder="Name"
        value={newItem.name}
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
      />
      <TextInput
        placeholder="Category"
        value={newItem.category}
        onChangeText={(text) => setNewItem({ ...newItem, category: text })}
      />
      <TextInput
        placeholder="Price"
        value={newItem.price}
        keyboardType="numeric"
        onChangeText={(text) => setNewItem({ ...newItem, price: text })}
      />
      <TextInput
        placeholder="Stock"
        value={newItem.stock}
        keyboardType="numeric"
        onChangeText={(text) => setNewItem({ ...newItem, stock: text })}
      />
      <Button title="Send" onPress={() => addItem()} />

      {/* List of Products */}
      {/* <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.category}</Text>
            <Text>{item.price}</Text>
            <Text>{item.stock}</Text>
            <Button title="Delete" onPress={() => deleteItem(item.id)} />
          </View>
        )}
      /> */}
    </View>
  );
};

export default Inventory;
