import { View,Text, StyleSheet, PermissionsAndroid, Platform } from "react-native";
import { useState, useEffect } from "react";
import PrettyButton from "../components/prettyButton.js";
import TimeSelect from "../components/timeSelect.js";

export default function Home({navigation}){

    const [hours,setHours] = useState(5);
    const [minutes,setMinutes] = useState(0);
    const [seconds,setSeconds] = useState(0);

    useEffect(()=>{
        if(Platform.OS === "android"){
            const requestPermission = async () => {
                let permission = false;
                while(!permission){
                    const access = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                    permission = access === PermissionsAndroid.RESULTS.GRANTED;
                }
            };
            requestPermission();
        }
    },[]);

    return(
        <View style={Styles.Background}>
            <View style={Styles.Header}>
                <Text style={Styles.HeaderText}>Congrats, you have to watch Amy Schumer!</Text>
            </View>
            <View style={Styles.SubHeader}>
                <View/>
                <PrettyButton style={Styles.CreateButton} title={"Custom Tasks"} onPress={()=>navigation.navigate("CreateNav")}/>
            </View>
            <View style={Styles.Body}>
                <Text style={Styles.TimeLabel}>Hours</Text>
                <TimeSelect style={Styles.TimeSelect} default={hours} value={setHours} maximum={9}/>
                <Text style={Styles.TimeLabel}>Minutes</Text>
                <TimeSelect style={Styles.TimeSelect} default={minutes} value={setMinutes}/>
                <Text style={Styles.TimeLabel}>Seconds</Text>
                <TimeSelect style={Styles.TimeSelect} default={seconds} value={setSeconds}/>
                <View style={Styles.Spacer}/>
                <PrettyButton style={Styles.Continue} title={"Continue"} onPress={()=>{navigation.navigate("Tasks",{hours,minutes,seconds})}}/>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    Background:{
        flex:1,
        backgroundColor:"green",
    },
    Header:{
        backgroundColor:"blue",
        height:"18%",
        borderBottomWidth:10,
        justifyContent:"center",
    },
    SubHeader:{
        height:"6%",
        width:"100%",
        alignItems:"flex-end"
    },
    CreateButton:{
        width:"31%",
        height:"100%",
        backgroundColor:"blue",
        paddingRight:"4%",
        paddingTop:"4%",
        borderRadius:5,
        borderWidth:3,
        fontColor:"white"
    },
    Body:{
        flex:1,
        alignItems:"center"
    },
    HeaderText:{
        color:"white",
        fontWeight:"bold",
        fontSize:30,
        textAlign:"center",
        paddingTop:"8%",
        paddingHorizontal:"5%"
    },
    Continue:{
        backgroundColor:"blue",
        height:"10%",
        width:"40%",
        fontColor:"white",
        fontWeight:"bold",
        fontSize:20,
        borderRadius:8,
        borderWidth:5,
    },
    TimeSelect:{
        backgroundColor:"gray",
        width:"75%",
        height:"13%",
        borderWidth:3,
        borderRadius:10,
        color:"white"
    },
    TimeLabel:{
        fontSize:24,
        fontWeight:"bold",
        height:"7%",
        textAlignVertical:"bottom"
    },
    Spacer:{
        height:"5%"
    }
});