import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  SafeAreaView,
  BackHandler,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { useEffect, useState, useContext, useMemo, useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import RenderHtml from 'react-native-render-html';
import { fetchJobs } from '../../services/jobService';
import { Job } from '../../types/Job';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/MainNavigator';
import { JobContext } from '../../context/JobContext';
import { useTheme } from '../../context/ThemeContext';
import JobCard from '../../components/JobCard/JobCard';
import SearchBar from '../../components/SearchBar/SearchBar';
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

  // Back button exit confirmation — Android only
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
        // Return true to prevent default back behavior
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
      theme={theme}
      isApplied={isApplied(item.id)}
      onApply={() => navigation.navigate('Apply', { jobId: item.id })}
      onViewDetails={() => openModal(item)}
      onSave={() => handleSaveJob(item)}
      onUnsave={() => removeJob(item.id)}
      isSaved={isSaved(item.id)}
    />
  );

  const filters: { key: FilterType; label: string; icon: string }[] = [
    { key: 'all', label: 'All Jobs', icon: 'list' },
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

      {/* Saved Jobs button */}
      <TouchableOpacity
        style={[styles.savedJobsButton, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('SavedJobs')}
      >
        <FontAwesome name="bookmark" size={13} color="#fff" style={styles.topButtonIcon} />
        <Text style={styles.topButtonText}>Saved Jobs</Text>
      </TouchableOpacity>

      {/* Search */}
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} theme={theme} />

      {/* Filter pills */}
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
                style={styles.filterPillIcon}
              />
              <Text style={[styles.filterPillText, { color: isActive ? '#fff' : theme.subText }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Hide applied toggle — only visible on All Jobs filter */}
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
            {hideApplied && (
              <FontAwesome name="check" size={10} color="#fff" />
            )}
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
      <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.background }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={[styles.modalCloseText, { color: theme.danger }]}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {selectedJob && (
              <>
                {selectedJob.companyLogo && (
                  <Image source={{ uri: selectedJob.companyLogo }} style={styles.modalLogo} />
                )}
                <Text style={[styles.modalTitle, { color: theme.text }]}>{selectedJob.title}</Text>
                <Text style={[styles.modalCompany, { color: theme.primary }]}>{selectedJob.company}</Text>
                <Text style={[styles.modalDetails, { color: theme.subText }]}>
                  {selectedJob.location} · {selectedJob.workModel} · {selectedJob.seniorityLevel}
                </Text>
                {selectedJob.salary !== 'Not specified' && (
                  <Text style={[styles.modalSalary, { color: theme.text }]}>{selectedJob.salary}</Text>
                )}
                {selectedJob.tags.length > 0 && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modalTagContainer}>
                    {selectedJob.tags.map(tag => (
                      <View key={tag} style={[styles.tag, { backgroundColor: theme.primary + '18' }]}>
                        <Text style={[styles.tagText, { color: theme.primary }]}>{tag}</Text>
                      </View>
                    ))}
                  </ScrollView>
                )}
                <RenderHtml
                  contentWidth={contentWidth}
                  source={{ html: selectedJob.description }}
                  tagsStyles={{
                    p: { color: theme.subText, fontSize: 13, lineHeight: 21, marginBottom: 8 },
                    li: { color: theme.subText, fontSize: 13, lineHeight: 21 },
                    ul: { color: theme.subText, paddingLeft: 8 },
                    ol: { color: theme.subText, paddingLeft: 8 },
                    strong: { color: theme.text, fontWeight: '700' },
                    h1: { color: theme.text, fontSize: 16, fontWeight: '700', marginBottom: 6 },
                    h2: { color: theme.text, fontSize: 15, fontWeight: '700', marginBottom: 6 },
                    h3: { color: theme.text, fontSize: 14, fontWeight: '700', marginBottom: 4 },
                    body: { color: theme.subText },
                  }}
                />
                <TouchableOpacity
                  style={[styles.modalApplyButton, { backgroundColor: theme.primary }]}
                  onPress={() => {
                    closeModal();
                    navigation.navigate('Apply', { jobId: selectedJob.id });
                  }}
                >
                  <Text style={styles.buttonText}>Apply Now</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

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
