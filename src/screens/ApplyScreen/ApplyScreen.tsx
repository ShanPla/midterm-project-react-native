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

const MIN_REASON_LENGTH = 30;
const MAX_REASON_LENGTH = 500;

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

  // Track which fields have been touched
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    contact: false,
    reason: false,
  });

  // --- Validation ---
  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^09[0-9]{9}$/;

  const errors = {
    name: !name.trim() ? 'Full name is required.' : '',
    email: !emailRegex.test(email) ? 'Enter a valid email address.' : '',
    contact: !/^[0-9]{9}$/.test(contact) ? 'Must be 9 digits after 09.' : '',
    reason: reason.trim().length < MIN_REASON_LENGTH
      ? `At least ${MIN_REASON_LENGTH} characters required.`
      : '',
  };

  const isFormValid = Object.values(errors).every(e => e === '');
  const isPristine = !name && !email && !contact && !reason;

  // --- Handlers ---

  // Formats 9 raw digits into XX-XXX-XXXX
  const formatContact = (digits: string): string => {
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
  };

  // Store raw digits, display formatted
  const handleContactChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, '').slice(0, 9);
    setContact(digits);
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = () => {
    // Mark all fields as touched to show all errors
    setTouched({ name: true, email: true, contact: true, reason: true });
    if (!isFormValid) return;

    applyToJob(jobId);
    setName('');
    setEmail('');
    setContact('');
    setReason('');
    setTouched({ name: false, email: false, contact: false, reason: false });

    Alert.alert(
      'Application Submitted',
      'Your application has been sent successfully!',
      [
        {
          text: 'Okay',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'JobFinder' }],
            }),
        },
      ]
    );
  };

  const inputStyle = (field: keyof typeof errors) => [
    styles.input,
    {
      backgroundColor: theme.card,
      color: theme.text,
      borderColor: touched[field] && errors[field] ? theme.danger : theme.border,
    },
  ];

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

          {/* Full Name */}
          <View style={styles.fieldWrapper}>
            <Text style={[styles.label, { color: theme.subText }]}>Full Name</Text>
            <TextInput
              style={inputStyle('name')}
              placeholder="Enter your full name"
              placeholderTextColor={theme.subText}
              value={name}
              onChangeText={setName}
              onBlur={() => handleBlur('name')}
              autoCapitalize="words"
              returnKeyType="next"
            />
            {touched.name && errors.name ? (
              <Text style={[styles.errorText, { color: theme.danger }]}>{errors.name}</Text>
            ) : null}
          </View>

          {/* Email */}
          <View style={styles.fieldWrapper}>
            <Text style={[styles.label, { color: theme.subText }]}>Email</Text>
            <TextInput
              style={inputStyle('email')}
              placeholder="example@email.com"
              placeholderTextColor={theme.subText}
              value={email}
              onChangeText={setEmail}
              onBlur={() => handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            {touched.email && errors.email ? (
              <Text style={[styles.errorText, { color: theme.danger }]}>{errors.email}</Text>
            ) : null}
          </View>

          {/* Contact Number */}
          <View style={styles.fieldWrapper}>
            <Text style={[styles.label, { color: theme.subText }]}>Contact Number</Text>
            <View style={[
              styles.contactRow,
              {
                backgroundColor: theme.card,
                borderColor: touched.contact && errors.contact ? theme.danger : theme.border,
              },
            ]}>
              <Text style={[styles.contactPrefix, { color: theme.text }]}>09</Text>
              <View style={[styles.contactDivider, { backgroundColor: theme.border }]} />
              <TextInput
                style={[styles.contactInput, { color: theme.text }]}
                placeholder="XX-XXX-XXXX"
                placeholderTextColor={theme.subText}
                value={formatContact(contact)}
                onChangeText={handleContactChange}
                onBlur={() => handleBlur('contact')}
                keyboardType="phone-pad"
                maxLength={11}
                returnKeyType="next"
              />
            </View>
            {touched.contact && errors.contact ? (
              <Text style={[styles.errorText, { color: theme.danger }]}>{errors.contact}</Text>
            ) : null}
          </View>

          {/* Why should we hire you */}
          <View style={styles.fieldWrapper}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: theme.subText }]}>Why should we hire you?</Text>
              <Text style={[
                styles.charCount,
                {
                  color: reason.length < MIN_REASON_LENGTH ? theme.danger : '#22c55e',
                },
              ]}>
                {reason.length}/{MAX_REASON_LENGTH}
              </Text>
            </View>
            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: touched.reason && errors.reason ? theme.danger : theme.border,
                },
              ]}
              multiline
              numberOfLines={5}
              value={reason}
              onChangeText={(text) => setReason(text.slice(0, MAX_REASON_LENGTH))}
              onBlur={() => handleBlur('reason')}
              placeholder={`Explain why you are suitable for this job... (min. ${MIN_REASON_LENGTH} characters)`}
              placeholderTextColor={theme.subText}
              blurOnSubmit={false}
              onFocus={() => {
                setTimeout(() => {
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 300);
              }}
            />
            {touched.reason && errors.reason ? (
              <Text style={[styles.errorText, { color: theme.danger }]}>{errors.reason}</Text>
            ) : null}
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor: isPristine || !isFormValid ? theme.border : theme.primary,
              },
            ]}
            onPress={handleSubmit}
            disabled={isPristine}
            activeOpacity={isPristine ? 1 : 0.8}
          >
            <Text style={[
              styles.submitText,
              { color: isPristine || !isFormValid ? theme.subText : '#fff' },
            ]}>
              Submit Application
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
