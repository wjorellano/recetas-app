import React, {useEffect, useState} from 'react';
import {View, Image, Text, SafeAreaView, ScrollView , TouchableOpacity, Dimensions} from 'react-native';
import { BASE_URL } from '../config';
import Loader from './Loader';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const {width} = Dimensions.get('window');
const SPACING = 10;
const ITEM_WIDTH = width / 2 - SPACING * 3;

const ListRecipe = (props) => {

   const [loading, setLoading] = useState(true);
   const [recipes, setRecipes] = useState([]);

   const user = auth.currentUser;
   const userId = user.uid;
   // console.log(userId);

   

   useEffect(() => {
      fetch(`${BASE_URL}/recipes/user/${userId}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
      .then(response => response.json())
      .then(data => {
         setRecipes(data);
         setLoading(false);
         // console.log(data);
      })
      .catch(error => console.log(error))
   }, []);

   useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', () => {
         fetch(`${BASE_URL}/recipes/user/${userId}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
            }
         })
         .then(response => response.json())
         .then(data => {
            setRecipes(data);
            setLoading(false);
            // console.log(data);
         })
         .catch(error => console.log(error))
      });
      return unsubscribe;
   }, [props.navigation]);
   
   return(
      <SafeAreaView>
      { loading ? (
         <Loader />
      ) : (
         <ScrollView style={{ padding: SPACING * 2, height:740 }}>
            {recipes.map((recipe) => {
               return(
                  <View key={recipe.id} style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        paddingHorizontal: SPACING,
                        paddingVertical: SPACING * 2,
                        marginTop: 5 }}>
                  <TouchableOpacity
                     style={{ borderRadius: SPACING * 2, marginBottom: SPACING * 2}}
                     key={recipe.id}
                     onPress={() => {
                        props.navigation.navigate('RecipeDetail', {
                           recipeId: recipe.id
                        })
                     }}>
                     <Image source={{ uri: recipe.image }} style={{
                           borderWidth: 1,
                           width: 360,
                           height: ITEM_WIDTH + SPACING * 3,
                           borderRadius: SPACING * 1,
                        }}/>
                     <Text style={{
                           padding: SPACING,
                           fontSize: SPACING * 2,
                           fontWeight: "700",
                           marginTop: SPACING,
                        }}>{recipe.dish}</Text>
                     <Text style={{
                           padding: SPACING,
                           fontSize: SPACING * 1.5,
                           color: "#a9a9a9",
                           marginVertical: SPACING / 2,
                        }}>{recipe.description}</Text>
                     </TouchableOpacity>
                  </View>
               )
            })}
         </ScrollView>
      )}
      </SafeAreaView>
   )
}

export default ListRecipe;