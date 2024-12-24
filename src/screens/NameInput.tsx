import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { setUserData } from '../app/userSlice';
import { useNavigation } from '@react-navigation/native';

const NameInput = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [name, setName] = useState('');

    const handleNext = () => {
        if (name.trim() === '') {
            Alert.alert('Please enter your name');
            return;
        }

        dispatch(setUserData({ name }));
        navigation.navigate('AgeSelection');
    };

    return (
        <View style={styles.container}>
           
            <View style={styles.progressContainer}>
                <View style={styles.progressBar} />
            </View>

            <View style={styles.header}>
               <View>
                    <Text style={styles.subtitle}>Let's get to know each other</Text>
                    <Text style={styles.title}>
                        <Text style={styles.highlightedText}>What</Text> Should We Call{' '}
                    </Text>
               </View>

                <View>
                    <Text style={[styles.highlightedText, styles.title, { color: "#000", marginTop:45 }]}>You?</Text>
                <Image source={require('../assets/icon.png')} style={styles.image} />
                </View>

            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#aaa"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>

            <TouchableOpacity onPress={handleNext} style={styles.footer}>
                <LinearGradient
                    colors={['#FFA17F', '#FF7DFF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.continueButton}
                >
                    <View>
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    progressContainer: {
        height: 5,
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        marginTop: 85,
        marginHorizontal: 30
    },
    progressBar: {
        width: '50%',
        height: '100%',
        backgroundColor: '#FFA17F',
        borderRadius: 5,
    },
    header: {
        alignItems: 'center',
        justifyContent:"center",
        marginTop: 80,
        marginBottom: 50,
        flexDirection:"row"
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
        textAlign:"center",
        justifyContent:"center",
        marginLeft:40
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        color: '#444',
    },
    highlightedText: {
        fontWeight: '700',
        color: '#FFA17F',
    },
    inputContainer: {
        marginHorizontal: 30,
        marginBottom: 50,
    },
    input: {
        borderWidth: 0.7,
        borderColor: '#D3D8E0',
        borderRadius: 24,
        padding: 15,
        fontSize: 16,
        color: '#444',
        backgroundColor: '#fff',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
    },
    continueButton: {
        width: '100%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
    },
    image: {
        width: 55,
        height: 12,
        marginTop: 5, 
    },
});

export default NameInput;
