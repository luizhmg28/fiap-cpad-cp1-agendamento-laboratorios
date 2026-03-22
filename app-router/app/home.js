import { View, StyleSheet, Text, FlatList } from 'react-native';
export default function Home() {
  // Valores de teste
  const salasReservadas = [
    { 'id': 1, 'unidade': 0, 'lab': '502', 'data': '2026-03-22', 'horario': '09:00 - 10:00' },
    { 'id': 2, 'unidade': 1, 'lab': 'MakerLab', 'data': '2026-03-22', 'horario': '14:00 - 15:00' },
    { 'id': 3, 'unidade': 0, 'lab': '502', 'data': '2026-03-23', 'horario': '09:00 - 10:00' },
    { 'id': 4, 'unidade': 1, 'lab': 'MakerLab', 'data': '2026-03-23', 'horario': '14:00 - 15:00' },
    { 'id': 5, 'unidade': 0, 'lab': '502', 'data': '2026-03-24', 'horario': '09:00 - 10:00' },
    { 'id': 6, 'unidade': 1, 'lab': 'MakerLab', 'data': '2026-03-24', 'horario': '14:00 - 15:00' }
  ]

  const sections = groupByDate(salasReservadas);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>É bom te ver de novo!</Text>

      {/* AGENDADOS */}
      <Text style={styles.label}>Agendamentos</Text>
      <View style={[ {marginBottom: 200}]}>
        <FlatList
          data={sections}
          keyExtractor={(section) => section.id}
          renderItem={({ item: section }) => {
            return (
              <View style={styles.card}>
                <Text style={[
                  styles.header,
                  section.isHoje && styles.hojeText
                ]}>
                  {section.tituloFormatado}
                </Text>

                {section.data.map((item) => {
                  const past = isPast(item.data, item.horario);

                  return (
                    <View key={item.id} style={[
                      styles.itemCard,
                      past && styles.pastCard
                    ]}>
                      <Text style={past && styles.pastText}>
                        {item.unidade ? 'FIAP Paulista' : 'Lins de Vasconcelos'}
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
            );
          }}
        />
      </View>
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

  return Object.keys(grouped).map((data) => {
    const formatado = formatDate(data)
    return {
      titulo: data,
      tituloFormatado: formatado,
      isHoje: formatado === 'Hoje',
      data: grouped[data],
    }
  });
};

const formatDate = (dataString) => {
  const today = new Date();
  const date = new Date(dataString);

  const isToday = date.toDateString() === today.toDateString();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  if (isToday) return 'Hoje';
  if (isTomorrow) return 'Amanhã';

  return date.toLocaleDateString('pt-BR');
};

const isPast = (data, horario) => {
  if (!data || !horario) return false;

  const now = new Date();
  const [year, month, day] = data.split('-').map(Number);

  const [startStr, endStr] = horario.split(' - '); // ["09:00", "10:00"]

  // Caso precise usar, basta remover do comentário (excluido do código para micro-otimização)
  // const [startHour, startMinute] = startStr.split(':').map(Number);
  const [endHour, endMinute] = endStr.split(':').map(Number); // Não considera passado até acabar o tempo de reserva

  const end = new Date(year, month - 1, day, endHour, endMinute);

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
