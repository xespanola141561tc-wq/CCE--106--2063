import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Task = {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addTask = () => {
    if (title.trim() === '' || dueDate.trim() === '') {
      Alert.alert('Error', 'Please enter the task title and due date.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      dueDate: dueDate.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setDueDate('');

    Alert.alert('Success', 'Task added successfully!');
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );

    Alert.alert('Success', 'Task status updated!');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));

    Alert.alert('Deleted', 'Task deleted successfully!');
  };

  const pending = tasks.filter(
    (task) => !task.completed
  ).length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <TouchableOpacity
              style={[
                styles.check,
                item.completed && styles.checked,
              ]}
              onPress={() => toggleTask(item.id)}
            >
              <Text style={styles.checkText}>
                {item.completed ? '✓' : ''}
              </Text>
            </TouchableOpacity>

            <View style={styles.taskInfo}>
              <Text
                style={[
                  styles.taskTitle,
                  item.completed && styles.done,
                ]}
              >
                {item.title}
              </Text>

              <Text style={styles.date}>
                Due: {item.dueDate}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>My Tasks</Text>

            <View style={styles.student}>
              <Text style={styles.name}>
                Xerted Joy Espanola
              </Text>

              <Text style={styles.program}>
                BS Information Technology
              </Text>
            </View>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.number}>
                  {pending}
                </Text>

                <Text style={styles.label}>
                  Pending
                </Text>
              </View>

              <View style={styles.stat}>
                <Text style={styles.number}>
                  {completed}
                </Text>

                <Text style={styles.label}>
                  Completed
                </Text>
              </View>

              <View style={styles.stat}>
                <Text style={styles.number}>
                  {tasks.length}
                </Text>

                <Text style={styles.label}>
                  Total
                </Text>
              </View>
            </View>

            <Text style={styles.heading}>
              Add New Task
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Task title"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.input}
              placeholder="Due date"
              value={dueDate}
              onChangeText={setDueDate}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={addTask}
            >
              <Text style={styles.buttonText}>
                + Add Task
              </Text>
            </TouchableOpacity>

            <Text style={styles.heading}>
              My Task List
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            No tasks yet.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  student: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  program: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  stat: {
    backgroundColor: 'white',
    width: '31%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },

  number: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  label: {
    color: 'gray',
    marginTop: 5,
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  button: {
    backgroundColor: 'blue',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  task: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  check: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  checked: {
    backgroundColor: 'blue',
  },

  checkText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  taskInfo: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },

  date: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },

  delete: {
    color: 'red',
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});
