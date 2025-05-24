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
import { useColorScheme } from 'react-native';
import { Search, Filter, Star, MapPin, X, Heart } from 'lucide-react-native';
import { Link } from 'expo-router';
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
  const [salaryRange, setSalaryRange] = useState([3000, 100000]);
  const [filteredCaregivers, setFilteredCaregivers] = useState(allCaregivers);
  const [favorites, setFavorites] = useState<string[]>([]);
  
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

  const handleFilters = (filters: string[], salary: number[]) => {
    setActiveFilters(filters);
    setSalaryRange(salary);
    
    let filtered = allCaregivers;
    
    if (filters.length > 0) {
      filtered = filtered.filter(caregiver =>
        filters.some(filter => 
          caregiver.skills.includes(filter) || 
          caregiver.specialty.includes(filter)
        )
      );
    }
    
    filtered = filtered.filter(caregiver => 
      caregiver.monthlySalary >= salary[0] && 
      caregiver.monthlySalary <= salary[1]
    );
    
    setFilteredCaregivers(filtered);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fid => fid !== id)
        : [...prev, id]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colors.card }]}>
          <Search size={20} color={colors.textDim} />
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
          <View style={[styles.caregiverCard, { backgroundColor: colors.card }]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <Image source={{ uri: item.imageUrl }} style={styles.caregiverAvatar} />
                <View>
                  <Text style={[styles.caregiverName, { color: colors.text }]}>
                    {item.name}
                  </Text>
                  <View style={styles.locationRow}>
                    <MapPin size={14} color={colors.textDim} />
                    <Text style={[styles.locationText, { color: colors.textDim }]}>
                      所在地：{item.city} | {item.age}岁 | 籍贯：{item.hometown}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(item.id)}
              >
                <Heart 
                  size={24} 
                  color={favorites.includes(item.id) ? colors.accent : colors.textDim}
                  fill={favorites.includes(item.id) ? colors.accent : 'transparent'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.ratingRow}>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>
                    {item.rating} ({item.reviewCount})
                  </Text>
                </View>
                <Text style={[styles.experience, { color: colors.textDim }]}>
                  {item.experience}年经验
                </Text>
              </View>

              <Text style={[styles.shortBio, { color: colors.text }]} numberOfLines={2}>
                {item.shortBio}
              </Text>

              <View style={styles.skillsContainer}>
                {item.skills.map((skill, index) => (
                  <View 
                    key={index}
                    style={[styles.skillBadge, { backgroundColor: colors.primaryLight }]}
                  >
                    <Text style={[styles.skillText, { color: colors.primary }]}>
                      {skill}
                    </Text>
                  </View>
                ))}
              </View>

              {item.images && (
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.imagesContainer}
                >
                  {Object.entries(item.images).map(([key, url]) => (
                    <Image 
                      key={key}
                      source={{ uri: url }}
                      style={styles.workImage}
                    />
                  ))}
                </ScrollView>
              )}

              <View style={styles.cardFooter}>
                <Text style={[styles.salary, { color: colors.primary }]}>
                  ¥{item.monthlySalary}/月
                </Text>
                <Link 
                  href={`/caregiver/${item.id}`}
                  style={Platform.OS === 'web' ? { textDecoration: 'none' } : {}}
                >
                  <View style={[styles.contactButton, { backgroundColor: colors.primary }]}>
                    <Text style={styles.contactButtonText}>联系阿姨</Text>
                  </View>
                </Link>
              </View>
            </View>
          </View>
        )}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleFilters}
        activeFilters={activeFilters}
        salaryRange={salaryRange}
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
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caregiverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  caregiverName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  favoriteButton: {
    padding: 8,
  },
  cardBody: {
    padding: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  experience: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  shortBio: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    marginHorizontal: -4,
  },
  skillBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  skillText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  salary: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  contactButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  workImage: {
    width: 120,
    height: 90,
    borderRadius: 8,
    marginRight: 8,
  },
  imagesContainer: {
    marginVertical: 12,
  },
});