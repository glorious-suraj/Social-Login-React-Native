import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setUserData } from '../app/userSlice';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { firebaseConfig } from '../../config/firebaseConfig';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

GoogleSignin.configure({
    webClientId: firebaseConfig.webClientId,
});

const SignUp = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.signOut();

            await GoogleSignin.hasPlayServices();

            const response = await GoogleSignin.signIn();

            const { idToken } = response.data;

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const userCredential = await auth().signInWithCredential(googleCredential);

            const user = userCredential.user;
            dispatch(setUserData({ name: user.displayName, email: user.email, profilePic: user.photoURL }));

            navigation.navigate('NameInput');
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };


    const fbLogin = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                console.log("Facebook Login was cancelled.");
                return;
            }

            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                console.log("Failed to get access token from Facebook.");
                return;
            }

            const response = await axios.get(
                `https://graph.facebook.com/v2.5/me`,
                {
                    params: {
                        fields: 'email,first_name,last_name,picture',
                        access_token: data.accessToken,
                    },
                }
            );

            const userInfo = response.data;

            const name = `${userInfo.first_name} ${userInfo.last_name}`;
            const email = userInfo.email || "No email provided";
            const profilePic = userInfo.picture?.data?.url;

            dispatch(setUserData({ name, email, profilePic }));

            navigation.navigate('NameInput');
        } catch (error) {
            console.error("Facebook Login Error:", error);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.progressContainer}>
                <View style={styles.progressBar} />
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>
                    Begin <Text style={{ color: "#FF7DFF" }}>Your</Text>
                </Text>
                <Text style={styles.title}>
                    <Text style={[styles.boldText, { color: "#FFA17F" }]}>Mindful <Text style={{ color: "#FF7DFF" }}>Journey</Text></Text>
                </Text>
                <Text style={styles.subtitle}>
                    Log In Or Sign Up To Begin Your Journey With Personalized, Human-Like Wellness Support
                </Text>
            </View>

            <LinearGradient
                colors={['#FFA17F', '#FF7DFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.footer}
            >

                <TouchableOpacity style={styles.appleButton}>
                    <Image source={require('../assets/apple.png')} style={{ width: 20, height: 20 }} />
                    <Text style={styles.appleButtonText}>Continue With Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                    <Image source={require('../assets/google.png')} style={{ width: 20, height: 20 }} />
                    <Text style={styles.googleButtonText}>Continue With Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.facebookButton} onPress={fbLogin}>
                    <Text style={styles.facebookButtonText}>Continue With Facebook</Text>
                </TouchableOpacity>

                <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>Or</Text>
                    <View style={styles.line} />
                </View>

                <Text style={styles.terms}>
                    I agree to{' '}
                    <Text style={styles.link}>Privacy Policy</Text> &{' '}
                    <Text style={styles.link}>Terms of Service</Text>
                </Text>
            </LinearGradient>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
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
        width: '25%',
        height: '100%',
        backgroundColor: '#FFA17F',
        borderRadius: 5,
    },
    header: {
        flex: 2,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 75
    },
    title: {
        fontSize: 40,
        fontWeight: '400',
        textAlign: 'center',
        color: '#FFA17F',
    },
    boldText: {
        fontWeight: '700',
        color: '#FF7DFF',
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        marginTop: 10,
        textAlign: 'center',
    },
    footer: {
        flex: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    pagination: {
        marginVertical: 10,
    },
    appleButton: {
        backgroundColor: '#000',
        width: '90%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    appleButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    googleButton: {
        backgroundColor: '#FFF',
        width: '90%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#FF7DFF',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    googleButtonText: {
        color: '#0000008A',
        fontSize: 16,
        fontWeight: '600',
    },
    facebookButton: {
        backgroundColor: '#1877F2',
        width: '90%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    facebookButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: '90%',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#FFFFFF',
        opacity: 0.5,
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '500',
    },

    terms: {
        marginTop: 20,
        fontSize: 12,
        textAlign: 'center',
        color: '#FFF',
    },
    link: {
        textDecorationLine: 'underline',
    },
});

export default SignUp;
