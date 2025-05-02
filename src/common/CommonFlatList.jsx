import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IMG_URL } from "@env"

const CommonFlatList = ({ data }) => {
    const navigation = useNavigation();

    return (
        <View>
            <FlatList
                horizontal
                contentContainerStyle={{ gap: 20 }}
                keyExtractor={(item) => item.id.toString()}
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Details", { id: item.id, type: item.media_type }) } >
                        <Image className='w-[118px] h-[173px] mt-[18px]' src={`${IMG_URL}${item.poster_path}`}></Image>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default CommonFlatList;