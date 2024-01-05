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
   const [image, setImage] = useState('');
   const [vegetables, setVegetables] = useState('');


   const user = auth.currentUser;
   const userId = user.uid;

   const createRecipe = () => {
      fetch(`${BASE_URL}/recipes`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify({
            dish: dish,
            description: description,
            fruit: fruit,
            image: image,
            vegetables: vegetables,
            user_id: userId
         })
      })
      .then(response => response.json())
      .then(data => {
         console.log(data)
         props.navigation.navigate('Recipe')
      })
      .catch(error => {
         console.log(error)
      })
   }

   return (
      <View style={{
         marginTop: 50,
         flex: 1,
         alignItems: 'center'}}>
         <Text style={{
               fontSize: 32,
               fontWeight: 'bold',
               textAlign: 'center'
            }}>Create Recipe</Text>
         <Input
            label="Dish"
            placeholder="Dish"
            name={dish}
            onChangeText={(text) => setDish(text)}/>
         <Input
            label="Description"
            placeholder="Description"
            name={description}
            onChangeText={(text) => setDescription(text)}/>
         <Input
            label="Fruit"
            placeholder="Fruit"
            name={fruit}
            onChangeText={(text) => setFruit(text)}/>
         <Input
            label="Image"
            placeholder="Image"
            name={image}
            onChangeText={(text) => setImage(text)}/>
         <Input
            label="Vegetables"
            placeholder="Vegetables"
            name={vegetables}
            onChangeText={(text) => setVegetables(text)}/>

         <TouchableOpacity
            onPress={(createRecipe)}
            style={{
               backgroundColor: "#FFD700",
               padding: 15,
               borderRadius: 5,
               width: "90%",
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