import AsyncStorage from '@react-native-async-storage/async-storage';

async function getStoredTasks(){
    try{
        const tasks = await JSON.parse(await AsyncStorage.getItem("@Tasks")) ?? [];
        return tasks;
    }catch(e){console.error(e);}
}

async function storeTask(task){
    try{
        const tasks = await getStoredTasks();
        tasks.push(task);
        AsyncStorage.setItem("@Tasks",await JSON.stringify(tasks));
    }catch(e){console.error(e);}
}

async function removeStoredTask(index){
    try{
        const tasks = await getStoredTasks();
        tasks.splice(index,1);
        AsyncStorage.setItem("@Tasks",await JSON.stringify(tasks));
    }catch(e){console.error(e);}
}

async function clearStoredTasks(){
    try{
        AsyncStorage.removeItem("@Tasks");
    }catch(e){console.error(e);}
}

export {getStoredTasks,storeTask,clearStoredTasks,removeStoredTask};