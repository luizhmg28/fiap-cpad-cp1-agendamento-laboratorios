import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MinhaConta() {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* PERFIL */}
      <View style={styles.profileCard}>

        <View style={styles.avatarWrapper}>
          <Image
            source={
              require('../assets/user_photo.png') 
            }
            style={styles.avatar}
          />
        </View>

        <Text style={styles.name}>Luiz Graça</Text>
        <Text style={styles.rm}>RM: 123456</Text>

      </View>

      {/* OPÇÕES */}
      <View style={styles.card}>
        
        <TouchableOpacity style={styles.option}>
          <Ionicons name="create-outline" size={25} color="#6B7280" />
          <Text style={styles.optionText}>Editar perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="lock-closed-outline" size={25} color="#6B7280" />
          <Text style={styles.optionText}>Alterar senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="log-out-outline" size={25} color="#EA1463" />
          <Text style={[styles.optionText, { color: '#EA1463' }]}>
            Sair
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#F3F4F6',
    flexGrow: 0.7,
    justifyContent: 'space-between',
  },

  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 25,
  },

  avatarWrapper: {
    width: 270,
    height: 270,
    borderRadius: 135,
    borderWidth: 4,
    borderColor: '#EA1463', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },

  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#111',
  },

  rm: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 6,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
  },

  optionText: {
    fontSize: 15,
    color: '#111',
    fontWeight: '500',
  },
});