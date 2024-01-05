import React, { useState, useEffect } from "react";
import InputText from "../Components/Input";
import { View, Text } from "react-native";
import {BASE_URL } from "../config"
import ListRecipe from "../Components/ListRecipe";

const SearchScreen = (props) => {

   const [searchQuery, setSearchQuery] = useState('');
   const [recipe, setRecipe ] = useState([]);

   const getRecipe = async () => {
      const response = await fetch(`${BASE_URL}/recipes/search/${searchQuery}`,{
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }

      });
      const data = await response.json();
      setRecipe(data);
      console.log(data);
   }

   useEffect(() => {
      if(searchQuery.trim()  !== ''){
         getRecipe();
      }
   }, [searchQuery]);

   return (
      <View style={{
         backgroundColor: "#fff",
         flex: 1,
         alignContent: "center",
      }}>
         <View style={{
         marginTop: 50,
         // borderWidth: 1,
         margin: 20,
         width: "90%",
         // marginLeft: 30,
         
         }}>
            <Text style={{ fontSize: 38, fontWeight:"bold", marginTop: 20}}>
               What would you like search?</Text>
            <InputText
               placeholder="Search Recipe"
               value={searchQuery}
               onChangeText={text => setSearchQuery(text)}
            />
            <View>
               {recipe.map((recipe) => {
                  return(
                     <View key={recipe.id}>
                      <ListRecipe
                        recipe={recipe}
                        navigation={props.navigation} />
                     </View>
                  )
               })}
            </View>
         </View>      
      </View>
   );
}

export default SearchScreen;