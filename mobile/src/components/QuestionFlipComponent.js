import React, { useRef, useState } from "react";
import { StyleSheet, Animated } from "react-native";
import { View } from "./Themed";
import QuestionFlipCard from "./QuestionFlipCard";

export default function QuestionFlipComponent(props) {
  const animate = useRef(new Animated.Value(0));
  const [isFlipped, setIsFlipped] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const _flipCard = () => {
    Animated.timing(animate.current, {
      duration: 500,
      toValue: isFlipped ? 0 : 180,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped);
    });
  };

  const interpolatedValueFront = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const interpolatedValueBack = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const rotateFront = {
    transform: [
      {
        rotateY: interpolatedValueFront,
      },
    ],
  };

  const rotateBack = {
    transform: [
      {
        rotateY: interpolatedValueBack,
      },
    ],
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Animated.View style={[styles.hidden, rotateFront]}>
        <QuestionFlipCard
          onPress={_flipCard}
          title={`Question: ${props.question.question[0]}`}
          onChange={(value) => setFront(value)}
          value={front}
        />
      </Animated.View>
      <Animated.View style={[styles.hidden, styles.back, rotateBack]}>
        <QuestionFlipCard
          onPress={_flipCard}
          title={`Answer: ${props.question.choices[props.question.answer]}`}
          onChange={(value) => setBack(value)}
          value={back}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    backfaceVisibility: "hidden",
  },
  back: {
    position: "absolute",
    top: 0,
  },
});
