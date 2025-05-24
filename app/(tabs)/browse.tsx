import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  Pressable
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Star, MapPin, X } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { allCaregivers } from '@/data/caregivers';
import FilterModal from '@/components/FilterModal';

export default function BrowseScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState([25, 55]);
  const [filteredCaregivers, setFilteredCaregivers] = useState(allCaregivers);
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const searchLower = text.toLowerCase();
    const filtered = allCaregivers.filter(caregiver => 
      caregiver.name.toLowerCase().includes(searchLower) ||
      caregiver.specialty.toLowerCase().includes(searchLower) ||
      caregiver.skills.some(skill => skill.toLowerCase().includes(searchLower))
    );
    setFilteredCaregivers(filtered);
  };

  const handleFilters = (filters: string[], age: number[]) => {
    setActiveFilters(filters);
    setAgeRange(age);
    
    let filtered = allCaregivers;
    
    if (filters.length > 0) {
      filtered = filtered.filter(caregiver =>
        filters.some(filter => 
          caregiver.skills.includes(filter) || 
          caregiver.specialty.includes(filter)
        )
      );
    }
    
    setFilteredCaregivers(filtered);
  };

  const CardLink = Platform.select({
    web: Link,
    default: Pressable,
  }) as typeof Link;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colors.card }]}>
          <Search size={20} color={colors.text} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t('browse.searchPlaceholder')}
            placeholderTextColor={colors.textDim}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <X size={20} color={colors.textDim} />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: colors.primary }]}
          onPress={() => setFilterModalVisible(true)}
        >
          <Filter size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {activeFilters.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScrollView}
          contentContainerStyle={styles.filtersContainer}
        >
          {activeFilters.map(filter => (
            <View 
              key={filter}
              style={[styles.filterChip, { backgroundColor: colors.primaryLight }]}
            >
              <Text style={[styles.filterChipText, { color: colors.primary }]}>
                {filter}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      <FlatList
        data={filteredCaregivers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.caregiverListContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardLink 
            href={`/caregiver/${item.id}`} 
            style={Platform.select({
              web: { textDecoration: 'none', display: 'block' },
              default: {}
            })}
          >
            <TouchableOpacity style={[styles.caregiverCard, { backgroundColor: colors.card }]}>
              <Image source={{ uri: item.imageUrl }} style={styles.caregiverImage} />
              <View style={styles.caregiverInfo}>
                <Text style={[styles.caregiverName, { color: colors.text }]}>
                  {item.name}
                </Text>
                <View style={styles.locationRow}>
                  <MapPin size={14} color={colors.textDim} />
                  <Text style={[styles.locationText, { color: colors.textDim }]}>
                    {item.city}
                  </Text>
                </View>
                <Text style={[styles.caregiverSpecialty, { color: colors.textDim }]}>
                  {item.specialty}
                </Text>
                <View style={styles.caregiverFooter}>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>
                      {item.rating} ({item.reviewCount})
                    </Text>
                  </View>
                  <Text style={[styles.caregiverRate, { color: colors.primary }]}>
                    ¥{item.hourlyRate}/小时
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </CardLink>
        )}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleFilters}
        activeFilters={activeFilters}
        ageRange={ageRange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersScrollView: {
    maxHeight: 40,
    marginBottom: 16,
  },
  filtersContainer: {
    paddingRight: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  caregiverListContent: {
    paddingBottom: 20,
  },
  caregiverCard: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  caregiverImage: {
    width: 100,
    height: 120,
    resizeMode: 'cover',
  },
  caregiverInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  caregiverName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  caregiverSpecialty: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  caregiverFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888',
  },
  caregiverRate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});