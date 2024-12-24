import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setAgeGroup } from '../app/userSlice';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const AgeSelection = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [selectedAge, setSelectedAge] = useState(null);

    const handleContinue = () => {
        if (selectedAge) {
            dispatch(setAgeGroup(selectedAge));

            navigation.navigate('IdentitySelection');
        } else {
            Alert.alert('Please select an age group.');
        }
    };

    const ageGroups = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55+'];

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <View style={styles.progressBar} />
            </View>
            <Text style={styles.header}>
                Great, Let’s make Mynd all about you!
            </Text>
            <Text style={styles.title}>
                How long have you been
            </Text>
            <Text style={[styles.title, { marginBottom: 40 }]}>
                rocking this{' '}
                <Text style={{ color: "#FFA17F", fontWeight: '600' }}>World?🎂</Text>
            </Text>
            <View style={styles.optionsContainer}>
                {ageGroups.map((age, index) => (
                    <TouchableOpacity
                        key={age}
                        style={styles.optionWrapper}
                        onPress={() => setSelectedAge(age)}>
                        {selectedAge === age ? (
                            <LinearGradient
                                colors={['#F7B174', '#F3A8CE']}
                                style={styles.option}>
                                <Text style={styles.selectedText}>{age}</Text>
                            </LinearGradient>
                        ) : (
                            <View style={styles.option}>
                                <Text style={styles.optionText}>{age}</Text>
                            </View>
                        )}
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
        width: '75%',
        height: '100%',
        backgroundColor: '#FFA17F',
        borderRadius: 5,
    },
    header: {
        marginTop: 70,
        marginBottom: 10,
        textAlign: "center"
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: '#4A4A4A',
    },
    highlight: {
        color: '#FF8A65',
    },
    optionsContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    optionWrapper: {
        width: '49%',
        marginVertical: 10,
    },
    option: {
        paddingVertical: 15,
        borderRadius: 25,
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 18,
        color: '#4A4A4A',
    },
    selectedText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
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
});

export default AgeSelection;
