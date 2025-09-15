// Styles til formular
import { StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export const formStyles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  title: { fontSize: 22, fontWeight: '600' },
  input: { borderWidth: StyleSheet.hairlineWidth, borderColor: '#d1d5db', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#fff' },
  button: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '600' },
  fieldLabel: { fontSize: 12, color: '#6b7280' },
});
