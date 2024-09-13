import { StatusBar } from 'expo-status-bar';
import { ContextRoutineProvider } from './src/contexts/context-routine';
import { Routes } from './src/routes';
import { ContextWorkoutProvider } from './src/contexts/context-workout';
import { SignupScreen } from './src/screens/signup-screen';
import { SignlnScreen } from './src/screens/signln-screen';
import { AuthRoutes } from './src/routes/auth.routes';

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

