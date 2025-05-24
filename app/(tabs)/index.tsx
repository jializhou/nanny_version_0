import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Platform,
  FlatList
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { featuredCaregivers } from '@/data/caregivers';
import CitySelector from '@/components/CitySelector';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [selectedCity, setSelectedCity] = useState('武汉');
  const [isCitySelectorVisible, setCitySelectorVisible] = useState(false);

  const renderCaregiverCard = ({ item, index }: { item: typeof featuredCaregivers[0], index: number }) => (
    <Link 
      href={`/caregiver/${item.id}`}
      style={[
        styles.featuredCard,
        { 
          backgroundColor: colors.card,
          marginLeft: index === 0 ? 0 : 16,
          ...Platform.select({
            web: { 
              textDecoration: 'none',
            },
            default: {}
          })
        }
      ]}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.caregiverImage}
          resizeMode="cover"
        />
        <View 
          style={[
            styles.availabilityBadge,
            { backgroundColor: item.available ? colors.success : colors.error }
          ]}
        >
          <Text style={styles.availabilityText}>
            {item.available ? '空闲中' : '在职'}
          </Text>
        </View>
      </View>
      <View style={styles.featuredCardContent}>
        <Text style={[styles.caregiverName, { color: colors.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#FFD700" fill="#FFD700" />
          <Text style={styles.ratingText}>
            {item.rating} ({item.reviewCount})
          </Text>
        </View>
        
        <View style={styles.skillsContainer}>
          {item.skills.slice(0, 3).map((skill, skillIndex) => (
            <View 
              key={skillIndex} 
              style={[
                styles.skillBadge,
                { backgroundColor: colors.primaryLight }
              ]}
            >
              <Text 
                style={[
                  styles.skillText,
                  { color: colors.primary }
                ]}
                numberOfLines={1}
              >
                {skill}
              </Text>
            </View>
          ))}
        </View>

        <Text 
          style={[styles.shortBio, { color: colors.textDim }]} 
          numberOfLines={2}
        >
          {item.shortBio}
        </Text>

        <Text style={[styles.caregiverRate, { color: colors.primary }]}>
          ¥{item.monthlySalary}/月
        </Text>
      </View>
    </Link>
  );

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
            <Text style={[styles.locationText, { color: colors.primary }]}>
              {selectedCity}
            </Text>
          </TouchableOpacity>
        </View>
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
          {featuredCaregivers.map((caregiver, index) => (
            <React.Fragment key={caregiver.id}>
              {renderCaregiverCard({ item: caregiver, index })}
            </React.Fragment>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('home.categories')}
        </Text>
        <View style={styles.categoriesContainer}>
          {['育婴', '保洁', '老人护理', '月嫂'].map((category) => (
            <TouchableOpacity 
              key={category}
              style={[styles.categoryButton, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.categoryText, { color: colors.text }]}>
                {category}
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
    fontFamily: 'Inter-Medium',
    fontSize: 14,
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
    width: 280,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  caregiverImage: {
    width: '100%',
    height: '100%',
  },
  availabilityBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
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
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    marginHorizontal: -2,
  },
  skillBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 2,
  },
  skillText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  shortBio: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 16,
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