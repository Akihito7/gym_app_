import { StatusBar } from 'expo-status-bar';
import { ContextRoutineProvider } from './src/contexts/context-routine';
import { Routes } from './src/routes';

export default function App() {
  return (
    <ContextRoutineProvider>
        <Routes />
        <StatusBar style="auto" />
    </ContextRoutineProvider>
  );
}

