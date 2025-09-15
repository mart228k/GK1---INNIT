// Liste over transporter (sorteret nyeste først) med lidt human dato/tid format.
import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import type { Trip } from '../types';
import { listStyles as styles } from '../styles/listStyles';

interface Props {
  trips: Trip[];
}

export default function TripsListScreen({ trips }: Props) {
  // sortér nyeste først
  const sorted = useMemo(() => [...trips].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [trips]);

  // format tid fra HH:mm
  const formatTime = (t: string) => {
    if (!t) return '';
    const d = new Date(`1970-01-01T${t}`);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // human label for dato
  const formatDateHuman = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transport History</Text>
      <Text style={{ color: '#6b7280', marginBottom: 8 }}>{trips.length} {trips.length === 1 ? 'transport' : 'transports'} recorded</Text>

  {/* FlatList */}
      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#6b7280' }}>{formatDateHuman(item.date)}</Text>
              <Text style={{ backgroundColor: '#f3f4f6', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, fontSize: 12 }}>{new Date(item.date).toLocaleDateString([], { weekday: 'short' })}</Text>
            </View>

            <View style={{ marginTop: 8 }}>
              <KVR label="From" value={item.from} />
              <KVR label="To" value={item.to} />
            </View>

            <View style={styles.splitRow}>
              <KVR label="Owner" value={item.legalOwner} compact />
              <KVR label="Horses" value={String(item.numberOfHorses)} compact />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              {!!item.departureTime && (
                <Text><Text style={{ color: '#6b7280' }}>Departure: </Text>{formatTime(item.departureTime)}</Text>
              )}
              {(item.expectedDurationHours > 0 || item.expectedDurationMinutes > 0) && (
                <Text>
                  <Text style={{ color: '#6b7280' }}>Duration: </Text>
                  {(item.expectedDurationHours > 0 ? `${item.expectedDurationHours}h ` : '') + (item.expectedDurationMinutes > 0 ? `${item.expectedDurationMinutes}m` : '')}
                </Text>
              )}
            </View>

            {!!item.notes && (
              <View style={{ borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#e5e7eb', marginTop: 8, paddingTop: 8 }}>
                <Text style={{ color: '#6b7280' }}>{item.notes}</Text>
              </View>
            )}
          </View>
        )}
  // tom liste
        ListEmptyComponent={
          <View style={styles.card}><Text style={{ color: '#6b7280' }}>No transports recorded yet.</Text></View>
        }
        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
      />
    </View>
  );
}

// Key/Value række
function KVR({ label, value, compact }: { label: string; value: string; compact?: boolean }) {
  return (
    <View style={[styles.kvRow, compact && { paddingVertical: 4 }]}> 
      <Text style={styles.kvLabel}>{label}</Text>
      <Text style={styles.kvValue}>{value}</Text>
    </View>
  );
}
// styles moved to ../styles/listStyles
