import { Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { COLORS } from "../styles/constants";
import { FONTS } from "../styles/constants";

// variant: "heading", "paragraph", "label", "heading-2"
export function Typography({
  variant = "paragraph",
  children,
  style,
  ...restProps
}) {
  return (
    <Text style={{ ...styles[variant], ...style }} {...restProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 18,
    color: COLORS.light,
    marginBottom: 8,
    fontFamily: FONTS.sansSerif,
  },
  heading: {
    fontSize: 42,
    color: COLORS.accent,
    marginBottom: 12,
    fontFamily: FONTS.sansSerifBold,
  },
});
