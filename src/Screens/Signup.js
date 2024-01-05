import React, { useState} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Input from "../Components/Input";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';


const Signup = ()=>{

   // Registrar usuario
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigation = useNavigation();

   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);

   const handleCreateUser = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
         console.log("Usuario creado")
         // const user = userCredential.user;
         // console.log(user)
         navigation.navigate('Recipe')
      })
      .catch((error) => {
         console.log(error)
      })
   }

   return(
      <View
         style={{
            marginTop: 140,
            flex: 1,
            width: "100%",
            margin: 20,
            paddingHorizontal:4,}}>
       <Text
         style={{
            fontSize: 40,
            fontWeight: 'bold',
            // textAlign: 'center'
         }}>Welcome 👋,</Text>
       <Text
         style={{
            fontSize: 40,
            fontWeight: 'bold',
            marginBottom: 20,
         }}>Create Account.</Text>
         <Input
            label="Email"
            placeholder="Email"
            name={email}
            onChangeText={(text) => setEmail(text)}/>
         <Input
            label="Password"
            placeholder="Password"
            name={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}/>
         <View style={{ width:"90%", marginTop:20 }} >
         <TouchableOpacity
            style={{
               height:50,
               backgroundColor:"#FFD700",
               borderRadius:5
            }}
            onPress={handleCreateUser}>
            <Text style={{
               fontSize:20,
               fontWeight:"bold",
               textAlign:"center",
               color:"black",
               padding:10, 
            }}>Register</Text>
         </TouchableOpacity>
         <TouchableOpacity
            style={{
               borderWidth:1,
               borderRadius:5,
               marginTop:30,
               height:50,
            }}
            onPress={() => navigation.navigate('Signin')}>
            <Text style={{
               fontSize:20,
               fontWeight:"bold",
               textAlign:"center",
               color:"black",
               padding:10, 
            }}>Log in</Text>
         </TouchableOpacity>
         </View>
      </View>
   )
}

export default Signup;