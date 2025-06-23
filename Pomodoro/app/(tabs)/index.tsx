// app/(tabs)/index.tsx
import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useFonts } from 'expo-font';
import { useLocalSearchParams, Link } from 'expo-router';
import TimerArc from '../../components/ui/TimerArc';

export default function PomodoroScreen() {
  const params = useLocalSearchParams();
  const session = Number(params.session) || 25;
  const roundTotal = Number(params.rounds) || 4;
  const breakMinutes = Number(params.break) || 5;
  const autoStart = params.autoStart === 'true';

  const [timeLeft, setTimeLeft] = useState(session * 60);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [round, setRound] = useState(1);
  const [onBreak, setOnBreak] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [fontsLoaded] = useFonts({
    Pacifico: require('../../assets/fonts/Pacifico-Regular.ttf'),
  });

  // Когато се сменят параметрите, рестартираме
  useEffect(() => {
    setTimeLeft(session * 60);
    setRound(1);
    setIsRunning(autoStart);
    setOnBreak(false);
  }, [session, roundTotal, breakMinutes, autoStart]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft <= 0) {
      playSound();

      if (!onBreak) {
        // Ако не сме на почивка - преминаваме към почивка
        setTimeLeft(breakMinutes * 60);
        setOnBreak(true);
        setIsRunning(autoStart); // или true за auto старт почивка
      } else {
        // Край на почивката
        if (round < roundTotal) {
          setRound(r => r + 1);
          setTimeLeft(session * 60);
          setOnBreak(false);
          setIsRunning(autoStart); // или true
        } else {
          // Всички рундове свършиха
          setIsRunning(false);
          setOnBreak(false);
          setRound(1);
          setTimeLeft(session * 60);
        }
      }
    }
  }, [timeLeft]);

  const soundRef = useRef<Audio.Sound | null>(null);

  // Освобождаване на ресурси при unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, []);

  const playSound = async () => {
    // Ако има вече зареден звук, освобождаваме го първо
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    const { sound } = await Audio.Sound.createAsync(require('../../assets/alarm.mp3'));
    soundRef.current = sound;

    await sound.playAsync();

    // Спираме звука след 7 секунди и освобождаваме ресурси
    setTimeout(async () => {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    }, 7000);
  };

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <Link href="/(tabs)/settings" asChild>
        <TouchableOpacity style={styles.settingsIcon}>
          <Text style={{ fontSize: 24 }}>☰</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.time}>
        {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
      </Text>
      <TimerArc progress={1 - timeLeft / ((onBreak ? breakMinutes : session) * 60)} />
      <Text style={styles.round}>
        {round}/{roundTotal} {onBreak ? '(Break)' : ''}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsRunning(prev => !prev)}
      >
        <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, alignItems: 'center', justifyContent: 'center', },
  time: {
    fontFamily: 'Pacifico',
    fontSize: 64,
    color: '#FFFFF0',
    position: 'absolute', 
    top: '22%',
  },
  round: {
    marginTop: 20,
    fontSize: 32,
    fontFamily: 'Pacifico',
    color: '#FFFFF0',
    position: 'absolute', 
    top: '47%',
  },
  button: {
    position: 'absolute',
    bottom: '7%',           // 75% отгоре (или 25% от долу)
    alignSelf: 'center',     // центриране по хоризонтала
    width: 227,
    height: 59,
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    justifyContent: 'center', // центриране вертикално на текста
    alignItems: 'center', 
  },
  buttonText: {
    fontFamily: 'Pacifico',
    fontSize: 24,
    color: 'black',
  },
  settingsIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});
