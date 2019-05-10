import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions} from "react-native";
const Month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
class DateTitle extends Component {
    constructor(props){
        super(props)
        this.state={
            nowDate:[{nowDay:"", nowMonth:"", nowYear:"", nowHours:"", nowMinutes:""}] }
        setInterval(()=>{
            this.setState({
                nowDay: new Date().getDate().toString(),
                nowMonth: Month[new Date().getMonth()],
                nowYear: new Date().getFullYear().toString(),
                nowHours: new Date().getHours().toString().length===1 ? '0'+new Date().getHours().toString():new Date().getHours().toString(),
                nowMinutes: new Date().getMinutes().toString().length===1 ? '0'+new Date().getMinutes().toString():new Date().getMinutes().toString()
            })
        },200);
      }
    render() {
        return (
            <View style={styles.dateTitle}>
               <View style={styles.dateLeft}>
                <View style={styles.dayLeft}>
                    <Text style={styles.dayText}>{this.state.nowDay}</Text>
                </View>
                <View style={styles.dayRight}>
                    <Text style={styles.monthText}>{this.state.nowMonth}</Text>
                    <Text style={styles.yearText}>{this.state.nowYear}</Text>
                </View>
              </View>
              <View style={styles.dateRight}>
                <Text style={styles.timeText}>{this.state.nowHours}</Text>
                <Text style={styles.timeText}>:</Text>
                <Text style={styles.timeText}>{this.state.nowMinutes}</Text>
              </View>
          </View>
        );
    }
}
const width=Dimensions.get('window').width,height=Dimensions.get('window').height;
const styles = StyleSheet.create({
    dateTitle:{
        // backgroundColor:'orange',
        width:width,
        height:100,
        flexDirection:'row',
      },
      dateLeft:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        width:width/2,
      },
      dateRight:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:width/2,
      },
      dayLeft:{
        justifyContent:'center',
        alignItems:'flex-end',
        width:width/4,
        height:100,
        paddingRight:10,
        // backgroundColor:'red',
      },
      dayRight:{
        justifyContent:'center',
        alignItems:'flex-start',
        width:width/4,
        flexDirection:'column',
        height:100,
        // backgroundColor:'blue',
      },
      dayText:{
        fontSize:50,
        color:'black',
        justifyContent:'flex-end',
      },
      monthText:{
        fontSize:20,
        color:'black',
        justifyContent:'flex-start',
      },
      yearText:{
        fontSize:20,
        color:'black',
        justifyContent:'flex-start',
      },
      timeText:{
        fontSize:50,
        color:'black',
      }
})

export default DateTitle;