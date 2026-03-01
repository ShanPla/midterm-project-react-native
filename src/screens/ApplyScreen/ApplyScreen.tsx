import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRef, useState, useContext } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/MainNavigator';
import { useTheme } from '../../context/ThemeContext';
import { JobContext } from '../../context/JobContext';
import styles from './styles';

type ApplyRouteProp = RouteProp<RootStackParamList, 'Apply'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Apply'>;

export default function ApplyScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ApplyRouteProp>();
  const { jobId } = route.params;
  const { theme } = useTheme();
  const { applyToJob } = useContext(JobContext);

  const scrollViewRef = useRef<ScrollView>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [reason, setReason] = useState('');

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Name is required.');
      return false;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Enter a valid email.');
      return false;
    }
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(contact)) {
      Alert.alert('Validation Error', 'Enter a valid contact number.');
      return false;
    }
    if (reason.trim().length < 10) {
      Alert.alert('Validation Error', 'Please write a longer reason.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    applyToJob(jobId);

    setName('');
    setEmail('');
    setContact('');
    setReason('');

    Alert.alert(
      'Application Submitted',
      'Your application has been sent successfully!',
      [
        {
          text: 'Okay',
          onPress: () =>
            // Reset the stack so there's no back button leading to the form
            navigation.reset({
              index: 0,
              routes: [{ name: 'JobFinder' }],
            }),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.fieldWrapper}>
            <Text style={[styles.label, { color: theme.subText }]}>Full Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
              placeholder="Enter your full name"
              placeholderTextColor={theme.subText}
              value={name}
              onChangeText={setName}
              returnKeyType="next"
            />
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={[styles.label, { color: theme.subText }]}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
              placeholder="example@email.com"
              placeholderTextColor={theme.subText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={[styles.label, { color: theme.subText }]}>Contact Number</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
              placeholder="09XXXXXXXXX"
              placeholderTextColor={theme.subText}
              value={contact}
              onChangeText={setContact}
              keyboardType="numeric"
              returnKeyType="next"
            />
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={[styles.label, { color: theme.subText }]}>Why should we hire you?</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
              multiline
              numberOfLines={5}
              value={reason}
              onChangeText={setReason}
              placeholder="Explain why you are suitable for this job..."
              placeholderTextColor={theme.subText}
              blurOnSubmit={false}
              onFocus={() => {
                setTimeout(() => {
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 300);
              }}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.primary }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>Submit Application</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
