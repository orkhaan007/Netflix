import { Text, View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import YoutubePlayer from "react-native-youtube-iframe"
import { useMMKVString } from 'react-native-mmkv';
import { IP_URL } from "@env"

const Details = () => {
    const route = useRoute();
    const { id, type } = route.params;
    const [data, setData] = useState({});
    const [trailerKey, setTrailerKey] = useState("");
    const [accessToken] = useMMKVString("token");

    const getData = async () => {
        try {
            const response = await fetch(`${IP_URL}/${type}/${id}/details`);
            const result = await response.json();
            setData(result.content);
        } catch (error) {
            console.error(error);
        }
    };

    const getTrailers = async () => {
        try {
            const response = await fetch(`${IP_URL}/${type}/${id}/trailers`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            const result = await response.json();
            setTrailerKey(result.trailers[0].key);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData()
        getTrailers()
    }, []);

    console.log(trailerKey)

    return (
        <View className='bg-black flex-1'>
            <YoutubePlayer height={400} videoId={trailerKey} />
            <Text className='text-white text-[36px] font-normal'>{type === "movie" ? data.title : data.name} </Text>
            <Text className='text-[14px] text-white'>{data.overview}</Text>
            <Text className='text-[20px] text-white font-normal font-["Roboto"]'>{type === "movie" ? "Similar Movies" : "Similar Tv Shows"}</Text>
        </View>
    );
};

export default Details;