import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.35,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptySubText: {
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.6,
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

  // Delete Modal
  deleteModalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModalContainer: {
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
  deleteIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  deleteModalTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  deleteModalMessage: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22,
  },
  deleteJobTitle: {
    fontWeight: '700',
    fontStyle: 'italic',
  },
  deleteModalButtons: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  deleteCancelButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteCancelText: {
    fontWeight: '600',
    fontSize: 13,
  },
  deleteConfirmButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  deleteButtonIcon: {
    marginRight: 2,
  },
});

export default styles;