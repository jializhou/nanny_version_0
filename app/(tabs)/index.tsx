import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Filter, Star } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import LanguageToggle from '@/components/LanguageToggle';
import { featuredCaregivers } from '@/data/caregivers';
import CitySelector from '@/components/CitySelector';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('New York');
  const [isCitySelectorVisible, setCitySelectorVisible] = useState(false);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.welcomeText, { color: colors.text }]}>
            {t('home.welcome')}
          </Text>
          <TouchableOpacity 
            style={styles.locationButton} 
            onPress={() => setCitySelectorVisible(true)}
          >
            <MapPin size={14} color={colors.primary} />
            <Text style={[styles.locationText, { color: colors.primary }]}>
              {selectedCity}
            </Text>
          </TouchableOpacity>
        </View>
        <LanguageToggle />
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colors.card }]}>
          <Search size={20} color={colors.text} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t('home.searchPlaceholder')}
            placeholderTextColor={colors.textDim}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: colors.primary }]}
        >
          <Filter size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('home.featured')}
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredScrollContent}
        >
          {featuredCaregivers.map((caregiver) => (
            <Link 
              key={caregiver.id} 
              href={`/caregiver/${caregiver.id}`}
              style={Platform.select({
                web: { textDecoration: 'none', display: 'block' },
                default: {}
              })}
            >
              <TouchableOpacity style={[styles.featuredCard, { backgroundColor: colors.card }]}>
                <Image 
                  source={{ uri: caregiver.imageUrl }} 
                  style={styles.caregiverImage} 
                />
                <View style={styles.featuredCardContent}>
                  <Text style={[styles.caregiverName, { color: colors.text }]}>
                    {caregiver.name}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>
                      {caregiver.rating} ({caregiver.reviewCount})
                    </Text>
                  </View>
                  <Text style={[styles.caregiverSpecialty, { color: colors.textDim }]}>
                    {caregiver.specialty}
                  </Text>
                  <Text style={[styles.caregiverRate, { color: colors.primary }]}>
                    ${caregiver.hourlyRate}/hr
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('home.categories')}
        </Text>
        <View style={styles.categoriesContainer}>
          {['Nanny', 'Babysitter', 'Tutor', 'Special Needs'].map((category) => (
            <TouchableOpacity 
              key={category}
              style={[styles.categoryButton, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.categoryText, { color: colors.text }]}>
                {t(`categories.${category.toLowerCase().replace(' ', '')}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <CitySelector 
        visible={isCitySelectorVisible} 
        onClose={() => setCitySelectorVisible(false)} 
        onSelectCity={(city) => {
          setSelectedCity(city);
          setCitySelectorVisible(false);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    marginTop: Platform.OS === 'ios' ? 8 : 0,
  },
  welcomeText: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 24,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  featuredScrollContent: {
    paddingRight: 16,
  },
  featuredCard: {
    width: 220,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
  },
  caregiverImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  featuredCardContent: {
    padding: 12,
  },
  caregiverName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888',
  },
  caregiverSpecialty: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  caregiverRate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    margin: 4,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});