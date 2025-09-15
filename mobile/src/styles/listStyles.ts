// Styles til liste (history)
import { StyleSheet } from 'react-native';

export const listStyles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 12, elevation: 2 },
  splitRow: { flexDirection: 'row', gap: 12, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#e5e7eb', paddingTop: 8 },
  kvRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  kvLabel: { color: '#6b7280' },
  kvValue: { fontWeight: '500' },
});
