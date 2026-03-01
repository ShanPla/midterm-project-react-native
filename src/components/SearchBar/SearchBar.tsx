import { View, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  theme: any;
};

export default function SearchBar({ value, onChangeText, theme }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <FontAwesome name="search" size={16} color={theme.subText} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: theme.text }]}
        placeholder="Search jobs, companies..."
        placeholderTextColor={theme.subText}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
}
