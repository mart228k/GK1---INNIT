// Formular til at oprette en ny transport (simpel state + let validering).
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import type { Trip } from '../types';
import { formStyles as styles } from '../styles/formStyles';

interface Props {
  onAddTrip: (trip: Trip) => void;
}

export default function TripFormScreen({ onAddTrip }: Props) {
  const [form, setForm] = useState({
    from: '',
    to: '',
    legalOwner: '',
    numberOfHorses: '',
    date: '',
    departureTime: '',
    expectedDurationHours: '',
    expectedDurationMinutes: '',
    notes: '',
  });

  // helper til felt-opdatering
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  // Gem + basic validering
  const submit = () => {
    if (!form.from || !form.to || !form.legalOwner || !form.numberOfHorses || !form.date) {
      Alert.alert('Missing info', 'Please fill out required fields.');
      return;
    }
    const trip: Trip = {
      id: Date.now().toString(),
      from: form.from,
      to: form.to,
      legalOwner: form.legalOwner,
      numberOfHorses: parseInt(form.numberOfHorses) || 0,
      date: form.date,
      departureTime: form.departureTime,
      expectedDurationHours: parseInt(form.expectedDurationHours) || 0,
      expectedDurationMinutes: parseInt(form.expectedDurationMinutes) || 0,
      notes: form.notes || undefined,
    };
  onAddTrip(trip); // push til liste i App
    setForm({
      from: '', to: '', legalOwner: '', numberOfHorses: '', date: '', departureTime: '', expectedDurationHours: '', expectedDurationMinutes: '', notes: '',
    });
    Alert.alert('Saved', 'Transport saved. Check History.');
  };

  return (
  <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Horse Transport</Text>

      <Field label="From *">
        <TextInput value={form.from} onChangeText={(t) => update('from', t)} placeholder="Starting location" style={styles.input} />
      </Field>
      <Field label="To *">
        <TextInput value={form.to} onChangeText={(t) => update('to', t)} placeholder="Destination" style={styles.input} />
      </Field>
      <Field label="Legal Owner *">
        <TextInput value={form.legalOwner} onChangeText={(t) => update('legalOwner', t)} placeholder="Owner name" style={styles.input} />
      </Field>
      <Field label="Number of Horses *">
        <TextInput value={form.numberOfHorses} onChangeText={(t) => update('numberOfHorses', t)} placeholder="1" keyboardType="number-pad" style={styles.input} />
      </Field>
      <Field label="Date * (YYYY-MM-DD)">
        <TextInput value={form.date} onChangeText={(t) => update('date', t)} placeholder="2025-09-12" style={styles.input} />
      </Field>
      <Field label="Departure Time (HH:mm)">
        <TextInput value={form.departureTime} onChangeText={(t) => update('departureTime', t)} placeholder="09:00" style={styles.input} />
      </Field>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Field label="Duration Hours">
            <TextInput value={form.expectedDurationHours} onChangeText={(t) => update('expectedDurationHours', t)} placeholder="0" keyboardType="number-pad" style={styles.input} />
          </Field>
        </View>
        <View style={{ flex: 1 }}>
          <Field label="Duration Minutes">
            <TextInput value={form.expectedDurationMinutes} onChangeText={(t) => update('expectedDurationMinutes', t)} placeholder="0" keyboardType="number-pad" style={styles.input} />
          </Field>
        </View>
      </View>

      <Field label="Notes">
        <TextInput value={form.notes} onChangeText={(t) => update('notes', t)} placeholder="Additional details..." style={[styles.input, { height: 80 }]} multiline />
      </Field>

      <Pressable style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Save Transport</Text>
      </Pressable>
    </ScrollView>
  );
}

// Genbrugt felt-wrapper (label + input)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}
// styles moved to ../styles/formStyles
