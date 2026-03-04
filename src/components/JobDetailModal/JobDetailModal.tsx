import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RenderHtml from 'react-native-render-html';
import { Job } from '../../types/Job';
import { StyleSheet } from 'react-native';

type Props = {
  visible: boolean;
  job: Job | null;
  theme: any;
  contentWidth: number;
  onClose: () => void;
  onApply: (jobId: string) => void;
};

export default function JobDetailModal({ visible, job, theme, contentWidth, onClose, onApply }: Props) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.closeText, { color: theme.danger }]}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {job && (
            <>
              {job.companyLogo && (
                <Image source={{ uri: job.companyLogo }} style={styles.logo} />
              )}
              <Text style={[styles.title, { color: theme.text }]}>{job.title}</Text>
              <Text style={[styles.company, { color: theme.primary }]}>{job.company}</Text>
              <Text style={[styles.details, { color: theme.subText }]}>
                {job.location} · {job.workModel} · {job.seniorityLevel}
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
              <RenderHtml
                contentWidth={contentWidth}
                source={{ html: job.description }}
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
                style={[styles.applyButton, { backgroundColor: theme.primary }]}
                onPress={() => {
                  onClose();
                  onApply(job.id);
                }}
              >
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  closeText: {
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    padding: 24,
  },
  logo: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  company: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  details: {
    fontSize: 12,
    marginBottom: 6,
    textAlign: 'center',
    opacity: 0.7,
  },
  salary: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  tag: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 5,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  applyButton: {
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});