import { TouchableOpacity, Text } from "react-native";

const Button = ({ title, onPress, className }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={"w-[351px] h-[40px] mt-[15px] bg-[#e50914] rounded pl-[150.59px] pt-[11px]"}
    >
      <Text className="w-[50.01px] h-[17px] text-center text-white text-[16px] font-medium font-['Roboto'] leading-none">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;