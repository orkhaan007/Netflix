import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useMMKVString} from 'react-native-mmkv';

const Navigation = () => {
    const [token, setToken] = useMMKVString('token');

    return (
        <NavigationContainer>
            {token ? <HomeStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Navigation;