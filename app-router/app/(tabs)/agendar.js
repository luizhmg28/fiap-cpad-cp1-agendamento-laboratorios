import { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { useRouter } from 'expo-router'
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { setRefresh } from '../../utils/refreshFlag';

const horariosBase = [
  '07:00','08:00','09:00','10:00','11:00','12:00',
  '13:00','14:00','15:00','16:00','17:00','18:00',
  '19:00','20:00','21:00','22:00'
];

export default function Agendar() {
  const [unidade, setUnidade] = useState(null);
  const [lab, setLab] = useState(null);
  const [data, setData] = useState(null);
  const [horario, setHorario] = useState(null);
  const [id, setId] = useState(0);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState(
    horariosBase.map(hora => ({ hora, ocupado: false }))
  );

  const router = useRouter();
  const carregarHorarios = async () => {
    if (!data || !lab || !unidade) return;

    const chave = `${data}-${lab}-${unidade}`;

    try {
      const dadosSalvos = await AsyncStorage.getItem(chave);
      const ocupados = dadosSalvos ? JSON.parse(dadosSalvos) : [];

      const novosHorarios = horariosBase.map((hora) => ({
        hora,
        ocupado: ocupados.includes(hora),
      }));

      setHorariosDisponiveis(novosHorarios);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    carregarHorarios();
  }, [data, lab, unidade]);

  const handleAgendar = async () => {
    if (!unidade || !lab || !data || !horario) {
      Alert.alert("Atenção", "Preencha tudo");
      return;
    }

    if (isHorarioPassado(horario)) {
      Alert.alert("Erro", "Esse horário já passou");
      return;
    }

    const chave = `${data}-${lab}-${unidade}-${horario}`;

    try {
      const dadosSalvos = await AsyncStorage.getItem(chave);
      let horariosOcupados = dadosSalvos ? JSON.parse(dadosSalvos) : [];

      if (horariosOcupados.includes(horario)) {
        Alert.alert("Erro", "Horário já ocupado!");
        return;
      }

      const novoAgendamento = {
        id: `${chave}`, // string única
        unidade: unidade,
        lab: lab,
        data: data,
        horario: horario
      };

      horariosOcupados.push(novoAgendamento);

      try {
        await AsyncStorage.setItem(chave, JSON.stringify(horariosOcupados));

      } catch(e) {
        console.warn("Erro ao salvar!") // Como não há um back-end, vou apenas dar um warn no console
        return;
      }


      // Atualiza UI na hora
      setHorariosDisponiveis((prev) =>
        prev.map((h) =>
          h.hora === horario ? { ...h, ocupado: true } : h
        )
      );

      Alert.alert(
        "Sucesso",
        `Agendamento realizado!\n\nUnidade: ${unidade}\nLab: ${lab}\nData: ${data}\nHorário: ${horario}`
      );

      setRefresh(true);
      router.push('/home')

      setHorario(null);
    } catch (error) {
      console.log(error);
    }
  };

  const isHorarioPassado = (horaSelecionada) => {
    if (!data) return false;

    const agora = new Date();
    const dataSelecionada = new Date(data + "T00:00:00");

    if (dataSelecionada.toDateString() !== agora.toDateString()) {
      return false;
    }

    const [hora, minuto] = horaSelecionada.split(':');
    const horarioData = new Date();
    horarioData.setHours(hora);
    horarioData.setMinutes(minuto);
    horarioData.setSeconds(0);

    return horarioData <= agora;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.label}>Unidade</Text>
      <View style={styles.card}>
        <RNPickerSelect
          onValueChange={setUnidade}
          placeholder={{ label: 'Selecione...', value: null }}
          items={[
            { label: 'Lins de Vasconcelos', value: 'Lins de Vasconcelos' },
            { label: 'FIAP Paulista', value: 'FIAP Paulista' },
          ]}
          style={pickerStyle}
          useNativeAndroidPickerStyle={false}
          Icon={() => <Ionicons name="chevron-down" size={20} color="#9CA3AF" />}
        />
      </View>

      <Text style={styles.label}>Laboratório</Text>
      <View style={styles.card}>
        <RNPickerSelect
          onValueChange={setLab}
          placeholder={{ label: 'Selecione...', value: null }}
          items={[
            { label: 'MakerLab', value: 'MakerLab' },
            { label: 'Laboratório 502', value: 'Laboratório 502' },
          ]}
          style={pickerStyle}
          useNativeAndroidPickerStyle={false}
          Icon={() => <Ionicons name="chevron-down" size={20} color="#9CA3AF" />}
        />
      </View>

      <Text style={styles.label}>Data</Text>
      <View style={styles.card}>
        <Calendar
          minDate={new Date().toISOString().split('T')[0]}
          onDayPress={(day) => setData(day.dateString)}
          markedDates={{
            [data]: {
              selected: true,
              selectedColor: '#EA1463',
            },
          }}
        />
      </View>

      <Text style={styles.label}>Horários</Text>
      <View style={styles.card}>
        <View style={styles.horariosContainer}>
          {horariosDisponiveis.map((h) => {
            const passado = isHorarioPassado(h.hora);

            return (
              <TouchableOpacity
                key={h.hora}
                disabled={h.ocupado || passado}
                style={[
                  styles.horario,
                  (h.ocupado || passado) && styles.horarioOcupado,
                  horario === h.hora && styles.horarioSelecionado,
                ]}
                onPress={() => setHorario(h.hora)}
              >
                <Text
                  style={[
                    styles.horarioTexto,
                    (h.ocupado || passado) && styles.textoOcupado,
                    horario === h.hora && styles.textoSelecionado,
                  ]}
                >
                  {h.hora}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAgendar}>
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
  },
  inputAndroid: {
    fontSize: 16,
    color: '#111',
    paddingVertical: 10,
  },
};