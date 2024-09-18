import { StatusBar } from 'expo-status-bar';
import { ContextRoutineProvider } from './src/contexts/context-routine';
import { Routes } from './src/routes';
import { ContextWorkoutProvider } from './src/contexts/context-workout';
import { ContextUserProvider } from './src/contexts/context-user';
import { ContextMessageProvider } from './src/contexts/context-message';
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export default function App() {
  return (
    <ContextMessageProvider>
      <ContextUserProvider>
        <ContextWorkoutProvider>
          <ContextRoutineProvider>
            <Routes />
            <StatusBar style="auto" />
          </ContextRoutineProvider>
        </ContextWorkoutProvider>
      </ContextUserProvider >
    </ContextMessageProvider>
  );
}

