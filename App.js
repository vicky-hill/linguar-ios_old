// Redux
import { Provider } from 'react-redux';
import { store } from './store';

// React Native and Navigation
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// Utils
import { navigationRef } from './src/utils/RootNavigation';

// // Expo Fonts
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

// Stacks
import HomeStack from './src/stacks/HomeStack';
import VocabularyStack from './src/stacks/VocabularyStack';
import AuthStack from './src/stacks/AuthStack';
import ConjugationScreen from './src/screens/ConjugationScreen';
import { header } from './src/stacks/_config';
import LanguageScreen from './src/screens/LanguageScreen';




// Load fonts from assets/fonts
const getFonts = () => Font.loadAsync({
  'lobstertwo-regular': require('./assets/fonts/LobsterTwo-Regular.ttf'),
  'lobstertwo-bold': require('./assets/fonts/LobsterTwo-Bold.ttf'),
  'great-vibes': require('./assets/fonts/GreatVibes-Regular.ttf'),
  'lato-thin': require('./assets/fonts/Lato-Thin.ttf'),
  'lato-light': require('./assets/fonts/Lato-Light.ttf'),
  'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
  'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
  'lato-black': require('./assets/fonts/Lato-Black.ttf')
})


const App = () => {
  const [isLoading, setIsLoading] = useState(false);


  // Wait for fonts to load before rendering RootApp
  if (!isLoading) {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => { setIsLoading(true) }}
        onError={() => console.log('something went wrong')}
      />
    )
  }


  const Root = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef} >
        <Root.Navigator screenOptions={{
          headerShown: false,
          mode: 'modal'
        }}>

          {/* Auth Stack */}
          <Root.Screen 
            name='Auth' 
            component={AuthStack} 
          />

          {/* Languages Screen */}
          <Root.Screen 
            name='Languages' 
            component={LanguageScreen} 
            options={{ 
              ...header,
              headerShown: true, 
              animationEnabled: false, 
              headerLeft: () => null 
            }}  />
         
          {/* Home Stack */}
          <Root.Screen 
            name='Home' 
            component={HomeStack} 
            options={{ 
              animationEnabled: false 
          }} />

          {/* Vocabulary Stack */}
          <Root.Screen 
            name='Vocabulary' 
            component={VocabularyStack} 
          />

          {/* Conjugation Screen */}
          <Root.Screen 
            name='Conjugation' 
            component={ConjugationScreen} 
            options={{  
              ...header, 
              headerShown: true }}
            />
            
        </Root.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;

