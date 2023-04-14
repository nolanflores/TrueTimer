import { View, Text, TextInput, StyleSheet, Keyboard, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { storeTask } from "../utils/storage.js";
import PrettyButton from "../components/prettyButton.js";
import TimeSelect from "../components/timeSelect.js";

export default function Create({navigation}){

    const [type,setType] = useState("simple");
    const [data,setData] = useState(null);

    let form;
    switch(type){
        case "simple":
            form = <SimpleTask value={setData}/>;
            break;
        case "pass":
            form = <PassTask value={setData}/>;
            break;
        case "time":
            form = <TimeTask value={setData}/>
            break;
        default:
            form = null;
            break;
    }

    const createTask = ()=>{
        if(data!==null){
            storeTask(data);
            navigation.navigate("Home");
        }
    };

    return(
        <View style={Styles.Background}>
            <View style={Styles.TypeBar}>
                <PrettyButton style={type==="pass"?Styles.Selected:Styles.Option} title={"Pass"} onPress={()=>setType("pass")}/>
                <View style={Styles.Spacer}/>
                <PrettyButton style={type==="simple"?Styles.Selected:Styles.Option} title={"Simple"} onPress={()=>setType("simple")}/>
                <View style={Styles.Spacer}/>
                <PrettyButton style={type==="time"?Styles.Selected:Styles.Option} title={"Time"} onPress={()=>setType("time")}/>
            </View>
            {form}
            <View style={Styles.ButtonBar}>
                <PrettyButton style={Styles.HomeButton} title={"Home"} onPress={()=>navigation.navigate("Home")}/>
                <View style={Styles.Spacer}/>
                <PrettyButton style={Styles.CreateButton} title={"Create"} onPress={createTask}/>
            </View>
        </View>
    );
}

function SimpleTask(props){
    let value = props.value ?? (()=>{});
    const [data,setData] = useState({type:"simple",message:"You didn't enter a task prompt, you idiot.",reward:0,maximum:null});
    useEffect(()=>{
        value(data);
    },[data]);

    const changeMessage = (m)=>{
        data.message = m;
        setData({...data});
    };
    const changeReward = (r)=>{
        data.reward = r;
        setData({...data});
    };
    const changeMaximum = (x)=>{
        if(x===0)
            data.maximum = null;
        else
            data.maximum = x;
        setData({...data});
    }

    return(
        <Pressable style={Styles.Container} onPress={Keyboard.dismiss}>
            <TextInput placeholder={"Input Task Prompt"} multiline={true} onChangeText={changeMessage} style={Styles.TallTextInput}/>
            <Text style={Styles.LabelText}>Reward</Text>
            <TimeSelect value={changeReward} style={Styles.TallNumSelector}/>
            <Text style={Styles.LabelText}>Maximum (0 = Infinite)</Text>
            <TimeSelect value={changeMaximum} style={Styles.TallNumSelector}/>
        </Pressable>
    );
}

function PassTask(props){
    let value = props.value ?? (()=>{});
    const [data,setData] = useState({type:"pass",message:"You didn't enter a task prompt, you fucking idiot.",reward:0,penalty:0,maximum:null});
    useEffect(()=>{
        value(data);
    },[data]);

    const changeMessage = (m)=>{
        data.message = m;
        setData({...data});
    };
    const changeReward = (r)=>{
        data.reward = r;
        setData({...data});
    };
    const changePenalty = (p)=>{
        data.penalty = p;
        setData({...data});
    };
    const changeMaximum = (x)=>{
        if(x===0)
            data.maximum = null;
        else
            data.maximum = x;
        setData({...data});
    }

    return(
        <Pressable style={Styles.Container} onPress={Keyboard.dismiss}>
            <TextInput placeholder={"Input Task Prompt"} multiline={true} onChangeText={changeMessage} style={Styles.TextInput}/>
            <Text style={Styles.LabelText}>Reward</Text>
            <TimeSelect value={changeReward} style={Styles.NumSelector}/>
            <Text style={Styles.LabelText}>Penalty</Text>
            <TimeSelect value={changePenalty} style={Styles.NumSelector}/>
            <Text style={Styles.LabelText}>Maximum (0 = Infinite)</Text>
            <TimeSelect value={changeMaximum} style={Styles.NumSelector}/>
        </Pressable>
    );
}

function TimeTask(props){
    let value = props.value ?? (()=>{});
    const [data,setData] = useState({type:"time",message:"You didn't enter a task prompt, you fucking idiot.",minimum:0,increment:1,maximum:null});
    useEffect(()=>{
        value(data);
    },[data]);

    const changeMessage = (m)=>{
        data.message = m;
        setData({...data});
    };
    const changeMinimum = (n)=>{
        data.minimum = n;
        setData({...data});
    };
    const changeIncrement = (i)=>{
        data.penalty = i;
        setData({...data});
    };
    const changeMaximum = (x)=>{
        if(x===0)
            data.maximum = null;
        else
            data.maximum = x;
        setData({...data});
    }

    return(
        <Pressable style={Styles.Container} onPress={Keyboard.dismiss}>
            <TextInput placeholder={"Input Task Prompt"} multiline={true} onChangeText={changeMessage} style={Styles.TextInput}/>
            <Text style={Styles.LabelText}>Default</Text>
            <TimeSelect value={changeMinimum} style={Styles.NumSelector}/>
            <Text style={Styles.LabelText}>Increment</Text>
            <TimeSelect value={changeIncrement} minimum={1} style={Styles.NumSelector}/>
            <Text style={Styles.LabelText}>Maximum (0 = Infinite)</Text>
            <TimeSelect value={changeMaximum} style={Styles.NumSelector}/>
        </Pressable>
    );
}

const Styles = StyleSheet.create({
    Background:{
        flex:1,
        backgroundColor:"green"
    },
    Header:{
        backgroundColor:"blue",
        width:"100%",
        height:"15%",
        borderBottomWidth:8,
        alignItems:"center",
        justifyContent:"center"
    },
    TypeBar:{
        flexDirection:"row",
        height:"15%",
        alignItems:"center",
        justifyContent:"center"
    },
    Option:{
        backgroundColor:"gray",
        width:"25%",
        height:"50%",
        borderRadius:10,
        fontSize:20
    },
    Selected:{
        backgroundColor:"#00ba06",
        width:"25%",
        height:"50%",
        borderRadius:10,
        fontSize:20
    },
    Container:{
        flex:1,
        alignItems:"center"
    },
    NumSelector:{
        width:"75%",
        height:"18%",
        backgroundColor:"white",
        color:"gray",
        borderRadius:10
    },
    LabelText:{
        fontSize:20,
        height:"8%",
        textAlignVertical:"bottom"
    },
    TextInput:{
        backgroundColor:"white",
        width:"75%",
        height:"18%",
        textAlign:"center",
        textAlignVertical:"center",
        borderRadius:10,
        fontSize:20
    },
    TallTextInput:{
        backgroundColor:"white",
        width:"75%",
        height:"20%",
        textAlign:"center",
        textAlignVertical:"center",
        borderRadius:10,
        fontSize:20
    },
    TallNumSelector:{
        width:"75%",
        height:"20%",
        backgroundColor:"white",
        color:"gray",
        borderRadius:10
    },
    ButtonBar:{
        height:"12%",
        justifyContent:"center",
        flexDirection:"row"
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
    CreateButton:{
        width:"40%",
        height:"70%",
        backgroundColor:"#00ba06",
        borderRadius:10,
        borderWidth:3,
        fontSize:30
    },
    Spacer:{
        width:"5%"
    }
});