// Dette er "hovedfilen" for mobil-appen (Expo/React Native).
// Den sætter navigation op (bund-faneblade), holder styr på data (trips)
// og peger på de tre skærme: Home, New (formular) og History (liste).
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Platform } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import TripFormScreen from './src/screens/TripFormScreen';
import TripsListScreen from './src/screens/TripsListScreen';
import { Ionicons } from '@expo/vector-icons'; // Ikoner til fanebladene (små billeder)
import type { Trip } from './src/types';
import { COLORS } from './src/theme'; // Her gemmer vi farver ét sted, så vi nemt kan ændre tema

// Dette beskriver hvilke faneblade (tabs) vi har, og hvilke parametre de evt. modtager
export type RootTabParamList = {
  Home: undefined;
  New: undefined;
  History: undefined;
};

// Vi laver en "Tab Navigator" – det er bundmenuen med 3 faner
const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  // Her gemmer vi alle transporter (trips) i hukommelsen (forsvinder når app genstartes)
  // Hvis du vil gemme dem permanent, kan vi tilføje AsyncStorage senere.
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: '1',
      from: 'Blue Hors, DK',
      to: 'Vilamoura Equestrian Center, PT',
      legalOwner: 'Blue Hors ApS',
      numberOfHorses: 6,
      date: '2024-12-10',
      departureTime: '09:00',
      expectedDurationHours: 12,
      expectedDurationMinutes: 30,
      notes: 'Show jumpers transport',
    },
    {
      id: '2',
      from: 'Stutteri Ask, DK',
      to: 'Oslo Horse Show, NO',
      legalOwner: 'Stutteri Ask A/S',
      numberOfHorses: 1,
      date: '2024-12-08',
      departureTime: '14:15',
      expectedDurationHours: 8,
      expectedDurationMinutes: 45,
      notes: 'Stævne',
    },
  ]);

  // Funktion som tilføjer en ny transport til listen
  const addTrip = (trip: Trip) => setTrips((prev) => [...prev, trip]);

  // Fælles indstillinger til alle faneblade (så vi ikke gentager kode)
  const screenOptions = useMemo(
    () => ({
      headerShown: true, // Vis en simpel header øverst
      tabBarActiveTintColor: COLORS.primary, // Aktiv fane er grøn (vores primærfarve)
    }),
    [] // Brug useMemo så objektet ikke laves forfra hele tiden
  );

  return (
    // NavigationContainer er "rammen" omkring hele navigationssystemet
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          ...screenOptions,
          tabBarIcon: ({ color, size }) => {
            // Vælg et ikon baseret på fanens navn.
            // "home" = et lille hus, "add-circle" = et plus i en cirkel, "list" = listeikon
            const iconName = route.name === 'Home'
              ? 'home'
              : route.name === 'New'
              ? 'add-circle'
              : 'list';
            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
        })}
      >
        {/* Første fane: Home – viser overblik og en knap til at oprette ny transport */}
        <Tab.Screen name="Home" options={{ title: 'Home' }}>
          {(props) => <HomeScreen {...props} trips={trips} />}
        </Tab.Screen>
        {/* Anden fane: New – formular til at oprette ny transport */}
        <Tab.Screen name="New" options={{ title: 'New Transport' }}>
          {(props) => <TripFormScreen {...props} onAddTrip={addTrip} />}
        </Tab.Screen>
        {/* Tredje fane: History – liste over alle transporter */}
        <Tab.Screen name="History" options={{ title: 'History' }}>
          {(props) => <TripsListScreen {...props} trips={trips} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
 
