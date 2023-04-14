import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import TimeSelect from "../components/timeSelect.js";
import PrettyButton from "../components/prettyButton.js";

export default function TaskPanel(props){
    const {type,message,reward,penalty,maximum,increment,minimum} = props.task;
    const value = props.value ?? (()=>{});
    const passCount = props.pass ?? (()=>{});
    const failCount = props.fail ?? (()=>{});
    const skipTime = props.skip ?? (()=>{});
    const reset = props.reset;

    const [used,setUsed] = useState(maximum);
    const [custom,setCustom] = useState(0);

    useEffect(()=>{
        setUsed(maximum);
    },[reset]);

    const pass = () => {
        if(maximum===null){
            value(reward*60);
            passCount(c=>c+1);
            skipTime(s=>s+(reward*60));
        }else if(used > 0){
            value(reward*60);
            setUsed(used-1);
            passCount(c=>c+1);
            skipTime(s=>s+(reward*60));
        }
    };
    const fail = () => {
        if(maximum===null){
            value(-penalty*60);
            failCount(f=>f+1);
            skipTime(s=>s-(penalty*60));
        }else if(used > 0){
            value(-penalty*60);
            setUsed(used-1);
            failCount(f=>f+1);
            skipTime(s=>s-(penalty*60));
        }

    };
    const time = () => {
        if(maximum===null){
            value(custom*60);
            skipTime(s=>s+custom*60);
        }else if(used > 0){
            value(custom*60);
            setUsed(used-1);
            skipTime(s=>s+custom*60);
        }
    };

    let flag = used>0||maximum===null;

    if(type==="simple"){
        return(
            <>
                <View style={Styles.Background}>
                    <View style={Styles.Spacer}/>
                    <Text style={Styles.WideDescription}>{message} (-{reward})</Text>
                    <View style={Styles.Spacer}/>
                    <PrettyButton style={flag?Styles.Button:Styles.UsedButton} title={maximum===null?"✓":used} onPress={pass}/>
                </View>
                <View style={Styles.BottomSpacer}/>
            </>
        );
    }else if(type==="pass"){
        return(
            <>
                <View style={Styles.Background}>
                    <View style={Styles.Spacer}/>
                    <Text style={Styles.Description}>{message}</Text>
                    <View style={Styles.Spacer}/>
                    <View style={Styles.PassView}>
                        <PrettyButton style={flag?Styles.PassButton:Styles.FailButton} title={"Pass "+reward} onPress={pass}/>
                        <View style={Styles.VerticalSpacer}/>
                        <PrettyButton style={Styles.FailButton} title={"Fail"+(penalty!==0?" "+penalty:"")} onPress={fail}/>
                    </View>
                    <View style={Styles.Spacer}/>
                    <View style={Styles.PassCount}>
                        <Text style={Styles.PassCountText}>{used}</Text>
                    </View>
                </View>
                <View style={Styles.BottomSpacer}/>
            </>
        );
    }else if(type==="time"){
        return(
            <>
                <View style={Styles.Background}>
                    <View style={Styles.Spacer}/>
                    <Text style={Styles.Description}>{message}</Text>
                    <View style={Styles.Spacer}/>
                    <View style={Styles.TimeView}>
                        <TimeSelect style={Styles.TimeSelect} increment={increment} maximum={99999999999} value={setCustom} minimum={minimum}/>
                        <View style={Styles.VerticalSpacer}/>
                        <PrettyButton style={flag?Styles.TimeButton:Styles.UsedTimeButton} title={maximum===null?"✓":used} onPress={time}/>
                    </View>
                </View>
                <View style={Styles.BottomSpacer}/>
            </>
        );
    }else{
        console.error("\""+type+"\" is not a valid task type");
    }
}

const Styles = StyleSheet.create({
    Background:{
        backgroundColor:"gray",
        height:100,
        width:"75%",
        borderRadius:10,
        borderWidth:3,
        flexDirection:"row",
        alignItems:"center"
    },
    Description:{
        width:"45%",
        fontSize:15,
        fontWeight:"bold"
    },
    WideDescription:{
        width:"60%",
        fontSize:15,
        fontWeight:"bold"
    },
    Button:{
        backgroundColor:"#00ba06",
        width:"19%",
        height:"60%",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        fontSize:30
    },
    UsedButton:{
        backgroundColor:"red",
        width:"19%",
        height:"60%",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        fontSize:30
    },
    PassView:{
        width:"23%",
        height:"80%"
    },
    PassButton:{
        width:"100%",
        height:"47%",
        backgroundColor:"#00ba06",
        borderRadius:5,
        fontWeight:"bold",
        fontSize:15
    },
    FailButton:{
        width:"100%",
        height:"47%",
        backgroundColor:"red",
        borderRadius:5,
        fontWeight:"bold",
        fontSize:15
    },
    PassCount:{
        width:"14%",
        height:"50%",
        backgroundColor:"white",
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:2
    },
    PassCountText:{
        fontSize:30
    },
    TimeView:{
        width:"40%",
        alignItems:"center"
    },
    TimeSelect:{
        width:"100%",
        backgroundColor:"white",
        height:"50%",
        color:"gray",
        borderRadius:8
    },
    TimeButton:{
        width:"75%",
        height:"30%",
        backgroundColor:"#00ba06",
        borderRadius:5,
        fontWeight:"bold"
    },
    UsedTimeButton:{
        width:"75%",
        height:"30%",
        backgroundColor:"red",
        borderRadius:5,
        fontWeight:"bold"
    },
    Spacer:{
        width:"5%"
    },
    VerticalSpacer:{
        height:"5%"
    },
    BottomSpacer:{
        height:20
    }
});