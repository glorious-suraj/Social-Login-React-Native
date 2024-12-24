import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../app/userSlice';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const { name, email, profilePic, ageGroup, gender } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogout = () => {
        dispatch(logout());
        navigation.navigate('SignUp'); 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Profile</Text>
            {profilePic && <Image source={{ uri: profilePic }} style={styles.profilePic} />}
            <Text style={styles.info}>Name: {name}</Text>
            <Text style={styles.info}>Email: {email}</Text>
            <Text style={styles.info}>Age Group: {ageGroup}</Text>
            <Text style={styles.info}>Gender: {gender}</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
    info: { fontSize: 18, marginBottom: 10 },
});

export default ProfileScreen;
