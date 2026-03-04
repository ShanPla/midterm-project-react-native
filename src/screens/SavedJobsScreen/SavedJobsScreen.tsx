import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { useContext, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { JobContext } from '../../context/JobContext';
import { Job } from '../../types/Job';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/MainNavigator';
import { useTheme } from '../../context/ThemeContext';
import JobCard from '../../components/JobCard/JobCard';
import JobDetailModal from '../../components/JobDetailModal/JobDetailModal';
import styles from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SavedJobs'>;

export default function SavedJobsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { width: contentWidth } = useWindowDimensions();
  const { savedJobs, removeJob, isApplied } = useContext(JobContext);
  const { theme } = useTheme();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const openModal = (job: Job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setModalVisible(false);
  };

  const confirmDelete = (job: Job) => {
    setJobToDelete(job);
    setDeleteModalVisible(true);
  };

  const cancelDelete = () => {
    setJobToDelete(null);
    setDeleteModalVisible(false);
  };

  const handleDelete = () => {
    if (jobToDelete) removeJob(jobToDelete.id);
    setJobToDelete(null);
    setDeleteModalVisible(false);
  };

  const renderJob = ({ item }: { item: Job }) => (
    <JobCard
      job={item}
      theme={theme}
      onApply={() => navigation.navigate('Apply', { jobId: item.id })}
      onViewDetails={() => openModal(item)}
      onRemove={() => confirmDelete(item)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {savedJobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome name="bookmark-o" size={52} color={theme.subText} style={styles.emptyIcon} />
          <Text style={[styles.emptyTitle, { color: theme.text }]}>No Saved Jobs</Text>
          <Text style={[styles.emptySubText, { color: theme.subText }]}>
            Jobs you save will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id}
          renderItem={renderJob}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}

      {/* Job Details Modal */}
      <JobDetailModal
        visible={modalVisible}
        job={selectedJob}
        theme={theme}
        contentWidth={contentWidth}
        isApplied={selectedJob ? isApplied(selectedJob.id) : false}
        onClose={closeModal}
        onApply={(jobId) => navigation.navigate('Apply', { jobId })}
      />

      {/* Delete Confirmation Modal */}
      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <View style={styles.deleteModalBackground}>
          <View style={[styles.deleteModalContainer, { backgroundColor: theme.card }]}>
            <View style={[styles.deleteIconCircle, { backgroundColor: theme.danger + '18' }]}>
              <FontAwesome name="trash" size={26} color={theme.danger} />
            </View>
            <Text style={[styles.deleteModalTitle, { color: theme.text }]}>Remove Job</Text>
            <Text style={[styles.deleteModalMessage, { color: theme.subText }]}>
              Are you sure you want to remove{'\n'}
              <Text style={[styles.deleteJobTitle, { color: theme.text }]}>
                {jobToDelete?.title}
              </Text>
              {'\n'}from your saved jobs?
            </Text>
            <View style={styles.deleteModalButtons}>
              <TouchableOpacity
                style={[styles.deleteCancelButton, { backgroundColor: theme.border }]}
                onPress={cancelDelete}
              >
                <Text style={[styles.deleteCancelText, { color: theme.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.deleteConfirmButton, { backgroundColor: theme.danger }]}
                onPress={handleDelete}
              >
                <FontAwesome name="trash" size={13} color="#fff" style={styles.deleteButtonIcon} />
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
