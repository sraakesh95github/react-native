import { StyleSheet, View, Button, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  
  const [modalIsVisible, setModalIsVisible] = useState(false); 
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  };

  function endAddGoalHandler() {
    setModalIsVisible(false);
  };

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => 
    [
      ...currentCourseGoals, 
      {text: enteredGoalText,
      id: Math.random().toString()}
    ]);
    endAddGoalHandler();
  };

  function deleteGoalHandler(id) {
    console.log("Delete");
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id != id);
    });
  };

  return (
    <View style={styles.appContainer}>

      {/*Input field to enter the goal */}
      <Button 
        title="Add New Goal"
        color="#5e0acc"
        onPress={startAddGoalHandler}></Button>
      { modalIsVisible &&
      <GoalInput
        onAddGoal={addGoalHandler}
        onCancel={endAddGoalHandler}
        visible={modalIsVisible}>
      </GoalInput>
      }

      {/*Values listed dynamically */}
      <View style={styles.goalsContainer}>
            {/*Used for scrolling a list instead of ScrollView for rendering only the elements that are visible at the moment */}
            <FlatList 
              data={courseGoals} 
              renderItem={(itemData) => {
              return (
                    <GoalItem 
                      text={itemData.item.text}
                      id={itemData.item.id}
                      onDeleteItem={deleteGoalHandler}></GoalItem>
                );
              }} 
              alwaysBounceVertical={false}
              keyExtractor={(item, index) => {
                return item.id
              }}
            />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16
  },
  goalsContainer: {
    flex: 5
  }
});
