import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "../styles/constants";
import { useState } from "react";

// variant: "primary" "secondary"

export function StyledButton({
  variant = "secondary",
  children,
  ...restProps
}) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      style={[
        styles.buttonBase,
        styles[`${variant}Container`],
        isPressed ? styles[`${variant}ContainerActive`] : null,
      ]}
      {...restProps}
      onPressIn={() => {
        setIsPressed(true);
        if (restProps.onPressIn) {
          restProps.onPressIn();
        }
      }}
      onPressOut={() => {
        setIsPressed(false);
        if (restProps.onPressOut) {
          restProps.onPressOut();
        }
      }}
    >
      <Text style={[styles.textBase, styles[`${variant}Text`]]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    padding: 12,
    borderRadius: 8,
  },
  textBase: {
    fontSize: 18,
    textAlign: "center",
  },
  primaryContainer: {
    backgroundColor: COLORS.accent,
  },
  primaryText: {
    color: COLORS.light,
  },
  primaryContainerActive: {
    backgroundColor: "green",
  },
  secondaryContainer: {
    backgroundColor: COLORS.grey,
  },
  secondaryText: {
    color: COLORS.dark,
  },
  secondaryContainerActive: {
    backgroundColor: "blue",
  },
});
