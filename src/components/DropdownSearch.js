import React, { Fragment } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";

function getSuggestionListHeight(items) {
  if (Array.isArray(items)) {
    const showableItems = Math.min(items.length, 3);
    if (items.length === 0) {
      return 0;
    } else {
      return showableItems * 45 + 5;
    }
  } else {
    return 0;
  }
}
const DropdownSearch = ({
  items,
  selectedItem,
  setSelectedItem,
  setTextState = null,
  placeholder = ""
}) => {
  return (
    <Fragment>
      <SearchableDropdown
        onItemSelect={item => {
          setSelectedItem(item);
          if (setTextState !== null) {
            setTextState(item.name);
          }
        }}
        onTextChange={text => (setTextState ? setTextState(text) : () => {})}
        containerStyle={{ padding: 5, backgroundColor: "white" }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: "white",
          borderColor: "#bbb",
          borderWidth: 1,
          borderRadius: 5
        }}
        itemTextStyle={{ color: "#222" }}
        itemsContainerStyle={{ maxHeight: getSuggestionListHeight(items) }}
        items={items}
        defaultIndex={0}
        resetValue={false}
        textInputProps={{
          placeholder: placeholder,
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5
          }
        }}
        listProps={{
          nestedScrollEnabled: true
        }}
      />
    </Fragment>
  );
};
export default DropdownSearch;
