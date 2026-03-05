import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  BackHandler,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { useEffect, useState, useContext, useMemo, useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { fetchJobs } from '../../services/jobService';
import { Job } from '../../types/Job';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/MainNavigator';
import { JobContext } from '../../context/JobContext';
import { useTheme } from '../../context/ThemeContext';
import JobCard from '../../components/JobCard/JobCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import JobDetailModal from '../../components/JobDetailModal/JobDetailModal';
import styles from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'JobFinder'>;
type ToastType = 'saved' | 'already_applied';
type FilterType = 'all' | 'applied';

export default function JobFinderScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { width: contentWidth } = useWindowDimensions();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const { saveJob, removeJob, isSaved, isApplied, appliedJobIds } = useContext(JobContext);
  const { theme } = useTheme();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState<ToastType>('saved');
  const [hideApplied, setHideApplied] = useState(false);

  useEffect(() => {
    const loadJobs = async () => {
      const data = await fetchJobs();
      setJobs(data);
    };
    loadJobs();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', style: 'cancel', onPress: () => {} },
            { text: 'Exit', style: 'destructive', onPress: () => BackHandler.exitApp() },
          ]
        );
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let result = jobs;

    if (activeFilter === 'applied') {
      result = result.filter(job => isApplied(job.id));
    } else if (hideApplied) {
      result = result.filter(job => !isApplied(job.id));
    }

    if (query) {
      result = result.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [jobs, searchQuery, activeFilter, appliedJobIds, hideApplied]);

  const showToast = (type: ToastType) => {
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1800);
  };

  const openModal = (job: Job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setModalVisible(false);
  };

  const handleSaveJob = (job: Job) => {
    if (isApplied(job.id)) {
      showToast('already_applied');
      return;
    }
    if (!isSaved(job.id)) {
      saveJob(job);
      showToast('saved');
    }
  };

  const renderJob = ({ item }: { item: Job }) => (
    <JobCard
      job={item}
      isApplied={isApplied(item.id)}
      onApply={() => navigation.navigate('Apply', { jobId: item.id })}
      onViewDetails={() => openModal(item)}
      onSave={() => handleSaveJob(item)}
      onUnsave={() => removeJob(item.id)}
      isSaved={isSaved(item.id)}
    />
  );

  const filters: { key: FilterType; label: string; icon: string }[] = [
    { key: 'all', label: 'All', icon: 'list' },
    { key: 'applied', label: 'Applied', icon: 'check-circle' },
  ];

  const emptyMessage =
    activeFilter === 'applied' ? 'No applied jobs yet.' :
    `No jobs found for "${searchQuery}"`;

  const toastMessage = toastType === 'saved'
    ? 'Job saved!'
    : 'You have already applied to this job.';

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {/* Search */}
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} theme={theme} />

      {/* Filter row: pills + Saved Jobs button on the right */}
      <View style={styles.filterRow}>
        {filters.map(f => {
          const isActive = activeFilter === f.key;
          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => setActiveFilter(f.key)}
              style={[
                styles.filterPill,
                {
                  backgroundColor: isActive ? theme.primary : theme.card,
                  borderColor: isActive ? theme.primary : theme.border,
                },
              ]}
            >
              <FontAwesome
                name={f.icon as any}
                size={11}
                color={isActive ? '#fff' : theme.subText}
              />
              <Text style={[styles.filterPillText, { color: isActive ? '#fff' : theme.subText }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Saved Jobs — right side of filter row */}
        <TouchableOpacity
          style={[styles.savedJobsPill, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate('SavedJobs')}
        >
          <FontAwesome name="bookmark" size={11} color="#fff" />
          <Text style={styles.savedJobsPillText}>Saved Jobs</Text>
        </TouchableOpacity>
      </View>

      {/* Hide applied toggle — only on All Jobs filter */}
      {activeFilter === 'all' && (
        <TouchableOpacity
          style={styles.hideAppliedRow}
          onPress={() => setHideApplied(prev => !prev)}
          activeOpacity={0.7}
        >
          <View style={[
            styles.checkbox,
            {
              backgroundColor: hideApplied ? theme.primary : 'transparent',
              borderColor: hideApplied ? theme.primary : theme.subText,
            },
          ]}>
            {hideApplied && <FontAwesome name="check" size={10} color="#fff" />}
          </View>
          <Text style={[styles.hideAppliedText, { color: theme.subText }]}>
            Hide applied jobs
          </Text>
        </TouchableOpacity>
      )}

      {filteredJobs.length === 0 && (
        <Text style={[styles.noResults, { color: theme.subText }]}>{emptyMessage}</Text>
      )}

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={renderJob}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {/* Job Details Modal */}
      <JobDetailModal
        visible={modalVisible}
        job={selectedJob}
        contentWidth={contentWidth}
        isApplied={selectedJob ? isApplied(selectedJob.id) : false}
        onClose={closeModal}
        onApply={(jobId) => navigation.navigate('Apply', { jobId })}
      />

      {/* Toast */}
      <Modal visible={toastVisible} transparent animationType="fade">
        <View style={styles.toastBackground}>
          <View style={[styles.toastContainer, { backgroundColor: theme.card }]}>
            <FontAwesome
              name={toastType === 'saved' ? 'check-circle' : 'exclamation-circle'}
              size={16}
              color={toastType === 'saved' ? '#22c55e' : theme.danger}
              style={styles.toastIcon}
            />
            <Text style={[styles.toastText, { color: theme.text }]}>{toastMessage}</Text>
          </View>
        </View>
      </Modal>

    </View>
  );
}
