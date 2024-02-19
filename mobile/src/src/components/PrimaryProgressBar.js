import * as React from "react";
import { LinearProgress } from '@rneui/themed';
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function PrimaryProgressBar(props) {
  const theme = useColorScheme();
  return (
    <LinearProgress
        style={{ marginVertical: 10 }}
        color={Colors.constants.progressBarColor}
        value={props.value}
        variant="determinate"
      />
  );
}
