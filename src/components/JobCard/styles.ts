import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },

  // Top row
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  companyLogo: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookmarkButton: {
    padding: 4,
  },
  removeButton: {
    padding: 4,
  },

  // Job info
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
    paddingRight: 4,
  },
  company: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  details: {
    fontSize: 11,
    marginBottom: 4,
    opacity: 0.7,
  },
  salary: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },

  // Tags — neutral gray, no blue
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 5,
    backgroundColor: '#f0f0f0',
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#555',
    letterSpacing: 0.2,
  },

  // Buttons
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  applyButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewDetailsButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },

  // Applied state button
  appliedButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  appliedButtonText: {
    fontWeight: '600',
    fontSize: 13,
  },

  // Unsave Modal
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '82%',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22,
  },
  modalJobTitle: {
    fontWeight: '700',
    fontStyle: 'italic',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelText: {
    fontWeight: '600',
    fontSize: 13,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  trashIcon: {
    marginRight: 2,
  },
});

export default styles;