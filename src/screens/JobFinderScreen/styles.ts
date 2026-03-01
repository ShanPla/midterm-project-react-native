import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  // Top buttons
  topRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  topButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  topButtonIcon: {
    marginRight: 2,
  },
  topButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },

  // Filter pills
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  filterPillIcon: {
    marginRight: 1,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
  },

  noResults: {
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 14,
  },

  // Job Details Modal
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  modalCloseText: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalContent: {
    padding: 24,
  },
  modalLogo: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  modalCompany: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  modalDetails: {
    fontSize: 12,
    marginBottom: 6,
    textAlign: 'center',
    opacity: 0.7,
  },
  modalSalary: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalTagContainer: {
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
  modalDescription: {
    fontSize: 13,
    lineHeight: 21,
    marginTop: 8,
  },
  modalApplyButton: {
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  // Toast
  toastBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    elevation: 6,
    gap: 8,
  },
  toastIcon: {
    marginRight: 2,
  },
  toastText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;