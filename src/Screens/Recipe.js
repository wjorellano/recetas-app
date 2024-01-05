import React from 'react';
import { View, Text } from 'react-native';
import ListRecipe from '../Components/ListRecipe';

const RecipeScreen = (props) => {
   return (
      <View
         style={{
            backgroundColor: "#fff",
            flex: 1,
            alignContent: "center",
         }}>
         <Text
            style={{
               fontSize: 32,
               fontWeight: "bold",
               marginTop: 20,
               marginLeft: 28,
               marginBottom: 20,
            }}>
            My recipes
         </Text>
         <ListRecipe
         navigation={props.navigation} />
      </View>
   );
}

export default RecipeScreen;