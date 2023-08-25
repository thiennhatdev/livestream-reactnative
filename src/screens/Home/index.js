import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { Button, FlatList, Platform, SafeAreaView, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  useInfiniteQuery
} from 'react-query';
// import PostItem from '../../components/PostItem';
// import UserSelectFile from '../../components/UserSelectFile';

// import { getImages } from '../../apis/image';
// import SkeletonPost from '../../components/Skeleton/SkeletonPost';
import styles from './style';
import NetworkLogger from 'react-native-network-logger';
import { AppContext } from '../../../App';
import { useTranslation, initReactI18next } from "react-i18next";

// livestream package
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import IRtcEngine, { RtcSurfaceView, RtcTextureView, ClientRoleType, ChannelProfileType, createAgoraRtcEngine, RtcLocalView, RtcRemoteView, RenderModeType, VideoSourceType, CameraCapturerConfiguration, CameraDirection } from "react-native-agora";
import { AGORA_APP_ID } from "@env";
import requestCameraAndAudioPermission from '../../hooks/requestCameraAndAudioPermission';
import { getAllChanelLivestream } from '../../apis/livestream';




let Home = (props) => {
  const { t, i18n } = useTranslation();

  const { navigation } = props;
  const focus = useIsFocused();
  const AgoraEngine = useRef();

  // const isBroadcaster = props.route.params.type === "create";
  const isBroadcaster = true;

  const [firstFetching, setFirstFetching] = useState(true);
  const [isEndContent, setIsEndContent] = useState(false);
  const { userAfterLogin, setUserAfterLogin } = useContext(AppContext);
  const [params, setParams] = useState({
    populate: {
      userId: {
        populate: "*"
      },
      likes: {
        populate: "*"
      },
      link: {
        populate: "*"
      },
      comments: {
        // populate: "*"
        populate: {
          comments: {
            populate: {
              likes: "*"
            }
          },
          likes: {
            populate: "*"
          }
        }
      }
    },
    sort: "createdAt:desc",
    pagination: {
      pageSize: 10,
    }
  })

  const [joinedChannel, setJoinedChannel] = useState(false);

  const [allPages, setAllPages] = useState(0);

  // const { isLoading, isFetching, isSuccess, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
  //   ['images', focus, userAfterLogin],
  //   async ({ pageParam = 1 }) => getImages(params, pageParam),
  //   {
  //     onSuccess: () => {
  //       setFirstFetching(false)
  //     },
  //     getNextPageParam: (lastPage) => {
  //       return lastPage.pageParam < allPages
  //         ? lastPage.pageParam + 1
  //         : false;
  //     },
  //   }
  // );
  // const total = data?.pages[0].data.meta.pagination.total;
  // const totalPage = Math.ceil(total / params.pagination.pageSize)
 
  // useEffect(() => {
  //   if (isSuccess) {
  //     setAllPages(totalPage)
  //   }
  // }, [isSuccess, totalPage]);

  // const loadMore = () => {
  //   if (hasNextPage) {
  //     fetchNextPage();
  //   } else {
  //     if (!isFetching) {
  //       setIsEndContent(true)
  //     }
  //   }
  // };



  const engine = createAgoraRtcEngine();

  const onSwitchCamera = () => {
    console.log(AgoraEngine.current, 'AgoraEngine.current...........')
    AgoraEngine.current.switchCamera();
  }
  

  const init = async () => {
    console.log(AGORA_APP_ID, 'AGORA_APP_ID')
    AgoraEngine.current = engine;
    // const r = AgoraEngine.current.release();

    AgoraEngine.current.initialize({appId: AGORA_APP_ID});
    // const h = AgoraEngine.current.enableLocalVideo(true);
    // console.log(h, 'hhhhhh')
    
    
    // const p = AgoraEngine.current.startPreview()
    // console.log(p,'pppppp')
    // const e = AgoraEngine.current.enableVideo();
    // console.log(e, 'eeeeee')

    // const c = AgoraEngine.current.startCameraCapture(VideoSourceType.VideoSourceCameraPrimary, {
    //   cameraDirection: CameraDirection.CameraFront
    // })
    // console.log(c, 'cccc')

    AgoraEngine.current.setChannelProfile(ChannelProfileType.ChannelProfileCommunication);
    // không cần set nếu là người xem live
    if (isBroadcaster) {
      console.log(ClientRoleType.ClientRoleBroadcaster, 'ClientRoleType.ClientRoleBroadcaster')
      // AgoraEngine.current.setClientRole(ClientRoleType.ClientRoleBroadcaster);
    }

    AgoraEngine.current.addListener("onJoinChannelSuccess", (connection, elapsed) =>
      {
        console.log("onJoinChannelSuccess", connection, elapsed)
        setJoinedChannel(true)
      }
    );

    AgoraEngine.current.addListener("onUserJoined", (connection, remoteUid, elapsed) =>
      {
        console.log("onUserJoined", connection, remoteUid, elapsed)
      }
    );

    
    
    console.log(AgoraEngine.current, 'AgoraEngine.current')

  };

  const initLivestream = useCallback(async () => {
    if (Platform.OS === 'android') await requestCameraAndAudioPermission();
    const uid = isBroadcaster ? 1 : 0;
  init().then(() => {
    console.log('then join channel', uid)
    // if (state == 2) {
      const tokenAgora = `007eJxTYIiKPZro/cqg1PCI95c5i6u+vWf1sf5adSdvhf+TpStOsWxQYDBMTDFNTEqzMDZOTDNJNjezNDA1TTRPNUsyTU62BHJ4zz1NaQhkZLgvlMXCyACBID4LQ0lqcQkDAwDrPiGb`;
    // const a = AgoraEngine.current.joinChannel(tokenAgora, 'test', uid, null)
    
    const p = AgoraEngine.current.joinChannel(tokenAgora, 'test', 5, null)
    
  console.log( p, 'aaaaaa + pppppppppp' )

  
    // }
  AgoraEngine.current.addListener("onConnectionStateChanged", (connection, state, reason) =>
  {
    
  console.log("onConnectionStateChanged", connection, state, reason)

  }
    );
  });
    // const result = await launchCamera({
    //   mediaType: "video"
    // });

  }, [])

  useEffect(() => {
    initLivestream()
  
    
  }, [ initLivestream])

  useEffect(() => {
  //   if (Platform.OS === 'android') requestCameraAndAudioPermission();
  //   const uid = isBroadcaster ? 1 : 0;
  // init().then(() => AgoraEngine.current.joinChannel(null, 5, null, uid));
    
  return () => {
      console.log('destroy')
      // AgoraEngine.current.destroy();
      // AgoraEngine.current.stopPreview()
    }
  }, [])

  return (
    <SafeAreaView style={styles.wrapper}>
        <View style={styles.contentHome}>
          <Text>{t('hello')}</Text>
          <Button title="Switch camera" onPress={onSwitchCamera} />
          {isBroadcaster && joinedChannel && (
            <RtcSurfaceView
              // style={styles.fullscreen} 
              connection={{
                // channelId: 'test',
                // localUid: 1
              }}
              canvas={{
                // mediaPlayerId: '123',
                // renderMode: RenderModeType.RenderModeHidden,
                // uid: 0,
              }}
            />
          )}
          <Button 
            onPress={() => {
              const p = AgoraEngine.current.stopPreview()
              AgoraEngine.current.enableLocalVideo(true)
              console.log(p, 'stop preview')
            }}
            title="Stop Preview" />
            <Button 
            onPress={() => {
              const p = AgoraEngine.current.enableLocalVideo(false)
              console.log(p, 'stop live')
            }}
            title="Stop Live" />
            <Button 
            onPress={() => {
              const p = AgoraEngine.current.leaveChannel()
              console.log(p, 'leave channel ')
            }}
            title="Leave channel" />
          <Button 
            onPress={() => {
              const p = AgoraEngine.current.enableVideo()
              console.log(p, 'start live')
            }}
            title="Start Live" />
            <Button 
            onPress={async () => {
              const data = await getAllChanelLivestream(AGORA_APP_ID);
              console.log(data?.data, 'list livestream')

            }}
            title="Get Channels" />
          <TextInput 
          placeholder="Live Id"
          />
          <Button 
            onPress={() => {

            }}
            title="Join" 
            />

          {/* <FlatList
            data={data?.pages.map(page => page.data.data).flat()}
            renderItem={({ item }) => {
              return isFetching && firstFetching ? <SkeletonPost /> : <PostItem item={item} navigation={navigation} />
            }}
            keyExtractor={item => item.id}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            ListHeaderComponent={<UserSelectFile navigation={navigation} />}
            ListFooterComponent={
              isEndContent ?
              <View style={styles.emptyContent}>
                <Icon name="warning" size={20} style={styles.warningIcon} />
                <Text style={styles.emptyText}>Bạn đã xem hết rồi!</Text>
              </View>
              : null
            }
          /> */}
        </View>
    </SafeAreaView>
  )
}

// Home = () => <NetworkLogger />;

export default Home