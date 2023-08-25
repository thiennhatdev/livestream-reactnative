import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import color from '../../commons/variable/color';
import styles from './style';


const ProfileLayout = (props) => {
    const { children, navigation } = props;

    return (
        <View style={styles.profileLayout}>
            <TouchableOpacity
                onPress={() => navigation.navigate('ProfileOptions')}>
                <View style={styles.wrapBack}>
                    <Icon name={"angle-left"} size={20} color={color.blue} />
                    <Text style={styles.backText}>Back</Text>
                </View>
            </TouchableOpacity>
            {children}
        </View>
    )
}

export default ProfileLayout;