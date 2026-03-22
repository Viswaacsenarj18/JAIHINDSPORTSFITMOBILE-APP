import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { Search } from "lucide-react-native";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search products...",
  autoFocus = false,
}: SearchBarProps) => (
  <View style={styles.wrapper}>
    <Search size={18} color="#9CA3AF" style={styles.icon} />
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      autoFocus={autoFocus}
      returnKeyType="search"
      autoCapitalize="none"
      autoCorrect={false}
      style={styles.input}
    />
  </View>
);

export default SearchBar;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingHorizontal: 14,
    gap: 10,
  },
  icon: {
    // lucide-react-native icons accept style for positioning
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#111111",
    paddingVertical: 0, // removes Android default padding
  },
});