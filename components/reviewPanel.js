import {View,Text,StyleSheet} from "react-native";
import {removeStoredTask} from "../utils/storage.js";
import PrettyButton from "./prettyButton.js";

export default function ReviewPanel(props){
    const {type,message,reward,penalty,maximum,increment,minimum} = props.task;
    const index = props.index ?? 0;
    const callback = props.callback ?? (()=>{});

    const deleteSelf = async () =>{
        await removeStoredTask(index);
        callback(x=>!x);
    };

    let bottom;
    switch (type) {
        case "simple":
            bottom = <Text>Reward: {reward}</Text>;
            break;
        case "pass":
            bottom = <>
                        <Text>Reward: {reward}</Text>
                        <View style={Styles.HorizontalSpacer}/>
                        <Text>Penalty: {penalty}</Text>
                    </>;
            break;
        case "time":
            bottom = <>
                        <Text>Minumum: {minimum}</Text>
                        <View style={Styles.HorizontalSpacer}/>
                        <Text>Increment: {increment}</Text>
                    </>;
            break;
    }

    const text = (message.length < 45) ? message : message.substring(0,45)+"...";
    return(
        <>
            <View style={Styles.TopMargin}/>
            <View style={Styles.Container}>
                <View style={Styles.VerticalSpacer}/>
                <View style={Styles.Header}>
                    <Text style={Styles.Description}>{text}</Text>
                    <PrettyButton style={Styles.DeleteButton} title={"Delete"} onPress={deleteSelf}/>
                </View>
                <View style={Styles.Body}>
                    <Text>Type: {type}</Text>
                    <View style={Styles.HorizontalSpacer}/>
                    <Text>Max Uses: {(maximum===null)?"✓":maximum}</Text>
                </View>
                <View style={Styles.Body}>
                    {bottom}
                </View>
            </View>
        </>
    );
}

const Styles = StyleSheet.create({
    Container:{
        backgroundColor:"gray",
        width:"75%",
        height:150,
        borderRadius:10,
        borderWidth:3,
        alignItems:"center"
    },
    Header:{
        flexDirection:"row",
        width:"100%",
        height:"40%",
        alignItems:"center",
        justifyContent:"center"
    },
    Description:{
        width:"65%",
        fontSize:15
    },
    DeleteButton:{
        width:"25%",
        height:"100%",
        backgroundColor:"red",
        borderRadius:5
    },
    Body:{
        flexDirection:"row",
        paddingTop:"4%"
    },
    VerticalSpacer:{
        height:"8%"
    },
    HorizontalSpacer:{
        width:"15%"
    },
    TopMargin:{
        height:20
    }
});