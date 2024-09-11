import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes';
import { ContextRoutineProvider } from './src/contexts/context-routine';

export default function App() {
  return (
    <ContextRoutineProvider>
        <Routes />
        <StatusBar style="auto" />
    </ContextRoutineProvider>
  );
}

