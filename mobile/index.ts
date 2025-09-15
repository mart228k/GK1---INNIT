// Dette er indgangspunktet for appen.
// registerRootComponent fortæller Expo/React Native hvilken komponent der er selve appen.
import { registerRootComponent } from 'expo';

import App from './App'; // Vores app-komponent med navigation og skærme

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App); // Start appen med <App /> som rod
