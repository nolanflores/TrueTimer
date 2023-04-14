import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Review from "./review.js";
import Create from "./create.js";

const Tab = createMaterialTopTabNavigator();

export default function CreateNav() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarLabelStyle: { fontSize: 25, fontWeight:"bold", color:"white",marginTop:"60%" },
        tabBarStyle: { backgroundColor: 'blue',borderBottomWidth:10, height:"15%"},
        tabBarIndicatorStyle:{backgroundColor:"white"},
      }}>
      <Tab.Screen name="Create" component={Create} />
      <Tab.Screen name="Review" component={Review} />
    </Tab.Navigator>
  );
}