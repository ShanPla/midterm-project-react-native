import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Job } from '../../types/Job';
import styles from './styles';

type Props = {
  job: Job;
  theme: any;
  onApply: () => void;
  onViewDetails: () => void;
  isApplied?: boolean;
  // JobFinderScreen only
  onSave?: () => void;
  onUnsave?: () => void;
  isSaved?: boolean;
  // SavedJobsScreen only
  onRemove?: () => void;
};

export default function JobCard({
  job,
  theme,
  onApply,
  onViewDetails,
  isApplied = false,
  onSave,
  onUnsave,
  isSaved,
  onRemove,
}: Props) {
  const [unsaveModalVisible, setUnsaveModalVisible] = useState(false);

  const handleBookmarkPress = () => {
    if (isSaved) {
      setUnsaveModalVisible(true);
    } else {
      onSave?.();
    }
  };

  const handleConfirmUnsave = () => {
    setUnsaveModalVisible(false);
    onUnsave?.();
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>

      {/* Top row: logo + action icon */}
      <View style={styles.topRow}>
        {job.companyLogo ? (
          <Image source={{ uri: job.companyLogo }} style={styles.companyLogo} />
        ) : (
          <View style={[styles.companyLogo, { backgroundColor: theme.border, borderRadius: 8 }]} />
        )}

        <View style={styles.topRight}>
          {/* Applied — bare checkmark icon, no pill */}
          {isApplied && (
            <FontAwesome name="check-circle" size={22} color="#22c55e" />
          )}

          {/* Bookmark — only shown when not applied */}
          {onSave !== undefined && !isApplied && (
            <TouchableOpacity style={styles.bookmarkButton} onPress={handleBookmarkPress}>
              <FontAwesome
                name={isSaved ? 'bookmark' : 'bookmark-o'}
                size={22}
                color={isSaved ? '#444aed' : theme.subText}
              />
            </TouchableOpacity>
          )}

          {onRemove !== undefined && (
            <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
              <FontAwesome name="trash" size={20} color={theme.danger} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text style={[styles.title, { color: theme.text }]}>{job.title}</Text>
      <Text style={[styles.company, { color: theme.primary }]}>{job.company}</Text>
      <Text style={[styles.details, { color: theme.subText }]}>
        {job.location} · {job.workModel} · {job.jobType} · {job.seniorityLevel}
      </Text>

      {job.salary !== 'Not specified' && (
        <Text style={[styles.salary, { color: theme.text }]}>{job.salary}</Text>
      )}

      {job.tags.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagContainer}>
          {job.tags.map(tag => (
            <View key={tag} style={[styles.tag, { backgroundColor: theme.border }]}>
              <Text style={[styles.tagText, { color: theme.subText }]}>{tag}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.buttonRow}>
        {isApplied ? (
          <View style={[styles.appliedButton, { backgroundColor: '#22c55e18' }]}>
            <Text style={[styles.appliedButtonText, { color: '#22c55e' }]}>Applied ✓</Text>
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.applyButton, { backgroundColor: theme.primary }]}
              onPress={onApply}
            >
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewDetailsButton, { backgroundColor: theme.primary + '18' }]}
              onPress={onViewDetails}
            >
              <Text style={[styles.buttonText, { color: theme.primary }]}>View Details</Text>
            </TouchableOpacity>
          </>
        )}

        {/* View Details still accessible when applied */}
        {isApplied && (
          <TouchableOpacity
            style={[styles.viewDetailsButton, { backgroundColor: theme.primary + '18' }]}
            onPress={onViewDetails}
          >
            <Text style={[styles.buttonText, { color: theme.primary }]}>View Details</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Unsave Confirmation Modal */}
      <Modal visible={unsaveModalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, { backgroundColor: theme.card }]}>
            <View style={[styles.iconCircle, { backgroundColor: theme.danger + '18' }]}>
              <FontAwesome name="trash" size={26} color={theme.danger} />
            </View>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Remove Job</Text>
            <Text style={[styles.modalMessage, { color: theme.subText }]}>
              Are you sure you want to remove{'\n'}
              <Text style={[styles.modalJobTitle, { color: theme.text }]}>{job.title}</Text>
              {'\n'}from your saved jobs?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.cancelButton, { backgroundColor: theme.border }]}
                onPress={() => setUnsaveModalVisible(false)}
              >
                <Text style={[styles.cancelText, { color: theme.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: theme.danger }]}
                onPress={handleConfirmUnsave}
              >
                <FontAwesome name="trash" size={13} color="#fff" style={styles.trashIcon} />
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
