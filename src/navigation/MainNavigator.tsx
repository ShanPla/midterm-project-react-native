import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import JobFinderScreen from '../screens/JobFinderScreen/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen/SavedJobsScreen';
import ApplyScreen from '../screens/ApplyScreen/ApplyScreen';

import { Job } from '../types/Job';

export type RootStackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
  Apply: { jobId: string; job: Job };
};

type Props = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator({ isDarkMode, toggleTheme }: Props) {
  const headerRight = () => (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 4 }}>
      <FontAwesome
        name={isDarkMode ? 'sun-o' : 'moon-o'}
        size={20}
        color={isDarkMode ? '#f5c518' : '#555'}
      />
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight,
      }}
    >
      <Stack.Screen
        name="JobFinder"
        component={JobFinderScreen}
        options={{ title: 'Job Finder' }}
      />
      <Stack.Screen
        name="SavedJobs"
        component={SavedJobsScreen}
        options={{ title: 'Saved Jobs' }}
      />
      <Stack.Screen
        name="Apply"
        component={ApplyScreen}
        options={{ title: 'Apply for Job' }}
      />
    </Stack.Navigator>
  );
}
