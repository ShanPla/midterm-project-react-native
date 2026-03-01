import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  SafeAreaView,
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
import styles from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SavedJobs'>;

export default function SavedJobsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { savedJobs, removeJob } = useContext(JobContext);
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
                <Text style={[styles.modalDescription, { color: theme.subText }]}>
                  {selectedJob.description.replace(/<[^>]+>/g, '')}
                </Text>
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
