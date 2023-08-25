import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
// import Auth from '../../components/Auth';
// import Profile from '../../components/Profile';

const User = (props) => {
  const { navigation } = props;

  const focus = useIsFocused(); 

  const [userInfo, setUserInfo] = useState(false);

  const fetchUserInfo = useCallback(async () => {
    const userInfo = await AsyncStorage.getItem('user_info');
    setUserInfo(userInfo)
  }, [])

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo, focus])


  return (
    // !userInfo
    //   ? <Auth navigation={navigation} />
    //   : <Profile navigation={navigation} />
    <Text>user profile</Text>
    // : <Drawer.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
    //   <Drawer.Screen name="Profile" component={Profile} />
    //   <Drawer.Screen name="ProfileDetail" component={ProfileDetail} />
    // </Drawer.Navigator>
  )
}

export default User;