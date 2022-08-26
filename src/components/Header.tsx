import React, {useEffect, useState} from 'react'
import { Text, StyleSheet, Image, View } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import userImg from '../assets/charlie.png'
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Header(){
  const [ userName, setUserName ] = useState<string>()
  useEffect(() => {
    async function loadStorageUsername(){
      const user = await AsyncStorage.getItem('@plantmaneger:user')
      setUserName(user || '')
    }
    loadStorageUsername()
  }, [userName])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.getting}> Olá </Text>
        <Text style={styles.username}> {userName}! </Text>
      </View>

      <Image source={userImg} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  image:{
    width: 70,
    height: 70,
    borderRadius: 35
  },
  getting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },
  username: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40
  }
})