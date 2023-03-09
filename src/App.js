import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './components/theme';
import Input from './components/Input';

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

const App = () => {
  const [newTask, setNewTask] = useState('');
  const _addTask = () => {
    alert(`Add: ${newTask}`);
    setNewTask('');
  };
  const _handleTextChange = text => {
    setNewTask(text);
    console.log(`변경된문자열:${newTask}`);
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
          onChangeText={_handleTextChange}
          onSubmit={_addTask}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;
