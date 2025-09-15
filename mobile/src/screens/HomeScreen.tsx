// Home: hurtig oversigt + genvej til at oprette ny transport.
import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { homeStyles as styles } from '../styles/homeStyles';
import type { Trip } from '../types'; // Datatypen for en transport (Trip)

interface Props {
  trips: Trip[];
}

export default function HomeScreen({ trips }: Props) {
  const navigation = useNavigation<any>(); // navigation mellem faner
  const totalTrips = trips.length; // antal transporter
  const totalHorses = trips.reduce((sum, t) => sum + t.numberOfHorses, 0); // samlet antal heste
  const now = new Date();
  // thisMonth ikke i brug visuelt pt., men gemmer hvordan jeg kan filtrere
  const thisMonth = trips.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const recentTrip = trips[trips.length - 1]; // seneste transport

  return (
    <View style={styles.container}>
  {/* Logo */}
      <View style={styles.logoWrap}>
        <Image
          source={require('../../assets/Fuldt logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
  {/* Titel + undertekst */}
      <Text style={styles.title}>Horse Transport Tracker</Text>
      <Text style={styles.subtitle}>Track horse transportation and logistics</Text>

  {/* Små kort med totals */}
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total Transports</Text>
          <Text style={styles.cardValue}>{totalTrips}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Horses Moved</Text>
          <Text style={styles.cardValue}>{totalHorses}</Text>
        </View>
      </View>

  {/* Seneste transport hvis der findes nogen */}
      {recentTrip ? (
        <View style={styles.cardFull}>
          <Text style={[styles.cardLabel, { marginBottom: 8 }]}>Recent Transport</Text>
          <View style={styles.kv}><Text style={styles.key}>From</Text><Text style={styles.val}>{recentTrip.from}</Text></View>
          <View style={styles.kv}><Text style={styles.key}>To</Text><Text style={styles.val}>{recentTrip.to}</Text></View>
          <View style={styles.kv}><Text style={styles.key}>Owner</Text><Text style={styles.val}>{recentTrip.legalOwner}</Text></View>
          <View style={styles.kv}><Text style={styles.key}>Horses</Text><Text style={styles.val}>{recentTrip.numberOfHorses}</Text></View>
          <View style={styles.kv}><Text style={styles.key}>Date</Text><Text style={styles.val}>{new Date(recentTrip.date).toLocaleDateString()}</Text></View>
        </View>
      ) : (
  // Tom tilstand
        <View style={styles.cardFull}>
          <Text style={[styles.cardLabel, { marginBottom: 8 }]}>No transports yet</Text>
          <Text style={{ color: '#6b7280' }}>Start by adding your first transport from the New tab.</Text>
        </View>
      )}

  {/* Knap til formular */}
      <Pressable style={styles.ctaButton} onPress={() => navigation.navigate('New')}>
        <Text style={styles.ctaButtonText}>Add New Transport</Text>
      </Pressable>
    </View>
  );
}

// styles moved to ../styles/homeStyles
