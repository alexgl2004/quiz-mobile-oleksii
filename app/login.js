import {
  Platform,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native";

import { globalStyles } from "../styles/global";
import { COLORS } from "../styles/constants";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { router } from "expo-router";

export default function Login() {
  const { logout, login, user } = useContext(UserContext);
  const showBackButton = router.canGoBack();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[
        globalStyles.container,
        { gap: 12, alignItems: "center", justifyContent: "center" },
      ]}
     
    >
      {user?
         (
          <>
            <Text style={globalStyles.pCenter}>
              Are you shure to make logout?
            </Text>
            <Button
              onPress={() => {
                logout();
                //console.log('aaa')
                alert('You are logout now')
                router.push('');
              }}
              color={COLORS.accent}
              title="Logout"
            /
            ></>
         ):
         (<>
          <Text style={globalStyles.h1}>Login</Text>
          <Text style={globalStyles.pCenter}>
            You can login with your E-mail or Name
          </Text>
          <TextInput
            placeholder="User name"
            onChangeText={(text) => {
              setName(text);
            }}
            value={name}
            style={[globalStyles.input, { width: "60%" }]}
          />
          <TextInput
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
            secureTextEntry
            style={[globalStyles.input, { width: "60%" }]}
          />
          <Button
            onPress={() => {
              login(name, password)
/*              
              if(login(name, password)==null){
                alert('Wrong Email or Password!')
              }else{
//                alert('Congradulation')
                router.push('');
              }              
*/              
                //router.back();
            }}
            color={COLORS.accent}
            title="Submit"
          />
          </>)
      }
    {showBackButton && (
      <Button
        title="Cancel"
        color={COLORS.grey}
        onPress={() => {
          router.back();
        }}
      />
    )}     
    </KeyboardAvoidingView>

  );
}
