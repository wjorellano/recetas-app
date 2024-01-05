import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

const Welcome = (props) => {

   const goToSignin = () => {
      props.navigation.navigate('Signin');
   }

   return (
      <ImageBackground
         source={require("../images/food.jpeg")}
         style={{ flex:1 }}>
         <View style={{flex: 1, backgroundColor: "black", opacity: 0.6,}}/>
         <View style={{
            position:"absolute",
            height:"100%",
            zIndex:2,
            width:"100%",
            justifyContent:"flex-end",
            paddingHorizontal: 10 * 2,
            paddingBottom: 10 * 5,
            }}>
            <Text style={{
               fontSize: 40,
               fontWeight: "bold",
               textAlign: "center",
               color: "white",
               marginBottom: 40
            }}>
               Let us help you find the best recipe!
            </Text>
            <TouchableOpacity
               onPress={goToSignin}
               style={{
                  backgroundColor: "#FFD700",
                  width: "95%",
                  alignSelf: "center",
                  padding: 20,
                  borderRadius: 10,
               }}>
               <Text style={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 25,
               }}>
                  Get Started
               </Text>
            </TouchableOpacity>
            </View>
      </ImageBackground>
   );
}

export default Welcome;