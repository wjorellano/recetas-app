import React, { useState, useEffect } from "react";
import InputText from "../Components/Input";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import {BASE_URL } from "../config"

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
         alignContent: "center" }}>
         <View style={{
            marginTop: 50,
            margin: 20,
            width: "90%"}}>
            <Text style={{ fontSize: 38, fontWeight:"bold", marginTop: 20}}>
               What would you like search?</Text>
            <InputText
               placeholder="Search Recipe"
               value={searchQuery}
               onChangeText={text => setSearchQuery(text)}/>
            <ScrollView
               style={{ marginTop: 20, height: 630}}
               showsVerticalScrollIndicator={false}>
               <View>
                  { recipe.length === 0 ? (
                     <View style={{
                        marginTop: 100,
                        alignItems: 'center'}}>
                     <Text style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>No results found</Text>
                  </View>
               ) : (
                  recipe.map((recipe) => {
                     return(
                        <View key={recipe.id}>
                           <Image 
                              style={{ width: "100%", height: 200, borderRadius: 5, marginTop: 25 }}
                              source={{ uri: recipe.image }}/>
                           <Text style={{
                              padding: 10,
                              fontSize: 20,
                              fontWeight: "bold",
                           }}>{recipe.dish}</Text>
                           <Text style={{
                              paddingHorizontal: 10,
                              fontSize: 15,
                              color: "gray",
                           }}>{recipe.description}</Text>
                        <TouchableOpacity style={{
                              backgroundColor: "#FFD700",
                              padding: 12,
                              borderRadius: 5,
                              width: "100%",
                              alignSelf: "center",
                              marginTop: 20,
                           }}
                           onPress={() => {
                              props.navigation.navigate('RecipeDetail', {
                                 recipeId: recipe.id
                              })
                           }}>
                           <Text style={{
                              color: "black",
                              fontWeight: "bold",
                              textAlign: "center",
                              fontSize: 25,
                              }}>View Recipe</Text>
                        </TouchableOpacity>
                     </View>
                     )
                  })
               )}
            </View>
            </ScrollView>
         </View>      
      </View>
   );
}

export default SearchScreen;