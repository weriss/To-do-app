import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

const Header =(props)=> (
            <View style={styles.header}>
                <TouchableOpacity onPress={props.onAddItem}>
                    <Text style={styles.toggleIcon}>{String.fromCharCode(10003)}</Text>
                </TouchableOpacity>
                <TextInput
                value={props.value}
                onChangeText={props.onChange}
                onSubmitEditing={props.onAddItem}
                placeholder="What needs to be done?"
                blurOnSubmit={false}
                returnKeyType="done"
                style={styles.input}
                />
            </View>
)

const styles = StyleSheet.create({
header: {
paddingHorizontal: 16,
flexDirection: "row",
justifyContent: "space-around",
alignItems: "center",
marginBottom:10,
},
toggleIcon: {
fontSize: 30,
color: "#CCC"
},
input: {
flex: 1,
marginLeft: 16,
height: 50
}
})

export default Header;