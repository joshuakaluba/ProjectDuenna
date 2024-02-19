import * as React from "react";
import { StyleSheet } from "react-native";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import { View, ScrollView } from "./Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function SummaryContainer(props) {
  const theme = useColorScheme();
  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.body]}>
        <ScrollView>
          {!!props.questions &&
            props.questions.length > 0 &&
            props.questions.map((question, i) => {
              return (
                <View key={i}>
                  <MultipleChoiceQuestion
                    selectedQuestion={question}
                    disabled={true}
                    onSelect={() => {}}
                  />
                  {i < props.questions.length - 1 && (
                    <View
                      style={[
                        styles.horizontalLine,
                        { borderBottomColor: Colors[theme].horizontalLine },
                      ]}
                    />
                  )}
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    flexDirection: "column",
  },
  box: {
    flex: 1,
  },
  body: {
    flex: 8,
  },
  horizontalLine: {
    borderRadius: 1,
    borderBottomWidth: 5,
  },
});
