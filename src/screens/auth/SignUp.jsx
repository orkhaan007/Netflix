import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Input from "../auth/components/Input";
import { useMMKVString } from "react-native-mmkv";
import { useNavigation } from "@react-navigation/native";
import Logo from '../../../assets/icons/logo.svg';
import Button from "./components/Button";
import { IP_URL } from "@env"

const SignUp = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [token, setToken] = useMMKVString("token");
  const navigation = useNavigation();

  const signup = async () => {
  try {
    const response = await fetch(`${IP_URL}/auth/signup`, {
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
      navigation.navigate("SignIn");
    } else {
      const errorData = await response.json();
      console.error("Signup failed:", errorData.message || "Unknown error");
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
        <Text className="text-white text-[32px] font-bold font-['Roboto']">Sign Up</Text>

        <View className="mt-[29px]">
          <Input
            value={formData.username}
            placeholder="Username"
            onChangeText={(text) => setFormData((prev) => ({ ...prev, username: text }))}
          />

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
        
        <Button title="Sign Up" onPress={signup} />

        <Text className="text-white/70 mt-[24px] text-center text-[16px]"> Already have an  to Netflix?</Text>
        <Text
          onPress={() => navigation.navigate('SignIn')}
          className="font-bold text-white text-center text-[16px] mt-[10px]">
            Sign in
        </Text>

      </View>
    </View>
  );
};

export default SignUp;