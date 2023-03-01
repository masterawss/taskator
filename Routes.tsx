import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import CategoryCreateScreen from "./screens/Category/Create";
import CategoryShowScreen from "./screens/Category/Show";

const Routes = () => {
  const Stack = createNativeStackNavigator();

  return <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="category.create" component={CategoryCreateScreen} />
        <Stack.Screen name="category.show" component={CategoryShowScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </>
}

export default Routes