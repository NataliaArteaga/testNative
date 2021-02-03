import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux'
import { createTable, loadData, deleteProducts } from '../../Actions/productsActions'
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  FlatList
} from 'react-native';
import { Form, Button, Input, Label, Item, Col, Icon, Text, CheckBox, Left, Right } from 'native-base';
import FooterHome from '../components/FooterHome'


const Home = ({ route, navigation, createTable, loadData, isLoading, dataProducts, deleteProducts }) => {

  useEffect(() => {
    createTable()
    loadData()
  }, [])



  const [products, setProducts] = useState({})

  const renderItem = ({ item, index }) => (
    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
      <Text style={{ flex: 1, marginLeft: 10 }}>{item.name}</Text>
      <Text style={{ flex: 1, marginLeft: 3 }}>{item.price}</Text>
      <Right>
        {products[item.id.toString()] ?
          <CheckBox onPress={() =>
            setProducts(prevState => {
              delete prevState[item.id.toString()]
              return { ...prevState }
            })} checked={true} style={{ flex: 1, marginRight: 30 }} />
          :
          <CheckBox onPress={() =>
            setProducts(prevState => {
              prevState[item.id.toString()] = { id: item.id, name: item.name, price: item.price }
              return { ...prevState }
            })} checked={false} style={{ flex: 1, marginRight: 30 }} />
        }
      </Right>
    </View>
  );


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}>
        {Object.values(dataProducts).length === 0 && <Text>No hay ningun archivo</Text>}
        <FlatList
          data={dataProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
        <View style={{ flex: 1, flexDirection: 'row', margin: 5, alignContent: 'center' }}>
          {Object.values(products).length > 0 && <Button onPress={() => {
            var data = Object.values(products)
            setProducts({})
            navigation.navigate('FormProduct', { products: data })
          }} primary style={{ flex: 1, flexDirection: 'row', margin: 5, alignSelf: 'center' }}><Text>Editar</Text></Button>}
          {Object.values(products).length > 0 && <Button onPress={() => {
            var data = Object.values(products)
            setProducts({})
            deleteProducts(data)
          }} danger style={{ flex: 1, flexDirection: 'row', margin: 5, alignSelf: 'center' }}><Text>Eliminar</Text></Button>}
        </View>
        <FooterHome navigation={navigation}></FooterHome>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.products.isLoadingProducts,
    dataProducts: state.products.dataProducts,
  }
}


export default connect(mapStateToProps, { createTable, loadData, deleteProducts })(Home)
