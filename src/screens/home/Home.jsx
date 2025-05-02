import { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import CommonFlatList from "../../common/CommonFlatList";
import Logo from '../../../assets/icons/logo.svg';
import { IP_URL, IMG_URL } from '@env';
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const navigation = useNavigation();

    const getMovies = async () => {
        try {
            const response = await fetch(`${IP_URL}/movie/trending`);
            const data = await response.json();
            setMovies(data.content);
        } catch (error) {
            console.error(error);
        }
    };

    const getShows = async () => {
        try {
            const response = await fetch(`${IP_URL}/tv/trending`);
            const data = await response.json();
            setShows(data.content);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getMovies();
        getShows();
    }, []);

    console.log(movies)

    const featuredMovie = movies.length > 0 ? movies[0] : null;

    return (
        <ScrollView className="flex-1 bg-black" showsVerticalScrollIndicator={false}>

            <View className="mt-[27px] ml-[19px]">
                <Logo/>
            </View>

            {featuredMovie && (
                <TouchableOpacity onPress={() => navigation.navigate("Details", { id: featuredMovie.id, type: featuredMovie.media_type })} >
                <View className="relative">
                    <Image className="ml-[18px] mt-[20px] w-[350px] h-[473px] rounded-[20px]" src={`${IMG_URL}${featuredMovie.poster_path}`} />
                    <View className="absolute bottom-5 left-5 right-5 flex-row">
                        <TouchableOpacity className="bg-white w-[164px] ml-[8px] h-[48px] justify-center items-center rounded">
                            <Text className="text-black text-[16px] font-bold">Play</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Details", { id: featuredMovie.id, type: featuredMovie.media_type })} className="bg-[#515451] w-[159px] ml-[10px] h-[48px] justify-center items-center rounded">
                            <Text className="text-white text-[16px] font-bold">More Info</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>            
            )}

            <View className="ml-[19px] mt-[11px]">
                <Text className="text-white text-[20px]">Trending Movies</Text>
                <CommonFlatList data={movies.slice(1)} />
            </View>
            
            <View className="ml-[19px] mt-[11px]">
                <Text className="text-white text-[20px] mt-5">Popular TV Shows</Text>
                <CommonFlatList data={shows} />
            </View> 

        </ScrollView>
    );
};

export default Home;