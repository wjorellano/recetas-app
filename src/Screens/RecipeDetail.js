import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
// import Share from 'react-native-share';
import {BASE_URL } from "../config"


const RecipeDetailScreen = (props) => {

   const [recipe, setRecipe] = useState({});

   const getRecipe = async () => {
      const response = await fetch(`${BASE_URL}/recipes/${props.route.params.recipeId}`,{
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      });
      const data = await response.json();
      setRecipe(data);
   }

   useEffect(() => {
      getRecipe();
   }, []);

   // compartir receta con los demas usuarios
   // const shareRecipe = async () => {
   //    try {
   //       const result = await Share.share({
   //          message: `Check out this recipe: ${recipe.dish}`,
   //          url: recipe.image,
   //          title: 'Recipe'
   //       }, {
   //          dialogTitle: 'Share Recipe'
   //       });
   //       if (result.action === Share.sharedAction) {
   //          if (result.activityType) {
   //             // shared with activity type of result.activityType
   //          } else {
   //             // shared
   //          }
   //       } else if (result.action === Share.dismissedAction) {
   //          // dismissed
   //       }
   //    } catch (error) {
   //       alert(error.message);
   //    }
   // }

   return (
      <View>
         { 
            recipe ? (
               <View>
                  <Image
                     style={{ width: "100%", height: 300, borderRadius: 1 }}
                     source={{ uri: recipe.image }}
                  />
                     <View style={{ margin: 15 }}>
                     <Text style={{ fontSize: 30, fontWeight: "bold" }}>{recipe.dish}</Text>
                     <Text style={{ fontSize: 18, fontWeight: "bold", marginTop:20 }}>Description:</Text>
                     <Text style={{ fontSize: 18, marginTop:5 }}>{recipe.description}</Text>
                     <Text style={{ fontSize: 18, fontWeight: "bold", marginTop:20 }}>Ingredients:</Text>
                     <Text>{recipe.ingredient}</Text>
                     <Text style={{ fontSize: 18, fontWeight: "bold", marginTop:20 }}>Fruits:</Text>
                     <Text>{recipe.fruit}</Text>
                     <Text style={{ fontSize: 18, fontWeight: "bold", marginTop:20 }}>Spice:</Text>
                     <Text>{recipe.spice}</Text>
                     <Text style={{ fontSize: 18, fontWeight: "bold", marginTop:20 }}>Vegetables:</Text>
                     <Text>{recipe.vegetables}</Text>
                     <TouchableOpacity
                        // onPress={shareRecipe}
                        style={{
                           backgroundColor: "#FFD700",
                           width: "100%",
                           alignSelf: "center",
                           padding: 15,
                           borderRadius: 10,
                           marginTop: 20,
                        }}>
                        <Text style={{
                           color: "black",
                           fontWeight: "bold",
                           textAlign: "center",
                           fontSize: 25,
                        }}>
                           Share
                        </Text>
                     </TouchableOpacity>
                  </View>
               </View>
            ) : (
               <Text>loading...</Text>
            )
         }
      </View>
   );
}
export default RecipeDetailScreen;