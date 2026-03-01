import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobFinderScreen from '../screens/JobFinderScreen/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen/SavedJobsScreen';
import ApplyScreen from '../screens/ApplyScreen/ApplyScreen';

export type RootStackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
  Apply: { jobId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
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