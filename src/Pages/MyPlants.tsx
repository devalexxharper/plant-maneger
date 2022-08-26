import React, {useState, useEffect} from 'react'
import { 
  StyleSheet,
	View,
	Text,
  Image, 
  FlatList,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import waterDrop from '../assets/waterdrop.png'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { Button } from '../components/Button'
import { useRoute } from '@react-navigation/core'
import { SvgFromUri } from 'react-native-svg'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { isBefore, format, formatDistance} from 'date-fns'
import { plantLoad, PlantProps, removePlant } from './../libs/storage'
import { Header } from '../components/Header'
import { ptBR } from 'date-fns/locale'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Load } from '../components/Load'


export function MyPlants(){
  const [myPlants, setMyPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWatered, setNextWatered] = useState<string>()

  function handleRemove(plant:PlantProps){
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não \u{1F64F}',
        style: 'cancel'
      },
      {
        text: 'Sim \u{1F622}',
        onPress: async () => {
          try {
            await removePlant(plant.id)
            setMyPlants((oldData) => (
              oldData.filter((item) => item.id !== plant.id)
            ))
          } catch (error) { 
            Alert.alert('Não foi possível remover \u{1F622}')
          }
        }
      }  
    ])
  }

  useEffect(() => {
    async function loadStorageData(){
      const plantStorage = await plantLoad()
      const nextTime = formatDistance(
        new Date(plantStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR}
      )
      setNextWatered(
        `Não esqueça de regar  ${plantStorage[0].name} em ${nextTime}`
      )
      setMyPlants(plantStorage)
      setLoading(false)
    }
    loadStorageData()
  }, [])

  if(loading)
    return <Load />


  return (
      <SafeAreaView style={styles.container}>
         <Header />
         <View style={styles.spotlight}>
          <Image 
            source={waterDrop} 
            style={styles.spotlightImage}
          />
          <Text style={styles.spotlightText}>
          {nextWatered}
          </Text>
         </View>
         <View style={styles.plants}>
          <Text style={styles.plantsTitle}>
            Proximas regadas
          </Text>
          <FlatList 
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => (
              <PlantCardSecondary 
                data={item} 
                handleRemove={() => {handleRemove(item)}}
              />
            )}
            contentContainerStyle={{flex: 1}}
            showsVerticalScrollIndicator={false}
          />
         </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  //  textAlign: 'justify'
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
})