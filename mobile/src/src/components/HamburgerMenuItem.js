import * as React from "react";
import { TouchableOpacity } from "react-native";
import * as Icon from "@expo/vector-icons";
import { useCallback } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function HamburgerMenuIcon() {
  const theme = useColorScheme();
  const navigation = useNavigation();

  const _openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);

  return (
    <TouchableOpacity onPress={_openDrawer}>
      <Icon.Feather name="menu" size={25} color={Colors[theme].headerHamburgerIconColor} />
    </TouchableOpacity>
  );
}
