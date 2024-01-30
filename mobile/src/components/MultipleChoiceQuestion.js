import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import MultipleChoiceSelection from "./MultipleChoiceSelection";

export default function MultipleChoiceQuestion(props) {
  const theme = useColorScheme();

  return (
    <View
      style={{
        backgroundColor: Colors[theme].questionBackgroundColor,
        paddingBottom: 15,
        borderRadius: 5,
      }}
    >
      {!!props.selectedQuestion && (
        <>
          {props.selectedQuestion.question.map((question, i) => {
            return (
              <Text
                key={i}
                style={[styles.question, { color: Colors[theme].text }]}
              >
                {question}
              </Text>
            );
          })}

          {props.selectedQuestion.choices.map((choice, i) => {
            return (
              <MultipleChoiceSelection
                key={i}
                text={choice}
                question={props.selectedQuestion}
                index={i}
                disabled={props.disabled}
                onSelect={props.onSelect}
              />
            );
          })}
        </>
      )}
      {
        !!props.selectedQuestion === false && <Text>Missing</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    fontWeight: "bold",
    fontSize: 19,
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 25,
    paddingTop: 25,
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  container: {
    flex: 1,
  },
});