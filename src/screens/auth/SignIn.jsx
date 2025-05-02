import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Input from "../auth/components/Input";
import Button from "../auth/components/Button";
import { useMMKVString } from "react-native-mmkv";
import { useNavigation } from "@react-navigation/native";
import Logo from '../../../assets/icons/logo.svg';
import { IP_URL } from "@env"

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [token, setToken] = useMMKVString("token");
  const navigation = useNavigation();

  const signin = async () => {
    try {
      const response = await fetch(`${IP_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        navigation.navigate("Home");
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message || "Unknown error");
      }
    } catch (error) {
      console.error("Network error:", error.message);
    }
  };

  return (
    <View className="flex-1 bg-black">

      <View className="mt-[27px] ml-[19px]">
        <Logo/>
      </View>

      <View className="ml-[19] mt-[150px]">
        <Text className="text-white text-[32px] font-bold font-['Roboto']">Sign In</Text>

        <View className="mt-[29px]">
          <Input
            value={formData.email}
            placeholder="Email"
            onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
          />

          <Input
            value={formData.password}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
          />
        </View>
      
        <Button title="Sign In" onPress={signin} />

        <View className="mt-[24px] ml-[75.5px]">
        <Text className="text-white/70 text-[16px]">
          New to Netflix?{' '}
          <Text
            onPress={() => navigation.navigate('SignUp')}
            className="font-bold text-white">
            Sign up now
          </Text>
        </Text>
        </View>
      </View>
    </View>
  );
};

export default SignIn;