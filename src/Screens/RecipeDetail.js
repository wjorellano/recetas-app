import React, { useState, useEffect } from "react";
import { View, Text, Image, Share, TouchableOpacity } from "react-native";
import {BASE_URL } from "../config"
import Loader from "../Components/Loader";

const RecipeDetailScreen = (props) => {

   const [recipe, setRecipe] = useState({});
   const [loading, setLoading] = useState(true);

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
      setLoading(false);
   }

   useEffect(() => {
      getRecipe();
   }, []);

   // compartir receta con los demas usuarios
      const shareRecipe = async () => {
         try {
            const result = await Share.share({
               message: `Hey! I found this recipe on the app Recipe Book, check it out: ${recipe.dish}`,
            });
            if (result.action === Share.sharedAction) {
               if (result.activityType) {
                  // shared with activity type of result.activityType
               } else {
                  
               }
            } else if (result.action === Share.dismissedAction) {
               // dismissed
            }
         } catch (error) {
            alert(error.message);
         }
      }

   return (
      <View>
         { loading ? (
            <Loader />
         ) : (
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
                        onPress={shareRecipe}
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
         )
         }
      </View>
   );
}
export default RecipeDetailScreen;