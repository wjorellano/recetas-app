import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeScreen from './src/Screens/Recipe';
import RecipeDetailScreen from './src/Screens/RecipeDetail';
import CreateRecipeScreen from './src/Screens/CreateRecipe';
import SearchScreen from './src/Screens/Search';
import Signin from './src/Screens/Signin';
import Signup from './src/Screens/Signup';
import Icon from 'react-native-vector-icons/Ionicons';
import WelcomeScreen from './src/Screens/Welcome';
import { IsUserLoggedIn } from './src/lib/IsUserLoggedIn';



const Stack = createNativeStackNavigator();


export default function App() {

  IsUserLoggedIn();
  console.log(IsUserLoggedIn())
  
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerTitleAlign: 'center'}}>
        {IsUserLoggedIn() ? (
          <>
            <Stack.Screen name="Recipe" component={RecipeScreen} options={headerRecipe}/>
            <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} options={headerStyle}/>
            <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={headerStyle}/>
            <Stack.Screen name='Search' component={SearchScreen} options={{headerShown: false}}/>
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}} />
            <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const headerStyle = {
  title: 'Recipes App',
  headerRight: () => {
    const navigation = useNavigation();

    const goToSearch = () => {
      navigation.navigate('Search');
    };

    return (
      <Icon name="search" size={25} onPress={goToSearch} />
    );
  },
}

const headerRecipe = {
  title: 'Recipes App',
  headerLeft: () => {
    const navigation = useNavigation();

    const goToCreateRecipe = () => {
      navigation.navigate('CreateRecipe');
    };
    {/* <Icon name="fast-food-outline" size={25} onPress={goToCreateRecipe} /> */}
    return (
      <Icon name="add" size={25} onPress={goToCreateRecipe} />

    );
  },
  headerRight: () => {
    const navigation = useNavigation();

    const goToSearch = () => {
      navigation.navigate('Search');
    };

    return (
      <Icon name="search" size={25} onPress={goToSearch} />
    );
  },

}
