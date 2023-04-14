import { View, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import { sendNotification } from "../utils/notifications.js";

export default function TimeSelect(props){
    const Styles = props.style ?? {};
    const max = props.maximum ?? 59;
    const min = props.minimum ?? 0;
    const increment = props.increment ?? 1;
    const [fontSize,setFontSize] = useState();
    const [value,setValue] = useState(props.default ?? min);

    useEffect(()=>{
        try{
            if(props.value !== undefined){
                props.value(value);
            }
        }catch(e){console.error(e);}
    },[value]);

    return(
        <View style={{
            width:Styles.width,
            height:Styles.height,
        }}>
            <View style={{
                width:"100%",
                height:"100%",
                backgroundColor:Styles.backgroundColor,
                borderRadius:Styles.borderRadius,
                borderWidth:Styles.borderWidth,
                alignItems:"center",
                justifyContent:"center",
                flexDirection:"row",
            }} onLayout={(event) => {
                let h = event.nativeEvent.layout.height;
                setFontSize(h/3);
            }}>
                <TouchableOpacity style={{
                    width:"20%",
                    height:"60%",
                    borderRadius:3,
                    backgroundColor:Styles.color
                }} onPress={()=>{
                    if(value-increment>=min){setValue(value-increment);}
                }}>
                    <Text style={{fontSize:fontSize,textAlign:"center",textAlignVertical:"center",flex:1}}>-</Text>
                </TouchableOpacity>
                <View style={{width:"10%"}}/>
                <TextInput style={{
                    width:"26%",
                    height:"60%",
                    borderRadius:3,
                    backgroundColor:Styles.color,
                    textAlign:"center",
                    fontSize:fontSize,
                }}
                keyboardType="numeric"
                value={""+value}
                onChangeText={(text)=>{
                    let num = parseInt(text);
                    if(num >= min && num <= max){
                        setValue(num);
                    }else if(text === ""){
                        setValue(min);
                    }
                }}
                />
                <View style={{width:"10%"}}/>
                <TouchableOpacity style={{
                    width:"20%",
                    height:"60%",
                    borderRadius:3,
                    backgroundColor:Styles.color
                }} onPress={()=>{
                    if(value+increment<=max){setValue(value+increment);}
                }}>
                    <Text style={{fontSize:fontSize,textAlign:"center",textAlignVertical:"center",flex:1}}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}