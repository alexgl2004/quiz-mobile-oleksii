import { View, Button, Text } from "react-native";
import { router } from "expo-router";
import { COLORS } from "../styles/constants";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
//import { globalStyles } from "../styles/global";

export function LoginButtonTopBack(params) {
    const { user } = useContext(UserContext);
    return (
      <View style={{ paddingRight: 12 }}>
        <Button
          onPress={() => {
            if(params.tolink){
              router.replace(params.tolink);
            }else{
              router.back();
            }
          }}
          color={COLORS.accent}
          title="Back"
          style={{ borderRadius: 5 }}
        />
      </View>
    )
}