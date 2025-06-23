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
      style={styles.container}
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
  container: {
    flex: 1,
    backgroundColor: '#ffffffDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '90%',
  },
  label: {
    fontFamily: 'Pacifico-Regular',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 5,
    color: '#102441',
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Pacifico-Regular',
    fontSize: 20,
    color: 'black',
  },
});
