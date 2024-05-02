import { View, Pressable, Text } from "react-native";
import { router } from "expo-router";
import { globalStyles } from "../styles/global";
import { Typography } from "./Typography";
import { COLORS } from "../styles/constants";

export function LoginText() {
    return (
      <>
        <View style={{ paddingTop: 30 }}></View>
        <Typography>
          You can scan the QR-code or log in using your login details.
        </Typography>
        <View style={{ paddingTop: 30 }}></View>
        <Typography>
          You can ask your teacher for your login information.
        </Typography>
      </>

    )
}