import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
    const { login } = useContext(AuthContext);

    // Por falta de um back-end propriamente dito, vou simplesmente imitar o comportamento de um (ignorando toda segurança que deveria ter)
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        // Não tem back-end, então não me dei o trabalho de conferir se o e-mail é realmente um e-mail, \
        // nem de assegurar nada da senha. Eu só verifico se colocou algo e libero a entrada
        if (!email || !senha) return;

        login({ email, senha })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder='Email'
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder='Senha'
                secureTextEntry
                onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F3F4F6' },
  header:    { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#EA1463',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', textAlign: 'center' },
});
