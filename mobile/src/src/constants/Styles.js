import Colors from "./Colors";

export default Styles = {
  defaultScreenOptions: function (theme) {
    return {
      headerTitleStyle: {
        color: Colors.constants.white,
        fontWeight: "bold",
      },
      headerStyle: {
        backgroundColor: Colors[theme].tabHeaderBackgroundColor,
      },
    };
  },
};
