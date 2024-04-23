import { Tabs, router } from "expo-router";
import { COLORS } from "../../styles/constants";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { LoginButtonTop } from "../../components/LoginButtonTop";
import { QuizProvider } from "../../context/QuizContext";

import { Button, View } from "react-native";

export default function MainTabs() {
  return (
    <QuizProvider>
      <Tabs
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.dark,
          },
          headerTitleStyle: {
            color: COLORS.grey,
          },
          tabBarStyle: {
            backgroundColor: COLORS.dark,
          },
          tabBarActiveTintColor: COLORS.accent,
          headerRight: () => {
            return (
              <LoginButtonTop />
            );
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Scan",
            tabBarIcon: ({ color }) => {
              return <Ionicons name="home-outline" size={24} color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="rooms"
          options={{
            title: "Rooms",
            headerShown: false,
            tabBarIcon: ({ color }) => {
              return <Ionicons name="document-outline" size={24} color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="info"
          options={{
            title: "Information",
            tabBarIcon: ({ color }) => {
              return <Ionicons name="document-outline" size={24} color={color} />;
            },
          }}
        />
      </Tabs>
    </QuizProvider>
  );
}
/*
      <Tabs.Screen
        name="actors"
        options={{
          title: "By author",
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <MaterialCommunityIcons name="account-check-outline" size={24} color={color} />;
          },
        }}
      />      
*/