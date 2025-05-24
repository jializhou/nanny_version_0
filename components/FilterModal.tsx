import { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { X, Search } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { cities } from '@/data/cities';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: string[], salaryRange: number[]) => void;
  activeFilters: string[];
  salaryRange?: number[];
}

const DEFAULT_SALARY_RANGE = [3000, 100000];

export default function FilterModal({ 
  visible, 
  onClose, 
  onApply,
  activeFilters,
  salaryRange: initialSalaryRange = DEFAULT_SALARY_RANGE
}: FilterModalProps) {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState(initialSalaryRange);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  useEffect(() => {
    if (visible) {
      setSelectedFilters(activeFilters);
      setSalaryRange(initialSalaryRange || DEFAULT_SALARY_RANGE);
    }
  }, [visible, activeFilters, initialSalaryRange]);
  
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  
  const clearAll = () => {
    setSelectedFilters([]);
    setSalaryRange(DEFAULT_SALARY_RANGE);
    setSearchQuery('');
    setSelectedCity(null);
  };
  
  const handleApply = () => {
    const allFilters = [...selectedFilters];
    if (selectedCity) {
      allFilters.push(selectedCity);
    }
    onApply(allFilters, salaryRange);
    onClose();
  };

  const formatSalary = (value: number) => {
    if (value >= 10000) {
      return `${(value / 10000).toFixed(1)}万`;
    }
    return value.toString();
  };

  const filteredCities = searchQuery
    ? cities.filter(city => 
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cities;

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
              筛选条件
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filtersContainer}>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                城市选择
              </Text>
              <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
                <Search size={20} color={colors.textDim} />
                <TextInput
                  style={[styles.searchInput, { color: colors.text }]}
                  placeholder="搜索城市"
                  placeholderTextColor={colors.textDim}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <View style={styles.citiesContainer}>
                {filteredCities.map((city) => (
                  <TouchableOpacity
                    key={city.id}
                    style={[
                      styles.cityButton,
                      selectedCity === city.name
                        ? { backgroundColor: colors.primaryLight, borderColor: colors.primary }
                        : { backgroundColor: colors.card, borderColor: colors.border }
                    ]}
                    onPress={() => setSelectedCity(city.name)}
                  >
                    <Text
                      style={[
                        styles.cityButtonText,
                        { 
                          color: selectedCity === city.name 
                            ? colors.primary 
                            : colors.text 
                        }
                      ]}
                    >
                      {city.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                工作类型
              </Text>
              <View style={styles.filterOptionsContainer}>
                {[
                  '住家', '钟点工', '早出晚归', '白班'
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
                技能要求
              </Text>
              <View style={styles.filterOptionsContainer}>
                {[
                  '带娃', '做饭', '做家务', '照顾老人',
                  '带宠物', '辅导作业', '早教'
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
                月薪范围
              </Text>
              <View style={styles.sliderContainer}>
                <View style={styles.salaryLabels}>
                  <Text style={[styles.salaryLabel, { color: colors.text }]}>
                    ¥{formatSalary(salaryRange[0])}
                  </Text>
                  <Text style={[styles.salaryLabel, { color: colors.text }]}>
                    ¥{formatSalary(salaryRange[1])}
                  </Text>
                </View>
                <MultiSlider
                  values={[salaryRange[0], salaryRange[1]]}
                  min={3000}
                  max={100000}
                  step={1000}
                  sliderLength={Platform.OS === 'web' ? 280 : undefined}
                  onValuesChange={(values) => setSalaryRange(values)}
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
                清除全部
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.applyButton, { backgroundColor: colors.primary }]}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>
                应用筛选
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  citiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  cityButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 4,
    borderWidth: 1,
  },
  cityButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
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
  salaryLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  salaryLabel: {
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