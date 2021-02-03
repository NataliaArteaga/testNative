import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView
} from 'react-native';
import {  Form, Button, Input, Label,Item, Col, Icon, Text,CheckBox, Left, Right } from 'native-base';
import FooterHome from '../components/FooterHome'
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const Home = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View  style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{
        flexDirection:'column',
        alignItems: "center" ,
        justifyContent: 'space-between'}}>
          <View   style={{ flex: 1, flexDirection:'row', marginTop:10}}>
            
              <Text style={{flex: 1, marginLeft:10}}>Nombre</Text>
                     
              <Text style={{ flex: 1,marginLeft:3}}>Precio</Text>
                         
            <Right>
            <CheckBox checked={false} style={{flex: 1, marginRight:30}}/>
            </Right>
          </View>
          </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <View style={{ flex: 1, flexDirection:'row', margin:5, alignContent:'center'}}>
        <Button primary style={{ flex: 1, flexDirection:'row', margin:5, alignSelf:'center'}}><Text>Editar</Text></Button>
        <Button danger style={{ flex: 1, flexDirection:'row', margin:5, alignSelf:'center'}}><Text>Eliminar</Text></Button>
        </View>
      </View>
      <FooterHome navigation={navigation}></FooterHome>
    </SafeAreaView>
  );
};

export default Home;
