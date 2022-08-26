import React, {useState, useEffect} from 'react'
import { 
  StyleSheet,
	SafeAreaView,
	View,
	Text,
} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { Button } from '../components/Button'
import { useNavigation, useRoute } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Params{
  title: string,
  subtitle: string,
  buttonTitle: string,
  icons: 'smile' | 'hug',
  nextScreen: string
}

const emojis = {
  hug: '🤗',
  smile: '😃'
}


export function Confirmation(){
  const [ userName, setUserName ] = useState<string>()
  useEffect(() => {
    async function loadStorageUsername(){
      const user = await AsyncStorage.getItem('@plantmaneger:user')
      setUserName(user || '')
    }
    loadStorageUsername()
  }, [userName])

  const routes = useRoute()
  const {
    title,
    subtitle,
    buttonTitle,
    icons,
    nextScreen
  } = routes.params as Params
  const navigation = useNavigation()
  function handleMovieOn(){

    navigation.navigate(nextScreen)
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
					{emojis[icons]}
				</Text>

        <Text style={styles.title}>
           {title} {userName}!
        </Text>

        <Text style={ styles.subtitle}>
          {subtitle}
        </Text>
        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleMovieOn}/>
        </View>
      </View>
      

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  content:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30
  },
  title:{
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15
  },
  subtitle:{
    fontFamily: fonts.text,
    textAlign:'center',
    fontSize: 17,
    paddingVertical: 20,
    color: colors.heading,
    margin: 10
  },
  emoji: {
    fontSize: 78
  },
  footer:{
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  }
})