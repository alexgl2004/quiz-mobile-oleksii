import { View, Pressable, Text } from "react-native";
import { router } from "expo-router";
import { globalStyles } from "../styles/global";
import { Typography } from "./Typography";
import { COLORS } from "../styles/constants";

export function LoginText() {
    return (<>
            <Typography>
              You must login before SCAN
            </Typography>
            <View style={{ paddingRight: 12 }}>
              <Pressable
                onPress={() => {
                  router.push("login");
                }}
                color={COLORS.accent}
              >
                <Text style={globalStyles.button25}>Login</Text>
              </Pressable>              
            </View>
          </>
 
    )
}