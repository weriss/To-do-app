import React, { Component } from "react";
import { View, Text, StyleSheet, Platform ,FlatList, TouchableOpacity, Dimensions, Alert} from "react-native";
import Header from "./Header";
import DateTitle from "./dateTitle";

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        allComplete: false,
        value: "",
        items: [],
      }
      this.handleAddItem = this.handleAddItem.bind(this);
      this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    }
    handleToggleAllComplete() {
      const complete = !this.state.allComplete;
      const newItems = this.state.items.map((item) => ({
        ...item,
        complete
        }))
      this.setState({
        items: newItems,
        allComplete: complete
      })
    }
    handleAddItem() {
      if (!this.state.value) return;
      const newItems = [
        ...this.state.items,
        {
        key: Date.now(),
        text: this.state.value,
        complete: false
        }
      ]
      this.setState({
      items: newItems,
      value: "",
      })
    }
    render() {
      return (
      <View style={styles.container}>
        <DateTitle></DateTitle>
        <Header 
        value={this.state.value}
        onAddItem={this.handleAddItem}
        onChange={(value) => this.setState({ value })}
        onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.card}>
          <FlatList 
            data={this.state.items}  
            keyExtractor={(item,index)=>String(index)}
            renderItem={this._renderItem}
            onfresh={this._refreshing}
            getItemLayout={(data,index)=>({length: 100, offset: (100+2) * index, index})}>
          </FlatList>
        </View>
      </View>
      );
    }
    _renderItem=(item)=>{
      return (
      <View style={styles.cardShadow}>
        <TouchableOpacity onLongPress={(index)=>{this._deleteItem(item.index)}} style={styles.cardTouch}>
          {
            item.item.complete===false?
            <View style={styles.itemBox}>
            <View style={styles.textBox}>
              <Text style={styles.itemText}>
                {item.item.text}
              </Text>
            </View>
            <View style={styles.checkDone}>
              <TouchableOpacity style={styles.checkBox}
                onPress={(order)=>{this._checkItem(item.index)}}>
              </TouchableOpacity>
            </View>
            </View>:
            <View style={styles.itemBoxAlready}>
            <View style={styles.textBox}>
              <Text style={styles.itemText}>
                {item.item.text}
              </Text>
            </View>
            <View style={styles.checkDone}>
            </View>
            </View>
          }
        </TouchableOpacity>
      </View>
      )
    }
    _refreshing(){
      let timer= setTimeout(()=>{
        clearTimeout(timer)
      },1500)
    }
    _deleteItem(index){
      Alert.alert('Warning','Do you want to delete it?',
          [
            {text:'No'},
            {text:'Yes',onPress:()=>{
              if(this.state.items.length==1){
                    this.setState({
                      items:[]
                    })
                  }
              else{
                this.state.items.splice(index,1);
                this.setState(
                  {items:this.state.items});}
            }}
          ])
    }
    _checkItem(order){
      this.state.items[order].complete=true;
      this.setState({items:this.state.items})
    }
}

const width=Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    ...Platform.select({
    ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1,
  },
  cardTouch:{
    width:width,
    height:70,
  },
  itemBox:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    height:70,
    marginLeft:20,
    marginRight:20,
    backgroundColor:'orange',
    borderRadius:40,
  },
  itemBoxAlready:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    height:70,
    marginLeft:20,
    marginRight:20,
    backgroundColor:'#CCC',
    borderRadius:40,
  },
  textBox:{
    flex:1,
    height:70,
    justifyContent:'center',
  },
  itemText:{
    marginLeft:25,
    fontSize:20,
    color:'white',
  },
  itemTextDelete:{
    marginLeft:10,
    fontSize:20,
    color:'gray',
    textDecorationLine:'line-through',
  },
  checkDone:{
    flex:1,
    height:70,
    paddingRight:10,
    justifyContent:'center',
    alignItems:'flex-end',
  },
  checkDoneAlready:{
    flex:1,
    height:70,
    paddingRight:10,
    justifyContent:'center',
    alignItems:'flex-end',
  },
  checkBox:{
    width:20,
    height:20,
    backgroundColor:'white',
    borderRadius:15,
  },
  checkCircle:{
    fontSize:20,
    color:'orange',
  },
  cardShadow:{
    alignItems:'center',
    justifyContent:'center',
    height:100,
    width:width,
    // backgroundColor:'orange',
  }
})

export default App;