import { StatusBar } from 'expo-status-bar';
import { ContextRoutineProvider } from './src/contexts/context-routine';
import { Routes } from './src/routes';
import { ContextWorkoutProvider } from './src/contexts/context-workout';

export default function App() {
  return (
    <ContextWorkoutProvider>
      <ContextRoutineProvider>
        <Routes />
        <StatusBar style="auto" />
      </ContextRoutineProvider>
    </ContextWorkoutProvider>
  );
}

