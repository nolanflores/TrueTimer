import { View, Text, ScrollView, StyleSheet } from "react-native";
import PrettyButton from "../components/prettyButton.js";

export default function End({navigation,route}){
    const {hours,minutes,seconds,tasksCompleted,tasksFailed,timeSkipped} = route.params;
    const timeWatched = secondsToTime(triTimetoSeconds(hours,minutes,seconds)-timeSkipped);

    return(
        <View style={Styles.Background}>
            <View style={{height:"10%"}}/>
            <ScrollView style={Styles.Frame} contentContainerStyle={Styles.FrameContainer}>
                <Text style={Styles.Summary}>Summary</Text>
                <Text style={Styles.Title}>Total Time:</Text>
                <Text style={Styles.Text}>{triTimetoString(hours,minutes,seconds)}</Text>
                <Text style={Styles.Title}>Time Skipped:</Text>
                <Text style={Styles.Text}>{secondsToTime(timeSkipped)}</Text>
                <Text style={Styles.Title}>Time Watched:</Text>
                <Text style={Styles.Text}>{timeWatched}</Text>
                <Text style={Styles.Title}>Tasks Completed:</Text>
                <Text style={Styles.Text}>{tasksCompleted}</Text>
                <Text style={Styles.Title}>Tasks Failed:</Text>
                <Text style={Styles.Text}>{tasksFailed}</Text>
            </ScrollView>
            <View style={Styles.Spacer}/>
            <PrettyButton style={Styles.Button} title={"Home"} onPress={()=>navigation.navigate("Home")}/>
            <View style={Styles.Spacer}/>
        </View>
    );
}

const Styles = StyleSheet.create({
    Background:{
        backgroundColor:"green",
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    Frame:{
        backgroundColor:"gray",
        width:"75%",
        borderRadius:20,
        borderWidth:5
    },
    FrameContainer:{
        alignItems:"center",
    },
    Summary:{
        fontSize:45,
        fontWeight:"bold",
        paddingBottom:25
    },
    Title:{
        fontSize:35,
        fontWeight:"bold",
        textAlign:"center"
    },
    Text:{
        fontSize:30,
        paddingBottom:20
    },
    Button:{
        width:"40%",
        height:"9%",
        backgroundColor:"blue",
        borderRadius:10,
        borderWidth:4,
        fontColor:"white",
        fontSize:30,
        fontWeight:"bold"
    },
    Spacer:{
        height:"5%"
    }
});

function secondsToTime(seconds){
    let h = parseInt(seconds/3600);
    let m = parseInt((seconds%3600)/60);
    let s = parseInt(seconds%60);
    let t = "";
    if(h>0)
        t += h;
    else
        t+= 0
    if(m < 10 && m > 0)
        t += ":0"+m;
    else if(m>0)
        t += ":"+m;
    else
        t += ":00";
    if(s < 10 && s > 0)
        t += ":0"+s;
    else if(s > 0)
        t += ":"+s;
    else
        t+= ":00"
    return t;
}
function triTimetoSeconds(h,m,s){
    return s+m*60+h*3600;
}
function triTimetoString(h,m,s){
    let t = ""+h;
    if(m < 10)
        t += ":0"+m;
    else if(m>0)
        t += ":"+m;
    else
        t += ":00";
    if(s < 10 && s > 0)
        t += ":0"+s;
    else if(s > 0)
        t += ":"+s;
    else
        t+= ":00";
    return t;
}
