import { sendNotification, cancelNotifications } from "../utils/notifications.js";
import {View, StyleSheet, ScrollView, Text, AppState} from "react-native";
import { getStoredTasks } from "../utils/storage.js";
import {useState, useEffect, useRef} from "react";
import PrettyButton from "../components/prettyButton.js";
import TaskPanel from "../components/taskPanel.js";
import kosher from "../utils/kosher.json";

export default function Tasks({navigation,route}){
    const {hours,minutes,seconds} = route.params;
    const [timeLeft,setTimeLeft] = useState(hours*3600+minutes*60+seconds);
    const [run,setRun] = useState(false);

    const [tasksCompleted, setTasksCompleted] = useState(0);
    const [tasksFailed, setTasksFailed] = useState(0);
    const [timeSkipped, setTimeSkipped] = useState(0);

    const [tasks,setTasks] = useState();
    const [storedTasks,setStoredTasks] = useState();

    const adjustTime = (delta) => {
        setTimeLeft(t => t-delta);
        if(timeLeft <= 0){
            setRun(false);
            setTimeLeft(0);
        }
    };

    const reset = () => {
        setRun(false);
        setTimeLeft(hours*3600+minutes*60+seconds);
        setResetValue(!resetValue);
        setTasksCompleted(0);
        setTasksFailed(0);
        setTimeSkipped(0);
    };

    useEffect(()=>{
        let leaveTime = 0;
        const stateListener = AppState.addEventListener("change",(state)=>{
            if(state==="background"){
                leaveTime = Date.now();
                if(run){
                    sendNotification("Schumer Timer","Your Timer Has Finished!",timeLeft);
                }
            }else if(state==="active"){
                cancelNotifications();
                let elapsed = Math.floor((Date.now()-leaveTime)/1000);
                if(run){
                    adjustTime(elapsed);
                }
            }
        });
        let intervalID;
        if(run){
            intervalID = setInterval(() => {
                adjustTime(1);
            }, 1000);
            return ()=>{
                clearInterval(intervalID);
                stateListener.remove();
            };
        }
        return ()=>stateListener.remove();
    },[timeLeft,run]);

    const toTime = () => {
        let h = parseInt(timeLeft/3600);
        let m = parseInt((timeLeft%3600)/60);
        let s = parseInt(timeLeft%60);
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
    };

    const [resetValue,setResetValue] = useState(false);

    useEffect(()=>{
        let t = kosher.map((t,i)=>{
            return(
                <TaskPanel task={t} value={adjustTime} reset={resetValue} pass={setTasksCompleted} fail={setTasksFailed} skip={setTimeSkipped} key={i}/>
            );
        });
        setTasks(t);
        (async ()=>{
            let stored = await getStoredTasks();
            let s = stored.map((t,i)=>{
                return(
                    <TaskPanel task={t} value={adjustTime} reset={resetValue} pass={setTasksCompleted} fail={setTasksFailed} skip={setTimeSkipped} key={i}/>
                );
            });
            setStoredTasks(s);
        })();
    },[resetValue]);

    const buttonName = (timeLeft<=0)?"Continue":(run?"Stop":"Start");
    const buttonStyle = (timeLeft<=0)?Styles.continue:(run?Styles.stop:Styles.start);
    const buttonPress = () => {
        if(timeLeft>0){
            setRun(!run);
        }else{
            navigation.navigate("End",{hours,minutes,seconds,timeSkipped,tasksCompleted,tasksFailed});
        }
    };

    return(
        <View style={Styles.Background}>
            <Text style={Styles.Clock}>{toTime()}</Text>
            <View style={Styles.Header}>
                <PrettyButton title={buttonName} style={buttonStyle} onPress={buttonPress}/>
                <View style={Styles.HorizontalSpacer}/>
                <PrettyButton title={"Reset"} style={Styles.reset} onPress={reset}/>
            </View>
            <ScrollView contentContainerStyle={Styles.Container}>
                <View style={Styles.VerticalSpacer}/>
                {tasks}
                {storedTasks}
            </ScrollView>
        </View>
    );
}

const Styles = StyleSheet.create({
    Background:{
        backgroundColor:"green",
        flex:1
    },
    Clock:{
        textAlign:"center",
        fontSize:50,
        paddingTop:"10%",
        fontWeight:"bold",
        backgroundColor:"blue",
        color:"white"
    },
    Header:{
        alignItems:"center",
        justifyContent:"center",
        height:"13%",
        flexDirection:"row",
        borderBottomWidth:10,
        paddingBottom:"5%",
        backgroundColor:"blue"
    },
    start:{
        width:"30%",
        height:"100%",
        backgroundColor:"white",
        fontColor:"black",
        fontSize:30,
        borderRadius:5,
        borderWidth:3
    },
    stop:{
        width:"30%",
        height:"100%",
        backgroundColor:"yellow",
        fontColor:"black",
        fontSize:30,
        borderRadius:5,
        borderWidth:3
    },
    reset:{
        width:"30%",
        height:"100%",
        backgroundColor:"red",
        fontColor:"black",
        fontSize:30,
        borderRadius:5,
        borderWidth:3
    },
    continue:{
        width:"30%",
        height:"100%",
        backgroundColor:"#00ba06",
        fontColor:"black",
        fontSize:23,
        borderRadius:5,
        borderWidth:3
    },
    Container:{
        alignItems:"center"
    },
    VerticalSpacer:{
        height:20
    },
    HorizontalSpacer:{
        width:"10%"
    }
});