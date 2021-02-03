

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView
} from 'react-native';
import { Form, Button, Input, Label, Item, Col, Icon, Text } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import FooterHome from '../components/FooterHome'
import { connect } from 'react-redux'
import { saveProducts, editProducts } from '../../Actions/productsActions'

var db = openDatabase({ name: 'UserDatabase.db' });

const FormProduct = ({ navigation, route, saveProducts, editProducts }) => {

  useEffect(() => {
    if (route.params) {
      setProducts(route.params.products)
      setIsEdit(true)
    }
  }, [])

  const [products, setProducts] = useState([{ name: '', price: '' }])
  const [isEdit, setIsEdit] = useState(false)


  const validData = () => {
    var isInvalit = false
    for (let i = 0; i < products.length; ++i) {
      if (products[i].name === '') {
        isInvalit = true
        setProducts(prevState => {
          prevState[i] = { ...prevState[i], NameError: "Este campo es obligatorio" }
          return [...prevState]
        })
      }
      if (products[i].price === '') {
        isInvalit = true
        setProducts(prevState => {
          prevState[i] = { ...prevState[i], PriceError: "Este campo es obligatorio" }
          return [...prevState]
        })
      }
      if (products[i].price > 100000) {
        isInvalit = true
        setProducts(prevState => {
          prevState[i] = { ...prevState[i], PriceError: "Este debe ser menor a 100.000" }
          return [...prevState]
        })
      }
    }

    if (isInvalit) return

    saveProducts(products, navigation)

  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{ flex: 1, flexDirection: 'row', margin: 5, alignContent: 'center' }}>
              {!isEdit &&
                <Button onPress={() => setProducts(prevState => [...prevState, { name: '', price: '' }])} primary style={{ flex: 1, flexDirection: 'row', margin: 5, alignSelf: 'center' }}>
                  <Text>{'Agregar'}</Text>
                </Button>}
              <Button onPress={() => isEdit ? editProducts(products, navigation) : validData()} success style={{ flex: 1, flexDirection: 'row', margin: 5, alignSelf: 'center' }}>
                <Text>{isEdit ? "Editar" : "Guardar"}</Text>
              </Button>
            </View>
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              {products.map((produc, index) => {
                return (
                  <View key={index} style={{ flex: 1, flexDirection: 'row' }}>
                    <Item stackedLabel style={{ flex: 4, marginRight: 5 }}>
                      <Label>Product name</Label>
                      <Input
                        value={products[index].name}
                        onChangeText={(name) =>
                          setProducts(prevState => {
                            prevState[index] = { ...prevState[index], name: name, NameError: null }
                            return [...prevState]
                          })}
                      />
                    </Item>
                    {products[index].NameError &&
                      <Text>{products[index].NameError}</Text>
                    }
                    <Item stackedLabel style={{ flex: 4, marginRight: 5 }}>
                      <Label>Product name</Label>
                      <Input
                        value={isEdit ? products[index].price.toString() : products[index].price}
                        onChangeText={(price) =>
                          setProducts(prevState => {
                            prevState[index] = { ...prevState[index], price: price, PriceError: null }
                            return [...prevState]
                          })}
                        keyboardType="numeric"
                      />
                    </Item>
                    {products[index].PriceError &&
                      <Text>{products[index].PriceError}</Text>
                    }
                    {!isEdit && ((index === 0) ?
                      <Button onPress={() =>
                        setProducts([{}])} danger style={{ marginRight: 3, alignSelf: 'center' }}>
                        <Text>X</Text>
                      </Button>
                      :
                      <Button onPress={() =>
                        setProducts(prevState => {
                          prevState.splice(index, 1)
                          return [...prevState]
                        })} danger style={{ marginRight: 3, alignSelf: 'center' }}>
                        <Text>X</Text>
                      </Button>)}
                  </View>
                )
              })}
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
      <FooterHome navigation={navigation}></FooterHome>
    </SafeAreaView>
  );
};

export default connect(null, { saveProducts, editProducts })(FormProduct);
