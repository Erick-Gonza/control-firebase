import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/userContext";
import { SideMenu } from "./app/navigation/SideMenu";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <SideMenu />
      </NavigationContainer>
    </AuthProvider>
  );
}
