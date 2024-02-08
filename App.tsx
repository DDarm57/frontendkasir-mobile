import {View, Text, Image, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleLogin = async () => {
    console.log(email);
    console.log(password);

    try {
      const response = await fetch('http://127.0.0.1:8001/api/auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login Gagal');
      }

      const data = await response.json();

      console.log('Data berhasil diterima:', data);
    } catch (error) {
      console.error('Terjadi Kesalahan: ', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://ybpk-gkjw.org/wp-content/uploads/2022/12/219983.png',
          }}
          style={{width: 100, height: 100}}
        />
        <Text
          style={{
            fontSize: 30,
            marginBottom: 30,
            marginTop: 10,
            fontWeight: 'bold',
          }}>
          LOGIN
        </Text>
        <Text style={styles.textLabel}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          value={email}
          onChangeText={handleEmailChange}
        />
        <Text style={styles.textLabel}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <View style={{marginTop: 20, width: '80%', height: '20%'}}>
          <Button title="Login" onPress={handleLogin} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textLabel: {
    fontSize: 16,
    marginTop: 10,
  },
  textInput: {
    height: 40,
    width: '80%',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
  },
});
