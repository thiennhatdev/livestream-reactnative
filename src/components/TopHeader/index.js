import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    useQuery,
} from 'react-query';
// import Notification from '../../Screens/Notification';
import User from '../../screens/User';
import { getUnreadNotifications } from '../../apis/notifications';
import color from '../../commons/variable/color';
import variables from '../../constants/variables';
import { socket } from '../../hooks/socket';

import styles from './style';
import Home from '../../screens/Home';
import { AppContext } from '../../../App';


const Tab = createMaterialTopTabNavigator();

let TopHeader = (props) => {
    const { userAfterLogin, setUserAfterLogin } = useContext(AppContext);
    const [totalUnread, setTotalUnread] = useState(0);
    const [userInfo, setUserInfo] = useState(false);

    const [params, setParams] = useState({
        filters: {
            isRead: false,
            toUserId: ""
        },
        sort: "createdAt:desc",
        pagination: {
            // pageSize: 100,
        }
    })

    const { isLoading, isFetching, isSuccess, data, hasNextPage, fetchNextPage } = useQuery(
        {
            queryKey: ['unreadNotifications', params, userAfterLogin],
            queryFn: async () => {
                const toUserId = await AsyncStorage.getItem("user_info");
                const parseUser = JSON.parse(toUserId);

                if (parseUser) {
                    return getUnreadNotifications({
                        ...params,
                        filters: {
                            ...params.filters,
                            toUserId: parseUser?.id
                        }
                    })
                }
                

            },
            enabled: userAfterLogin ? true : false,
            onSuccess: (res) => {
                setTotalUnread(res?.meta?.pagination.total);
            },
        }
    );


    const connectSocket = useCallback(async () => {
        const token = await AsyncStorage.getItem('token')

        socket.on('connect', () => {
            socket.emit('verifyToken', {
                token: `${token}`,
                socketId: socket.id
            })
        })

        socket.emit('verifyToken', {
            token: `${token}`,
            socketId: socket.id
        })

        socket.on('receiveNoti', async (data) => {
            if (data.toUserId?.id === userInfo?.id) {
                setTotalUnread(totalUnread + 1)
            }
        })


    }, [])

    useEffect(() => {
        connectSocket()
    }, [connectSocket])

    useEffect(() => {
        
        return () => {
        }
    }, [])

    const fetchUserInfo = useCallback(async () => {
        const user = await AsyncStorage.getItem('user_info');
        const parseUser = JSON.parse(user);
        setUserInfo(parseUser);
    }, [])

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo])


    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    // tabBarBadge: () => {
                    //     return (  <Text>3</Text> )
                    // },
                    
                    tabBarIcon: ({ focused, size }) => {
                        let iconName;

                        switch (route.name) {
                            case variables.Home:
                                iconName = 'home';
                                break;
                            case variables.Notification:
                                iconName = 'bell';
                                break;
                            case variables.User:
                                iconName = 'user-circle-o';
                                break;
                            default:
                                break;
                        }

                        return(
                            <View style={styles.iconWrap}>
                                {
                                    (route.name === variables.Notification && totalUnread) ?
                                        <View style={styles.badgesWrap}>
                                            <Text style={styles.iconBadges}> { totalUnread }</Text>
                                        </View>
                                        : null
                                }
                                <Icon name={iconName} size={20} color={focused ? color.blue : 'gray'} />
                            </View>
                        )
                    },
                    // tabBarActiveTintColor: 'tomato',
                    // tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name={variables.Home} component={Home} />
                {/* {
                    userAfterLogin &&
                    <Tab.Screen name={variables.Notification} children={() => <Notification onReadNotiSuccess={() => setTotalUnread(0)} />}  />
                 }     */}
                <Tab.Screen name={variables.User} component={User} />
                {/* <Tab.Screen name={variables.ProfileDetail} component={ProfileDetail} /> */}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default TopHeader