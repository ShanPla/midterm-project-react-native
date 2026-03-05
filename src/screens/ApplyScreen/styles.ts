import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    paddingBottom: 40,
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.6,
  },
  charCount: {
    fontSize: 11,
    fontWeight: '600',
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 14,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  contactPrefix: {
    paddingLeft: 14,
    paddingRight: 0,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  contactInput: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  textArea: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    height: 130,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  errorText: {
    fontSize: 11,
    marginTop: 5,
    fontWeight: '500',
  },
  submitButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
});

export default styles;