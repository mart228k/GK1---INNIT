// Styles til Home
import { StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export const homeStyles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  title: { fontSize: 22, fontWeight: '600' },
  subtitle: { color: '#6b7280' },
  row: { flexDirection: 'row', gap: 12 },
  card: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 12, elevation: 2 },
  cardLabel: { color: '#6b7280', fontSize: 12 },
  cardValue: { fontSize: 24, fontWeight: '700', marginTop: 4 },
  cardFull: { backgroundColor: '#fff', padding: 12, borderRadius: 12, elevation: 2 },
  kv: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  key: { color: '#6b7280' },
  val: { fontWeight: '500' },
  ctaButton: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  ctaButtonText: { color: 'white', fontWeight: '600' },
  logoWrap: { alignItems: 'center', marginTop: 8 },
  logo: { width: '100%', height: 80 },
});
