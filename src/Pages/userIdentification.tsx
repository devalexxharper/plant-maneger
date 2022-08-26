import React, {useState} from 'react'
import { 
  StyleSheet,
  Platform,
	SafeAreaView,
	View,
	Text,
	TextInput,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Alert
} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import {Button} from '../components/Button'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'


export function UserIdentification(){
	const navigation = useNavigation()
	const [focused, setFocused] = useState(false)
	const [filled, setFilled] = useState(false)
	const [name, setName] = useState<string>()

	function handleInputBlur(){
		setFocused(false)
		setFilled(!!name)
	}
	function handleInputFocus(){
		setFocused(true)
	}
	function handleInputChange(value: string){
		setFilled(!!value)
		setName(value)
	}
	async function handleSubmit(){
		if(!name)
			return Alert.alert('Não foi possível salvar seu nome 🥺')

			try{
		await AsyncStorage.setItem('@plantmaneger:user', name)
		navigation.navigate('Confirmation', {
			title: 'Prontinho',
			subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado!',
			buttonTitle: 'Começar',
			icons:'smile',
			nextScreen: 'PlantSelect'
		})
		}catch{
			return Alert.alert('Não foi possível salvar seu nome 🥺')
		}
	}

  return(
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView style={styles.container}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
					<View style={styles.content}>
						<View style={styles.form}>
							<View style={styles.header}>
								<Text style={styles.emoji}>
									{filled ? '😄' : '😃'}
								</Text>
								<Text style={styles.title}>
									Como podemos{'\n'}
									chamar você?
								</Text>
							</View>
							<TextInput 
								style={[
									styles.input,
									(focused || filled) && {borderColor: colors.green}
								]} 
								placeholder="Digite seu nome" 
								onBlur={handleInputBlur}
								onFocus={handleInputFocus}
								onChangeText={handleInputChange}
							/>
							<View style={styles.footer}>
								<Button title='Confirmar' onPress={handleSubmit} />
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingTop: Platform.OS === 'android' ? 20 : 0,
	},
	content: {
		flex: 1,
		width: '100%',
	},
	form: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 54,
		alignItems: 'center'
	},
	header:{
		alignItems: 'center'
	},
	emoji:{
		fontSize: 44
	},
	input:{
		borderBottomWidth: 1,
		borderColor: colors.gray,
		color: colors.heading,
		width: '100%',
		fontSize: 18,
		marginTop: 50,
		padding: 10,
		textAlign: 'center'
	},
	title:{
		fontSize: 24,
		textAlign: 'center',
		color: colors.heading,
		fontFamily: fonts.heading,
		lineHeight: 32,
		marginTop: 20
	},
	footer:{
		marginTop: 40,
		width: '100%',
		paddingHorizontal: 20
	}
})