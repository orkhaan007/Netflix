import { TextInput, View } from "react-native";

const Input = ({ value, placeholder, onChangeText, secureTextEntry }) => {
  return (
    <View className="mb-4">
      <TextInput
        className="w-[351px] h-[56px] bg-[#0f0f0f]/70 rounded border pl-[19px] border-[#808080]/70 font-['Roboto'] text-[16px] text-white no-underline"
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"rgba(255, 255, 255, 0.70)"}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;