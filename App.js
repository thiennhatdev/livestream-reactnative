import 'intl-pluralrules'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { createContext, useMemo } from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import TopLogo from './src/components/TopLogo';
import TopHeader from './src/components/TopHeader';
import { Text, TouchableOpacity } from 'react-native';
import resources from './src/locales';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb) => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};
console.log(resources, 'initReactI18next')
i18next
  // .use(languageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    debug: true,
    resources
  });
// startNetworkLogging();

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

const queryClient = new QueryClient();

export const AppContext = createContext({
  userAfterLogin: '',
  setUserAfterLogin: () => {},
})



export default function App() {
  const { t, i18n } = useTranslation();

  const [userInfo, setUserInfo] = useState(false);
  const [userAfterLogin, setUserAfterLogin] = useState(null);
  
  const value = useMemo(
    () => ({ userAfterLogin, setUserAfterLogin }), 
    [userAfterLogin]
  );

  const fetchUserInfo = useCallback(async () => {
    const user = await AsyncStorage.getItem('user_info');
    const parseUser = JSON.parse(user);
    setUserInfo(parseUser);
    setUserAfterLogin(parseUser)
  }, [])

  useEffect(() => {
      fetchUserInfo();
  }, [fetchUserInfo])
  console.log('render again', t('change'))

  return (
      <AppContext.Provider value={value}>
        {useMemo(() => (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <QueryClientProvider client={queryClient} >
          <TopLogo />
          <TopHeader />
          <Text style={{ fontSize: 20, marginBottom: 20 }}>{t('hello')}</Text>

      <TouchableOpacity onPress={() => i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en')}>
        <Text>{t('change')}</Text>
      </TouchableOpacity>
        </QueryClientProvider>
      </SafeAreaProvider>
       ), [t])}
      </AppContext.Provider>
  )
}
