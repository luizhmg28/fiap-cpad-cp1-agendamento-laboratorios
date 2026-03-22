import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

export default function Agendar() {
  const [unidade, setUnidade] = useState(null);
  const [lab, setLab] = useState(null);
  const [data, setData] = useState(null);
  const [horario, setHorario] = useState(null);

  const horariosDisponiveis = [
    { hora: '07:00', ocupado: true },
    { hora: '08:00', ocupado: true },
    { hora: '09:00', ocupado: true },
    { hora: '10:00', ocupado: false },
    { hora: '11:00', ocupado: false },
    { hora: '12:00', ocupado: true },
    { hora: '13:00', ocupado: false },
    { hora: '14:00', ocupado: false },
    { hora: '15:00', ocupado: false },
    { hora: '16:00', ocupado: false },
    { hora: '17:00', ocupado: false },
    { hora: '18:00', ocupado: false },
    { hora: '19:00', ocupado: false },
    { hora: '20:00', ocupado: false },
    { hora: '21:00', ocupado: false },
    { hora: '22:00', ocupado: false },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* UNIDADE */}
      <Text style={styles.label}>Unidade</Text>
      <View style={styles.card}>
        <RNPickerSelect
          onValueChange={setUnidade}
          placeholder={{ label: 'Selecione...', value: null }}
          items={[
            { label: 'Lins de Vasconcelos', value: '0' },
            { label: 'FIAP Paulista', value: '1' },
          ]}
          style={pickerStyle}
          useNativeAndroidPickerStyle={false}
          Icon={() => <Ionicons name="chevron-down" size={20} color="#9CA3AF" />}
        />
      </View>

      {/* LAB */}
      <Text style={styles.label}>Laboratório</Text>
      <View style={styles.card}>
        <RNPickerSelect
          onValueChange={setLab}
          placeholder={{ label: 'Selecione...', value: null }}
          items={[
            { label: 'MakerLab', value: 'MakerLab' },
            { label: 'Laboratório 502', value: '502' },
          ]}
          style={pickerStyle}
          useNativeAndroidPickerStyle={false}
          Icon={() => <Ionicons name="chevron-down" size={20} color="#9CA3AF" />}
        />
      </View>

      {/* CALENDÁRIO */}
      <Text style={styles.label}>Data</Text>
      <View style={styles.card}>
        <Calendar
          onDayPress={(day) => setData(day.dateString)}
          markedDates={{
            [data]: {
              selected: true,
              selectedColor: '#EA1463',
            },
          }}
          theme={{
            todayTextColor: '#EA1463',
            arrowColor: '#EA1463',
            selectedDayBackgroundColor: '#EA1463',
          }}
        />
      </View>

      {/* HORÁRIOS */}
      <Text style={styles.label}>Horários</Text>
      <View style={styles.card}>
        <View style={styles.horariosContainer}>
          {horariosDisponiveis.map((h) => (
            <TouchableOpacity
              key={h.hora}
              disabled={h.ocupado}
              style={[
                styles.horario,
                h.ocupado && styles.horarioOcupado,
                horario === h.hora && styles.horarioSelecionado,
              ]}
              onPress={() => setHorario(h.hora)}
            >
              <Text
                style={[
                  styles.horarioTexto,
                  h.ocupado && styles.textoOcupado,
                  horario === h.hora && styles.textoSelecionado,
                ]}
              >
                {h.hora}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* BOTÃO */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F3F4F6',
  },

  label: {
    marginTop: 12,
    marginBottom: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  horariosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  horario: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },

  horarioOcupado: {
    backgroundColor: '#E5E7EB',
  },

  horarioSelecionado: {
    backgroundColor: '#EA1463',
  },

  horarioTexto: {
    fontWeight: '600',
  },

  textoOcupado: {
    color: '#9CA3AF',
  },

  textoSelecionado: {
    color: '#fff',
  },

  button: {
    marginTop: 25,
    backgroundColor: '#EA1463',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',

    shadowColor: '#EA1463',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const pickerStyle = {
  inputIOS: {
    fontSize: 16,
    color: '#111',
    paddingVertical: 10,
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    color: '#111',
    paddingVertical: 10,
    paddingRight: 30,
  },
  placeholder: {
    color: '#9CA3AF',
  },
  iconContainer: {
    top: 12,
    right: 10,
  },
};