import React, { useState } from 'react';
import { StatusBar, Dimensions, Alert } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';
import Task from './components/Task';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 0px 20px; /* y축 x축 */
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

const App = () => {
  const width = Dimensions.get('window').width;

  const [newTask, setNewTask] = useState('');

  const [tasks, setTasks] = useState({
    1: { id: '1', text: 'Hanbit', completed: false },
    2: { id: '2', text: 'React Native', completed: true },
    3: { id: '3', text: 'React Native Sample', completed: false },
    4: { id: '4', text: 'Edit TODO ITEM', completed: false },
  });

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };

    setNewTask('');
    setTasks({ ...tasks, ...newTaskObject });
  };

  const _deleteTask = id => {
    const currentTasks = { ...tasks };
    Alert.alert('', '삭제하시겠습니까?', [
      {
        text: '아니오',
        onPress() {
          console.log('아니오');
        },
        style: 'cancel',
      },
      {
        text: '예',
        onPress() {
          console.log('예');
          delete currentTasks[id];
          setTasks(currentTasks);
        },
      },
    ]);
  };
  const _toggleTask = id => {
    const currentTasks = { ...tasks };
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    setTasks(currentTasks);
  };
  const _updateTask = item => {
    const currentTasks = { ...tasks };
    currentTasks[item.id] = item;
    setTasks(currentTasks);
  };

  const _handleTextChange = text => {
    setNewTask(text);
    console.log(`변경된문자열:${newTask}`);
  };

  const _onBlur = () => {
    setNewTask('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>TODO List</Title>
        <Input
          value={newTask}
          placeholder="+ Add a Task"
          onChangeText={_handleTextChange} //수정시
          onSubmitEditing={_addTask} //완료버튼
          onBlur={_onBlur} //포커스 잃었을때
        />
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  );
};

export default App;
