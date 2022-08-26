import React from 'react'
import colors from '../styles/colors'
import { createStackNavigator } from '@react-navigation/stack'
import { Welcome } from '../Pages/Welcome'
import { UserIdentification } from '../Pages/userIdentification'
import { Confirmation } from '../Pages/Confirmation'
import { PlantSave } from './../Pages/PlantSave';
import { MyPlants } from '../Pages/MyPlants'
import AuthRoutes from './tab.routes'

const stackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >

    <stackRoutes.Screen 
      name="Welcome"
      component={Welcome}
    />

    <stackRoutes.Screen 
      name="UserIdentification"
      component={UserIdentification}
    />

    <stackRoutes.Screen 
      name="Confirmation"
      component={Confirmation}
    />

    <stackRoutes.Screen 
      name="PlantSelect"
      component={AuthRoutes}
    />

    <stackRoutes.Screen 
      name="PlantSave"
      component={PlantSave}
    />
    
    <stackRoutes.Screen 
      name="MyPlants"
      component={AuthRoutes}
    />
  
  </stackRoutes.Navigator>
)

export default AppRoutes