import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { HomeScreen } from './src/screens/home-screen';
import { defaultTheme } from './src/configs/default-theme';
import { ExerciseCatalogScreen } from './src/screens/exercise-catalog-screen';

export default function App() {
  return (
    <View style={styles.container}>
      <ExerciseCatalogScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultTheme.colors.backgroundScreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
