import { Stack } from "expo-router";
import { COLORS } from "../../../styles/constants";
import { View, Button, Text } from "react-native";
import { router } from "expo-router";
import { LoginButtonTop } from "../../../components/LoginButtonTop";
import { LoginButtonTopBack } from "../../../components/LoginButtonTopBack";

export default function RoomsStack() {
  return (
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.dark,
          },
          headerTitleStyle: {
            color: COLORS.grey,
          },
          headerBackTitleVisible: false,
          headerTintColor: COLORS.grey,
          headerLeft: () => {
            return (
              <LoginButtonTopBack tolink="/rooms" />
            );
          },
          headerRight: () => {
            return (
              <LoginButtonTop />
            );
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: "Rooms",
            headerLeft: () => {
              return <></>;
            }
          }} 
        />
        <Stack.Screen 
            name="[id]"
            options={{
              title: "Room",
            }}
        />
      </Stack>
  );
}
