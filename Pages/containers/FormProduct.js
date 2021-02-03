

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView
} from 'react-native';
import {  Form, Button, Input, Label,Item, Col, Icon, Text } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import FooterHome from '../components/FooterHome'
import { TextInput } from 'react-native-gesture-handler';

var db = openDatabase({ name: 'UserDatabase.db' });

const RegisterUser = ({ navigation }) => {
  let [productName, setProductName] = useState('');
  let [priceProduct, setPriceProduct] = useState('');
  let [products, setProducts] = useState('');

  const register_product = () => {
    console.log(productName, priceProduct, products);

    if (!productName) {
      alert('Please fill name');
      return;
    }
    if (!priceProduct) {
      alert('Please fill Contact Number');
      return;
    }
   

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (product_name, product_price) VALUES (?,?)',
        [productName, priceProduct],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Product Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
  };

  const delete_product = (e)=>{
    console.log(e)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View  style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
         <Form style={{
        flexDirection:'column',
        alignItems: "center" ,
        justifyContent: 'space-between'}}>
          <View   style={{ flex: 1, flexDirection:'row' }}>
            
            <Item stackedLabel  style={{ flex: 4, marginRight:5}}>
              <Label>Product name</Label>
              <Input />
            </Item>
            
            <Item stackedLabel last  style={{ flex: 4}}>
              <Label>Price</Label>
              <Input />
            </Item>
            
            <Button danger style={{ marginRight:3, alignSelf:'center' }}>
             <Text>X</Text>
          </Button>
          </View>
          </Form>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
      <FooterHome navigation={navigation}></FooterHome>
    </SafeAreaView>
  );
};

export default RegisterUser;
