import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default class HomeScreen extends React.Component{
    //key values, this.state
        constructor(){
            super();
            this.state = {
                text: '',
                isSearchPressed: false,
                lexicalCategory: '',
                word: '',
                definition: '',
                examples:[],
            };
        }
    //functions
        getWord = (word)=>{ //<---takes user input and runs it through database
            var searchkeyword = word.toLowerCase();
            var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchkeyword+".json";
            return fetch(url) //<--fetches json data from database
            .then((data)=>{
                if(data.status==200){
                    return data.json(); //<--returns data
                }
                else{
                    return null; //<--incase no data found
                }
            })
            .then((response)=>{
                var responseObject = response; 
                if(responseObject){
                    var wordData = responseObject.definitions[0]; //<--returns first object from array
                    var definition = wordData.description; //<--definition of word most likely
                    var lexicalCategory = wordData.wordtype;
                    this.setState({
                        "word": this.state.text,
                        "definition": definition,
                        "lexicalCategory": lexicalCategory,
                    })
                }
                else{ //<--if 404
                    this.setState({
                        "word": this.state.text,
                        "definition": "Not found",
                    })
                }
            })
        }
    //UI
        render(){
            return(
            //displays responseObject in box
            <View> 
                <View style={styles.container}> 
                    <Text style = {styles.headers}>
                        Word: {this.state.word}
                    </Text>
                    <Text style = {styles.headers}>
                        Type: {this.state.lexicalCategory}
                    </Text>
                    <Text style = {styles.headers}>
                        Definition: {this.state.definition}
                    </Text>
                </View>
                <View>
                    <TextInput style = {styles.searchbar} onChangeText = {text => {
                        this.setState({
                            text: text,
                            isSearchPressed: false,
                            word: 'Loading...',
                            lexicalCategory: '',
                            examples: [],
                            definition: '',
                        })
                    }} value = {this.state.text}></TextInput>
                    <TouchableOpacity style = {styles.button} onPress = {() => {
                        this.setState({isSearchPressed: true});
                        this.getWord(this.state.text);
                    }}>Search</TouchableOpacity>
                    <StatusBar style="auto" />
                </View>
            </View>
            );
        }       
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
    alignSelf: 'center',
    marginTop: 400,
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: 'black',
    padding: 30,
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily:"Franklin Gothic",
    color: 'white',
    backgroundColor: 'blue'
  },
  searchbar: { 
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
  },
  headers:{
      color:"purple",
      fontWeight: "bold",
      fontFamily: "Georgia"
  }
});

// ------------------------------------
