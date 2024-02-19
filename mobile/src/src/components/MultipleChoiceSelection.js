import * as Icon from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function MultipleChoiceSelection(props) {
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={() => {
        props.onSelect(props.index);
      }}
    >
      <View
        style={[
          styles.container,
          {
            borderColor: !props.disabled
              ? Colors[theme].multipleChoiceSelectionDefaultBorder
              : props.index === props.question.answer
              ? Colors.constants.correctAnswerCardBackgroundColor
              : Colors.constants.incorrectAnswerCardBackgroundColor,
            backgroundColor: !props.disabled
              ? theme === "dark"
                ? Colors[theme].bodyBackgroundColor
                : Colors[theme].multipleChoiceSelectionBackgroundColor
              : props.index === props.question.answer
              ? Colors.constants.correctAnswerCardBackgroundColor
              : Colors.constants.incorrectAnswerCardBackgroundColor,
          },
        ]}
      >
        <Text
          style={[
            styles.selection,
            theme === "dark" && props.disabled
              ? { color: Colors.constants.darkGrey }
              : {},
          ]}
        >
          {props.text}
        </Text>

        {props.disabled && props.index === props.question.answer ? (
          <Icon.Octicons 
          name={"check-circle"} 
          size={30} color={Colors.constants.darkGreen} />
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 3,
    marginBottom: 5,
    borderRadius: 3,
  },
  selection: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 15,
    paddingTop: 15,
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
});
