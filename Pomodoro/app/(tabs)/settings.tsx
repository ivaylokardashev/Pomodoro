// app/(tabs)/settings.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  const [sessionMinutes, setSessionMinutes] = useState('25');
  const [rounds, setRounds] = useState('4');
  const [breakMinutes, setBreakMinutes] = useState('5');

  const handleStart = () => {
  router.push({
    pathname: '/(tabs)',
    params: {
      session: sessionMinutes,
      rounds,
      break: breakMinutes,
      autoStart: 'true',
    },
  });
};

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.bg}
      imageStyle={{
        position: 'absolute',
        width: '145%',
        height: '100%',
      }}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.form}
      >
        <Text style={styles.label}>Session in Minutes</Text>
        <TextInput
          value={sessionMinutes}
          onChangeText={(text) => setSessionMinutes(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Rounds</Text>
        <TextInput
          value={rounds}
          onChangeText={(text) => setRounds(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Break in Minutes</Text>
        <TextInput
          value={breakMinutes}
          onChangeText={(text) => setBreakMinutes(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  form: {
    width: '75%',
    position: 'absolute',
    bottom: '7%',
  },
  label: {
    fontFamily: 'Pacifico',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 5,
    color: 'white',
  },
  input: {
    height: 50,
    width: 313,
    backgroundColor: 'rgba(217,217,217,0.8)',
    borderRadius: 15,
    fontFamily: 'Pacifico',
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    paddingTop: 8,
    lineHeight: 24,
    textAlignVertical: 'center', // за Android
    marginBottom: '5%',
  },
  button: {
    marginTop: '23%',
    width: 227,
    height: 59,
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', 
  },
  buttonText: {
    fontFamily: 'Pacifico',
    fontSize: 24,
    color: 'black',
  },
});
