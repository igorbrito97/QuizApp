import { createStackNavigator } from '@react-navigation/stack';
import React, {useState} from 'react';
import { 
  FlatList,
  Image,
  StyleSheet, 
  Text,
  TextInput,
  TouchableOpacity,
  View 
} from 'react-native';

import Game from "../Game";
import Results from "../Results";
import Leaderboard from "../Leaderboard";

const HomeStack = createStackNavigator();

const DATA = [
    {
        title:'New', 
        key: '1', 
        icon: require('/home/iguinho/Documentos/QuizApp/src/media/plusIcon.png'), 
        onClick: 'NewGame'
    },
    {
        title:'My results', 
        key:'2', 
        icon: require('/home/iguinho/Documentos/QuizApp/src/media/resultsIcon.png'),
        onClick: 'MyResults'
    },
    {
        title:'Leaderboard',
        key:'3', 
        icon: require('/home/iguinho/Documentos/QuizApp/src/media/leaderboardIcon.png'),
        onClick: 'Leaderboard'
    },
    {
        title:'Log out',
        key:'4', 
        icon: require('/home/iguinho/Documentos/QuizApp/src/media/exitIcon.png'),
        onClick: null
    }
]

export default function Home({navigation}) {
    //aqui vai ter um stack navigator -> ai um flatlist com botoes (igual aos carros do zonaAzul) -> novo quiz/ resultados / sair ..... (talvez fazer um card para os ultimos ou melhores....)
    return (
        <HomeStack.Navigator initialRouteName="Main">
            <HomeStack.Screen 
                name="Main" 
                component={Main}
                options={{
                    headerShown: false
                }}
            />
            <HomeStack.Screen 
                name="NewGame" 
                component={Game}
                options={{
                    headerShown: false
                }}
            />
            <HomeStack.Screen 
                name="MyResults" 
                component={Results}
                options={{
                    headerShown: false
                }}
            />
            <HomeStack.Screen 
                name="Leaderboard" 
                component={Leaderboard}
                options={{
                    headerShown: false
                }}
            />
        </HomeStack.Navigator>
    )
}

function Main({navigation}){
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Welcome!</Text>
            <FlatList 
                style={{marginTop: 85}}
                numColumns={2}
                data={DATA}
                renderItem={({item,index}) => {
                    return (
                        <TouchableOpacity 
                            style={styles.listItems}
                            key={item.key}
                            onPress={() => {
                                if(item.onClick != null)
                                    navigation.navigate(item.onClick)
                            }}
                        >
                            <Image source={item.icon}/>
                            <Text style={styles.listText}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#2B69CA'
    },
    titleText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 100,
        marginBottom: 50
    },
    listItems: {
        width: 140,
        height: 140,
        backgroundColor: 'white',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    listText: {
        fontSize: 18,
        color: 'black',
        fontWeight: '700',
        marginTop: 10
    }
})