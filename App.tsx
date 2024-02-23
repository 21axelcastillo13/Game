/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import GameScreen from './GameScreen';

export default function App() {
  return <SafeAreaView>
    <ScrollView>
      <View style={styles.bienvenida}>
        <Text style={styles.texto}>Memory game </Text>
      </View>
    <View style={styles.container}>
      <GameScreen />
    </View>
    </ScrollView>
  </SafeAreaView>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bienvenida:
  {
    width:'100%',
    height:200,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  texto:{
    fontSize:22,
    fontWeight:'600',
    color:'#17252a'
  }
});
