import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Input from "../Components/Input";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';


const Signin = () => {

   // Login usuario
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigation = useNavigation();

   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);

   const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
         console.log("Usuario logueado")
         // const user = userCredential.user;
         // console.log(user)
         navigation.navigate('Recipe')
      })
      .catch((error) => {
         console.log(error)
      })
   }
   
         
   return (
      <View
         style={{
            marginTop: 140,
            flex: 1,
            width: "100%",
            margin: 20,
            paddingHorizontal:4,
         }}>
         <Text
            style={{
            fontSize: 37,
            fontWeight: 'bold',
         }}>Hello 👋,</Text>
         <Text
            style={{
            fontSize: 37,
            fontWeight: 'bold',
            marginBottom: 20,
         }}>welcome back.</Text>
         <Input
            label="Email"
            placeholder="example@email.com"
            name={email}
            onChangeText={(text) => setEmail(text)}/>
         <Input
            label="Password"
            placeholder="******"
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
            onPress={handleLogin}>
            <Text style={{
               fontSize:20,
               fontWeight:"bold",
               textAlign:"center",
               color:"black",
               padding:10, 
            }}>Log in</Text>
         </TouchableOpacity>
         <TouchableOpacity
            style={{
               borderWidth:1,
               borderRadius:5,
               marginTop:30,
               height:50,
            }}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={{
               fontSize:20,
               fontWeight:"bold",
               textAlign:"center",
               color:"black",
               padding:10, 
            }}>Create account</Text>
         </TouchableOpacity>
         </View>

      </View>
   );
   
}

export default Signin;