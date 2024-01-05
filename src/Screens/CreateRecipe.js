import React, {useState} from "react";
import { View, Text, TouchableOpacity} from "react-native";
import Input from "../Components/Input";
import { BASE_URL } from "../config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const CreateRecipeScreen = (props) => {
   const [dish, setDish] = useState('');
   const [description, setDescription] = useState('');
   const [fruit, setFruit] = useState('');
   const [ingredient, setIngredient] = useState('');
   const [vegetables, setVegetables] = useState('');
   const [spice, setSpice] = useState('');



   const user = auth.currentUser;
   const userId = user.uid;

   const createRecipe = async () => {
      if (dish === '' || description === '' || fruit === '' || vegetables === '' || ingredient === '' || spice === '') {
         alert('Please fill all the fields');
      } else {
         try {
            const response = await fetch(`${BASE_URL}/recipes`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
               },
               body: JSON.stringify({
                  dish: dish,
                  description: description,
                  ingredient: ingredient,
                  fruit: fruit,
                  spice: spice,
                  vegetables: vegetables,
                  user_id: userId
               })
            });
            const data = await response.json();
            console.log(data);
            props.navigation.navigate('Recipe');
         } catch (error) {
            console.log(error);
         }
      }
   }

   return (
      <View style={{ marginTop: 50, margin:20, flex: 1, alignItems: 'center'}}>
         <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center'}}>Create your recipe</Text>
         <Input
            label="Dish*"
            placeholder="Dish"
            name={dish}
            onChangeText={(text) => setDish(text)}/>
         <Input
            label="Description*"
            placeholder="Description"
            name={description}
            onChangeText={(text) => setDescription(text)}/>
         <Input
            label="Fruit*"
            placeholder="Fruit"
            name={fruit}
            onChangeText={(text) => setFruit(text)}/>
         <Input
            label="Spice*"
            placeholder="Spice"
            name={spice}
            onChangeText={(text) => setSpice(text)}/>
         <Input
            label="Ingredient*"
            placeholder="Ingredient"
            name={ingredient}
            onChangeText={(text) => setIngredient(text)}/>
         <Input
            label="Vegetables*"
            placeholder="Vegetables"
            name={vegetables}
            onChangeText={(text) => setVegetables(text)}/>

         <TouchableOpacity
            onPress={(createRecipe)}
            style={{
               backgroundColor: "#FFD700",
               padding: 15,
               borderRadius: 5,
               width: "100%",
               alignSelf: "center",
               marginTop: 20,
               marginBottom: 20,
               alignItems: "center",
            }}
            >
            <Text
               style={{
                  fontWeight: "bold",
                  fontSize: 18,
               }}>Create Recipe</Text>
         </TouchableOpacity>
      </View>
   );
}

export default CreateRecipeScreen;