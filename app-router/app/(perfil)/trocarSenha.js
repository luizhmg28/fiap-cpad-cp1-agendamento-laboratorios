import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

// Como não há um banco de dados (e não faz muita diferença trocar ou não a senha), a página serve mais como um mock

export default function AlterarSenha() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [salvando, setSalvando] = useState(false);

    const handleSalvar = async () => {
        if (!novaSenha || !confirmarSenha) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        setSalvando(true);

        try {
            const dados = await AsyncStorage.getItem('user');
            let usuarios = dados ? JSON.parse(dados) : {};

            if (usuarios.email === user.email) {
                usuarios.senha = novaSenha;

                await AsyncStorage.setItem('user', JSON.stringify(usuarios));
                
                Alert.alert("Sucesso", "Senha alterada com sucesso!");
                router.back(); // Volta para a tela de perfil
            } else {
                Alert.alert("Erro", "Usuário não encontrado no sistema.");
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar a nova senha.");
        } finally {
            setSalvando(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Segurança</Text>
            <Text style={styles.subtitle}>Escolha uma senha forte para proteger sua conta.</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nova Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a nova senha"
                    secureTextEntry
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirmar Nova Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Repita a senha"
                    secureTextEntry
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                />
            </View>

            <TouchableOpacity 
                style={[styles.button, salvando && styles.buttonDisabled]} 
                onPress={handleSalvar}
                disabled={salvando}
            >
                {salvando ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={styles.buttonText}>Atualizar Senha</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#F9F9F9',
    },
    button: {
        backgroundColor: '#EA1463',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#CCC',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
