import React, {useState, useEffect} from 'react';
import { 
    Alert,
  StyleSheet, 
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons'; 

const GameStack = createStackNavigator();

export default function Game() {
    return (
        <GameStack.Navigator>
            <GameStack.Screen 
                name="PlayGame"
                component={Play}
            />
            <GameStack.Screen 
                name="Quiz"
                component={Quiz}
            />
        </GameStack.Navigator>
    )
} 

function Play() {
    const [categories, setCategories] = useState([]);
    const [difficulty, setDifficulty] = useState('E');
    const [selectedQuiz,setQuiz] = useState("");

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
        .then((response) => response.json())
        .then((json) => {
            setCategories(json.trivia_categories);
            return json.trivia_categories;
        })
        .catch((error) => {
            console.log(error);
        })

    },[]);

    function fetchQuestions(quizUrl){
        fetch(quizUrl)
        .then((response) => response.json())
        .then((json) => {
            console.log('jasonnnnnnnnnnnnnnn');
            console.log(json);
            if(json.response_code == "0")
                return json.results;
            else {
                Alert.alert("Could not get questions in this difficulty for this category. Please choose again!");
                return null;
            }
        })
        .catch((error => {
            console.log(error);
            Alert.alert("Error in fetching questions");
            return null;
        }))
    }


    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>New game</Text>
            <Text style={styles.dropdownLabel}>Category:</Text>
            <Picker
                selectedValue={selectedQuiz}
                style={styles.dropdown}
                itemStyle={styles.dropdownItem}
                onValueChange={(value,index) => setQuiz(value)}
            >
                <Picker.Item label="Select a category" value="" />
                {
                    categories && categories !== [] && categories.length > 0 &&
                    categories.map((item,index) => {
                        return (
                            <Picker.Item label={item.name} value={item.id} key={index}/>
                        );
                    })
                }
            </Picker>
            <Text style={styles.dropdownLabel}>Difficulty:</Text>
            <Picker
                selectedValue={difficulty}
                style={styles.dropdown}
                onValueChange={(value,index) => setDifficulty(value)}
            >
                <Picker.Item label="Easy" value="E" />
                <Picker.Item label="Medium" value="M" />
                <Picker.Item label="Hard" value="H" />
            </Picker>
            <TouchableOpacity 
                style={styles.playButton}
                onPress={() => {
                    if(selectedQuiz == "")// https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple - https://opentdb.com/api.php?amount=10&category=14&difficulty=medium&type=multiple
                        Alert.alert("A category must be chosen!!");
                    else {
                        let diff = (difficulty == "E") ? "easy" : ((difficulty == "M") ? "medium" : "hard");
                        let quizUrl = "https://opentdb.com/api.php?amount=10&category=" + selectedQuiz + "&difficulty=" + diff + "&type=multiple";
                        console.log(quizUrl);
                        const questions = fetchQuestions(quizUrl);

                    }
                }}
            >
                <Feather name="play-circle" size={45} color="#2B69CA" />
                <Text style={styles.playButtonText}>PLAY</Text>
            </TouchableOpacity>
        </View>
    )
}

function Quiz() {
    const [selectedQuiz,setQuiz] = useState(null);
    const [selectedDifficulty,setDifficulty] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>New game</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2B69CA'
    },
    titleText: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'#fff',
        fontFamily: 'serif',
        marginBottom: 100
    },
    dropdown: {
        backgroundColor: 'white',
        width: '75%',
        height: 50,
        borderRadius: 70,
        fontSize: 50,
        marginBottom: 12
    },
    dropdownItem: {
        fontSize: 40
    },
    dropdownLabel: {
        fontSize: 18,
        marginTop: 15,
        marginBottom: 8,
        fontWeight: '500',
        color: 'black'
    },
    playButton: {
        height: 80,
        width: '60%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 35,
        borderRadius: 45,
        flexDirection: 'row'
    },
    playButtonText: {
        fontSize: 38,
        color: '#2B69CA',
        fontWeight: 'bold',
        marginLeft: 20,
        fontFamily: 'serif'
    }
});