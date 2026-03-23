import { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, Text, SectionList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { getRefresh, setRefresh } from '../utils/refreshFlag';

// Caso não hajam agendamentos, eu fiz esse elemento estilo React Native só pra não ficar feio
const EmptyListPlaceholder = () => (
  <View style={styles.card}>
    <Text style={styles.pastText}>Nenhum agendamento feito.</Text>
  </View>
)

export default function Home() {
  const salasReservadas = [
    { id: 1, unidade: 0, lab: '502', data: '2026-03-22', horario: '09:00 - 10:00' },
    { id: 2, unidade: 1, lab: 'MakerLab', data: '2026-03-22', horario: '14:00 - 15:00' },
    { id: 3, unidade: 0, lab: '502', data: '2026-03-23', horario: '09:00 - 10:00' },
    { id: 4, unidade: 1, lab: 'MakerLab', data: '2026-03-23', horario: '14:00 - 15:00' },
    { id: 5, unidade: 0, lab: '502', data: '2026-03-24', horario: '09:00 - 10:00' },
    { id: 6, unidade: 1, lab: 'MakerLab', data: '2026-03-24', horario: '14:00 - 15:00' }
  ];

  const [agendamentos, setAgendamentos] = useState([]);

  const fetchAgendamentos = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const dados = await AsyncStorage.multiGet(keys);

      const parsed = dados.map(([_, value]) => JSON.parse(value)).flat();
      setAgendamentos(parsed);
    } catch (e) {
      console.warn("Erro ao carregar dados:", e);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (getRefresh()) {
        fetchAgendamentos();
        setRefresh(false);
      }
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>É bom te ver de novo!</Text>

      <Text style={styles.label}>Agendamentos</Text>
      <SectionList
        sections={groupByDate(agendamentos)}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyListPlaceholder />}

        renderSectionHeader={({ section }) => (
          <View style={styles.card}>
            <Text style={[
              styles.header,
              section.isHoje && styles.hojeText
            ]}>
              {section.title}
            </Text>

            {section.data.map((item) => {
              const past = isPast(item.data, item.horario);

              return (
                <View
                  key={item.id}
                  style={[
                    styles.itemCard,
                    past && styles.pastCard
                  ]}
                >
                  <Text style={past && styles.pastText}>
                    {item.unidade}
                  </Text>
                  <Text style={past && styles.pastText}>
                    {item.lab}
                  </Text>
                  <Text style={past && styles.pastText}>
                    {item.horario}
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        renderItem={() => null}
        contentContainerStyle={{ paddingBottom: 200 }}
      />
    </View>
  );
}

const groupByDate = (rooms) => {
  const grouped = {};

  rooms.forEach((room) => {
    if (!grouped[room.data]) {
      grouped[room.data] = [];
    }
    grouped[room.data].push(room);
  });

  return Object.keys(grouped).sort().map((data) => {
    const formatado = formatDate(data);

    return {
      id: data,
      title: formatado,
      rawDate: data,
      isHoje: formatado === 'Hoje',
      data: grouped[data],
    };
  });
};

function toUTCDate(date) {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

const formatDate = (dataString) => {
  const hoje = new Date();
  const data = new Date(dataString);

  const isHoje = toUTCDate(data) === toUTCDate(hoje);

  const amanha = new Date();
  amanha.setDate(hoje.getDate() + 1);

  const isAmanha = toUTCDate(data) === toUTCDate(amanha);

  if (isHoje) return 'Hoje';
  if (isAmanha) return 'Amanhã';

  return data.toLocaleDateString('pt-BR');
};

const isPast = (data, horario) => {
  if (!data || !horario) return false;

  const now = new Date();
  const [year, month, day] = data.split('-').map(Number);

  const [hour, minute] = horario.split(':').map(Number); // Não considera passado até acabar o tempo de reserva

  const end = new Date(year, month - 1, day, hour + 1, minute);

  return end < now;
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F3F4F6' },
  header:    { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  label:     { marginTop: 12, marginBottom: 6, fontSize: 13, fontWeight: '600', color: '#6B7280' },
  card:      { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 13, marginHorizontal: 10, marginVertical: 10, 
               shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 
             },
  itemCard:  { padding: 16, marginHorizontal: 10, marginVertical: 5, backgroundColor: '#eee', borderRadius: 8 },
  pastCard:  { backgroundColor: '#ddd' },
  pastText:  { color: '#999' },
  hojeText:  { color: '#EA1463' },
});
