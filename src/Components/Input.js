import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ type, name, onChangeText, placeholder, value, label, secureTextEntry }) => {
   return (
      <View style={{ 
         width: '99%',
         marginVertical: 10,
         // marginHorizontal: 20
          }}>

         <Text
            style={{
               fontSize: 16,
               fontWeight: 'bold',
               marginBottom: 5,
            }}
         >{label}</Text>
         <TextInput
            style={{
               fontSize: 18,
               backgroundColor:"#ededeb",
               height: 44,
               borderRadius: 5,
               paddingHorizontal:10
            }}
            type={type}
            name={name}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
         />
      </View>
   );
};

export default Input;