import { View, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import {getStoredTasks,clearStoredTasks} from "../utils/storage.js";
import PrettyButton from "../components/prettyButton.js";
import ReviewPanel from "../components/reviewPanel.js";

export default function Review({navigation}){

    const [tasks,setTasks] = useState();
    const [refresh,setRefresh] = useState(false);

    useEffect(()=>{
        (async ()=>{
            let s = await getStoredTasks();
            s = s.map((t,i)=>{return(
                <ReviewPanel task={t} index={i} callback={setRefresh} key={i}/>
            );});
            setTasks(s);
        })();
    },[refresh]);

    const deleteAll = async () =>{
        await clearStoredTasks();
        setRefresh(!refresh);
    };

    return(
        <>
            <ScrollView style={Styles.Background} contentContainerStyle={Styles.Content}>
                {tasks}
            </ScrollView>
            <View style={Styles.VerticalSpacer}/>
            <View style={Styles.Row}>
                <PrettyButton style={Styles.HomeButton} title={"Home"} onPress={()=>navigation.navigate("Home")}/>
                <View style={Styles.HorizontalSpacer}/>
                <PrettyButton style={Styles.DeleteButton} title={"Delete All"} onLongPress={deleteAll}/>
            </View>
        </>
    );
}

const Styles = StyleSheet.create({
    Background:{
        backgroundColor:"green"
    },
    Content:{
        alignItems:"center"
    },
    VerticalSpacer:{
        height:20,
        backgroundColor:"green"
    },
    Row:{
        height:"12%",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"green"
    },
    HomeButton:{
        width:"40%",
        height:"70%",
        backgroundColor:"blue",
        fontColor:"white",
        borderRadius:10,
        borderWidth:3,
        fontSize:30
    },
    DeleteButton:{
        width:"40%",
        height:"70%",
        backgroundColor:"red",
        borderRadius:10,
        borderWidth:3,
        fontColor:"black",
        fontSize:30
    },
    HorizontalSpacer:{
        width:"5%"
    }
});