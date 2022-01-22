import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import {FlatList} from 'react-native';

const COLORS = {primary: '#1f145c', white: 'white'};
const App = () => {
  const [todos, setTodos] = useState([]);
  const [textInput, setTextInput] = useState('');

  const ListItem = ({todo}) => {
    return (
      <View style={styles.listItem}>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: COLORS.primary,
              fontWeight: 'bold',
              fontSize: 20,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.task}
          </Text>
        </View>
        {!todo?.completed && (
          <View style={styles.checkBox}>
            <TouchableOpacity onPress={() => markTodoComplete(todo?.id)}>
              <Ionicons name="checkmark-sharp" size={25} color={'white'} />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity onPress={() => deleteTodo(todo?.id)}>
          <Ionicons name="trash" size={25} color={'red'} />
        </TouchableOpacity>
      </View>
    );
  };
  const addTodo = () => {
    if (textInput) {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTextInput('');
    }
  };
  const markTodoComplete = todoId => {
    // console.log(todoId);
    const newTodos = todos.map(item => {
      if (item.id === todoId) {
        return {...item, completed: true};
      }
      return item;
    });
    setTodos(newTodos);
  };
  const deleteTodo = todoId => {
    console.log(todoId);
    const newTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(newTodos);
  };
  const clearAllTodos = () => {
    Alert.alert('Confirm', 'Are sure to delete all todos?', [
      {text: 'Yes', onPress: () => setTodos([])},
      {text: 'No'},
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={styles.header}>
        <Text style={{color: COLORS.primary, fontSize: 30, fontWeight: 'bold'}}>
          Todo
        </Text>
        <TouchableOpacity onPress={clearAllTodos}>
          <Ionicons name="trash" size={25} color={'red'} />
        </TouchableOpacity>
      </View>
      {/* listing todos */}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100, padding: 20}}
        data={todos}
        renderItem={({item}) => <ListItem todo={item} />}
      />
      <View style={styles.footer}>
        <View style={styles.textBox}>
          <TextInput
            placeholder="Add Todo"
            value={textInput}
            onChangeText={text => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.addButton}>
            <Ionicons name="add-sharp" size={35} color={'white'} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  checkBox: {
    height: 30,
    width: 30,
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 7,
    elevation: 10,
    marginVertical: 10,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    bottom: 0,

    color: COLORS.white,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textBox: {
    borderRadius: 30,
    backgroundColor: COLORS.white,
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
