import { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: string[], ageRange: number[]) => void;
  activeFilters: string[];
  ageRange?: number[];
}

const DEFAULT_AGE_RANGE = [25, 55];

export default function FilterModal({ 
  visible, 
  onClose, 
  onApply,
  activeFilters,
  ageRange: initialAgeRange = DEFAULT_AGE_RANGE
}: FilterModalProps) {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState(initialAgeRange);
  
  useEffect(() => {
    if (visible) {
      setSelectedFilters(activeFilters);
      setAgeRange(initialAgeRange || DEFAULT_AGE_RANGE);
    }
  }, [visible, activeFilters, initialAgeRange]);
  
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  
  const clearAll = () => {
    setSelectedFilters([]);
    setAgeRange(DEFAULT_AGE_RANGE);
  };
  
  const handleApply = () => {
    onApply(selectedFilters, ageRange);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t('filters.title')}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filtersContainer}>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('filters.skills')}
              </Text>
              <View style={styles.filterOptionsContainer}>
                {[
                  '育婴', '做饭', '保洁', '老人护理', 
                  '住家', '钟点工', '早教', '月嫂'
                ].map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    style={[
                      styles.filterOption,
                      selectedFilters.includes(filter)
                        ? { backgroundColor: colors.primaryLight, borderColor: colors.primary }
                        : { backgroundColor: colors.card, borderColor: colors.border }
                    ]}
                    onPress={() => toggleFilter(filter)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        { 
                          color: selectedFilters.includes(filter) 
                            ? colors.primary 
                            : colors.text 
                        }
                      ]}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('filters.age')}
              </Text>
              <View style={styles.sliderContainer}>
                <View style={styles.ageLabels}>
                  <Text style={[styles.ageLabel, { color: colors.text }]}>
                    {ageRange[0]} 岁
                  </Text>
                  <Text style={[styles.ageLabel, { color: colors.text }]}>
                    {ageRange[1]} 岁
                  </Text>
                </View>
                <MultiSlider
                  values={[ageRange[0], ageRange[1]]}
                  min={18}
                  max={65}
                  step={1}
                  sliderLength={Platform.OS === 'web' ? 280 : undefined}
                  onValuesChange={(values) => setAgeRange(values)}
                  selectedStyle={{ backgroundColor: colors.primary }}
                  unselectedStyle={{ backgroundColor: colors.border }}
                  markerStyle={{
                    backgroundColor: colors.primary,
                    height: 20,
                    width: 20,
                  }}
                />
              </View>
            </View>
          </ScrollView>

          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <TouchableOpacity
              style={[styles.clearButton, { borderColor: colors.border }]}
              onPress={clearAll}
            >
              <Text style={[styles.clearButtonText, { color: colors.text }]}>
                {t('filters.clearAll')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.applyButton, { backgroundColor: colors.primary }]}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>
                {t('filters.apply')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  closeButton: {
    padding: 4,
  },
  filtersContainer: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  filterOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 4,
    borderWidth: 1,
  },
  filterOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  sliderContainer: {
    paddingHorizontal: 4,
  },
  ageLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ageLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});