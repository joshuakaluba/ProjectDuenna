const darkGrey = "#363636";
const alternativeDarkGrey = '#2f343d';
const black = "#000";
const white = "#fff";
const danger = "tomato";
const blue = "#2196F3";
const tintColor = "#fff";
const iconDefault = "#000";
const copper = "#ec9b3b";
const eggShellWhite = "#f2f1ef";
const scrollViewBackgroundColor = white;
const mainViewBackgroundColor = "white";
const tabBarBackgroundColor = "#f5fbff";
const grey = "#2e3131";
const defaultTextColor = "#2e3131";
const success = "#3fc380";
const lightGrey = "#bdc3c7";
const lighterGrey = "#f5fbff";
const primary = darkGrey;
const tintColorLight = darkGrey;
const tintColorDark = "#fff";
const darkGreen = "#16a085";
const lightGreen = "#CBE3CC";
const lightRed = "#FFCDD2";

export default {
  light: {
    background: "#fff",
    bodyBackgroundColor: white,
    horizontalLine: darkGrey,
    multipleChoiceSelectionBackgroundColor: white,
    multipleChoiceSelectionDefaultBorder: lightGrey,
    questionBackgroundColor: white,
    tabBarActiveTintColor: blue,
    tabBarBackgroundColor: lighterGrey,
    tabHeaderBackgroundColor: darkGrey,
    text: darkGrey,
    headerHamburgerIconColor: white,
    unlockMoreQuestionsIconColor:blue
  },
  dark: {
    background: "#000",
    bodyBackgroundColor: alternativeDarkGrey,
    horizontalLine: white,
    multipleChoiceSelectionBackgroundColor: black,
    multipleChoiceSelectionDefaultBorder: lightGrey,
    questionBackgroundColor: alternativeDarkGrey,
    tabBarActiveTintColor:blue,
    tabBarBackgroundColor: darkGrey,
    tabHeaderBackgroundColor: darkGrey,
    text: white,
    headerHamburgerIconColor: white,
    unlockMoreQuestionsIconColor:white
  },
  constants: {
    alternativeDarkGrey,
    danger,
    blue,
    white,
    lightGrey,
    darkGrey,
    darkGreen,
    black,
    correctAnswerIconColor:darkGreen,
    correctAnswerCardBackgroundColor: lightGreen,
    incorrectAnswerCardBackgroundColor: lightRed,
    progressBarColor:blue
  }
};
