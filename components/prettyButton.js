import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";

export default function PrettyButton(props){
    const style = props.style ?? {};
    const press = props.onPress ?? (()=>{});
    const longPress = props.onLongPress ?? (()=>{});
    return(
        <View style={{
            width:style.width,
            height:style.height,
            padding:style.padding,
            paddingTop:style.paddingTop,
            paddingBottom:style.paddingBottom,
            paddingLeft:style.paddingLeft,
            paddingRight:style.paddingRight,
            paddingVertical:style.paddingVertical,
            paddingHorizontal:style.paddingHorizontal
        }}>
            <TouchableOpacity onPress={press} onLongPress={longPress}>
                <Text style={{
                    backgroundColor:style.backgroundColor,
                    width:"100%",
                    height:"100%",
                    textAlign:"center",
                    textAlignVertical:"center",
                    borderWidth:style.borderWidth,
                    borderRadius:style.borderRadius,
                    borderColor:style.borderColor,
                    color:style.fontColor,
                    fontSize:style.fontSize,
                    fontWeight:style.fontWeight,
                    }}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    );
}