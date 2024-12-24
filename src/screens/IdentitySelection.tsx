import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setGender } from '../app/userSlice';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const IdentitySelection = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [selectedGender, setSelectedGender] = useState(null);

    const handleContinue = () => {
        if (selectedGender) {
            dispatch(setGender(selectedGender));
            navigation.navigate('Profile');
        } else {
            Alert.alert('Please select an option.');
        }
    };

    const genders = [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
        { label: 'Non-Binary', value: 'non-binary' },
        { label: 'Other', value: 'other' },
    ];

    return (
        <View style={styles.container}>
           
            <View style={styles.progressContainer}>
                <View style={styles.progressBar} />
            </View>

            <Text style={[styles.title, { marginTop: 80 }]}>
                Choose the <Text style={styles.highlight}>Identity</Text> That
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Text style={[styles.title, { marginBottom: 16, }]}>
                    Feels Right For
                </Text>

                <View>
                    <Text style={{ color: "#000", fontSize: 24 }}> You?</Text>
                    <Image source={require('../assets/icon.png')} style={styles.image} />
                </View>
            </View>

            <View style={styles.optionsContainer}>
                {genders.map((gender) => (
                    <TouchableOpacity
                        key={gender.value}
                        style={styles.optionWrapper}
                        onPress={() => setSelectedGender(gender.value)}
                    >
                        <LinearGradient
                            colors={
                                selectedGender === gender.value
                                    ? ['#FFA17F', '#FF7DFF']
                                    : ['#F6F6F6', '#F6F6F6']
                            }
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[
                                styles.option,
                                selectedGender === gender.value && styles.selectedOption,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    selectedGender === gender.value && styles.selectedOptionText,
                                ]}
                            >
                                {gender.label}
                            </Text>
                            {selectedGender === gender.value && (
                                <Image
                                    source={require('../assets/checkmark.png')}
                                    style={styles.checkmark}
                                />
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinue} style={styles.footer}>
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
        padding: 20
    },
    progressContainer: {
        height: 5,
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        marginTop: 60,
        marginHorizontal: 10
    },
    progressBar: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFA17F',
        borderRadius: 5,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: '#4A4A4A',
    },
    highlight: {
        color: '#FF7DFF',
        fontWeight: "600"
    },
    optionsContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 30
    },
    optionWrapper: {
        width: '90%',
        marginVertical: 10,
        borderRadius: 25,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    selectedOption: {
        borderColor: '#FF8A65',
    },
    optionText: {
        fontSize: 18,
        color: '#4A4A4A',
    },
    selectedOptionText: {
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    checkmark: {
        width: 20,
        height: 20,
        tintColor: '#FFFFFF',
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

export default IdentitySelection;
