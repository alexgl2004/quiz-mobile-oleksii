import { View, Button } from "react-native";
import { router } from "expo-router";
import { COLORS } from "../styles/constants";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
//import { globalStyles } from "../styles/global";


export function LoginButtonTop() {
    const { user } = useContext(UserContext);
    return (
      <View style={{ paddingRight: 12 }}>
        <Button
          onPress={() => {
            router.push("login");
          }}
          color={COLORS.accent}
          title={user==null?"Login":"Logout"}
          style={{ borderRadius: 5 }}
        />
      </View>
    )
}