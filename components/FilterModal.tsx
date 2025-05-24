import { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Slider
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: string[]) => void;
  activeFilters: string[];
}

export default function FilterModal({ 
  visible, 
  onClose, 
  onApply,
  activeFilters 
}: FilterModalProps) {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([15, 50]);
  const [rating, setRating] = useState(0);
  
  useEffect(() => {
    if (visible) {
      setSelectedFilters(activeFilters);
    }
  }, [visible, activeFilters]);
  
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  
  const clearAll = () => {
    setSelectedFilters([]);
    setPriceRange([15, 50]);
    setRating(0);
  };
  
  const handleApply = () => {
    onApply(selectedFilters);
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
                {t('filters.categories')}
              </Text>
              <View style={styles.filterOptionsContainer}>
                {['Nanny', 'Babysitter', 'Tutor', 'SpecialNeeds'].map((filter) => (
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
                      {t(`categories.${filter.toLowerCase()}`)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('filters.skills')}
              </Text>
              <View style={styles.filterOptionsContainer}>
                {['FirstAid', 'Cooking', 'Multilingual', 'Driving', 'Homework', 'Activities'].map((filter) => (
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
                      {t(`skills.${filter.toLowerCase()}`)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('filters.priceRange')}
              </Text>
              <View style={styles.sliderContainer}>
                <View style={styles.priceLabels}>
                  <Text style={[styles.priceLabel, { color: colors.text }]}>
                    ${priceRange[0]}
                  </Text>
                  <Text style={[styles.priceLabel, { color: colors.text }]}>
                    ${priceRange[1]}
                  </Text>
                </View>
                <Slider
                  minimumValue={10}
                  maximumValue={100}
                  value={priceRange[1]}
                  onValueChange={(value) => setPriceRange([priceRange[0], Math.round(value)])}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                  step={1}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('filters.rating')}
              </Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    style={[
                      styles.starButton,
                      { backgroundColor: star <= rating ? '#FFD700' : colors.card }
                    ]}
                    onPress={() => setRating(star)}
                  >
                    <Text style={styles.starText}>★</Text>
                  </TouchableOpacity>
                ))}
                <Text style={[styles.ratingText, { color: colors.text }]}>
                  {rating > 0 ? `${rating}+ ${t('filters.stars')}` : t('filters.anyRating')}
                </Text>
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
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  starText: {
    fontSize: 20,
    color: 'white',
  },
  ratingText: {
    marginLeft: 8,
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