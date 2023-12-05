import { createDrawerNavigator } from "@react-navigation/drawer";
import { useAuth } from "../../context/userContext";
import Login from "../screens/Login";
import Register from "../screens/Register";
import StoreSetup from "../screens/StoreSetup";
import DrawerItems from "../constants/DrawerItems";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        labelStyle={{
          color: "red",
        }}
      />
    </DrawerContentScrollView>
  );
};

export const SideMenu = () => {
  const Drawer = createDrawerNavigator();
  const { user, isOwner } = useAuth();

  const drawerContent = (props: DrawerContentComponentProps) => {
    if (user) {
      return (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          {isOwner === false ? (
            <Drawer.Screen name="Store Setup" component={StoreSetup} />
          ) : (
            <>
              {DrawerItems.map((item, index) => (
                <Drawer.Screen
                  key={index}
                  name={item.name}
                  component={item.component}
                />
              ))}
            </>
          )}
        </Drawer.Navigator>
      );
    } else {
      return (
        <Drawer.Navigator>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
        </Drawer.Navigator>
      );
    }
  };
  return <>{drawerContent({} as DrawerContentComponentProps)}</>;
};
