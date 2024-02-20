import React from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Text } from "./Themed";
import { Colors } from "../constants";

const DropdownComponent = (props) => {
  return (
    <>
      {props.label && props.label.length > 0 && (
        <Text style={{ marginLeft: 16, marginTop: 10 }}>{props.label}</Text>
      )}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(item) => {
          props.setValue(item.value);
          if (props.onChange) props.onChange(item.value);
        }}
      />
    </>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: Colors.constants.lightGrey,
    borderBottomWidth: 3,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
