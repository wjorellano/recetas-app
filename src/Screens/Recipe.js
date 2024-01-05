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
         <ListRecipe
         navigation={props.navigation} />
      </View>
   );
}

export default RecipeScreen;