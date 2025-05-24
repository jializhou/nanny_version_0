import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Star, MapPin, Clock, DollarSign, MessageCircle, Heart, Shield, Check } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { getCaregiverById } from '@/data/caregivers';
import ReviewList from '@/components/ReviewList';

const { width } = Dimensions.get('window');

export default function CaregiverDetailScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = Colors[colorScheme ?? 'light'];
  
  const caregiver = getCaregiverById(id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  if (!caregiver) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFoundText, { color: colors.text }]}>
          {t('caregiver.notFound')}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: caregiver.imageUrl }} style={styles.coverImage} />
          <View style={styles.favoriteButton}>
            <TouchableOpacity
              style={[
                styles.iconButton,
                { backgroundColor: colors.card }
              ]}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                size={20} 
                color={isFavorite ? colors.accent : colors.text} 
                fill={isFavorite ? colors.accent : 'transparent'} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={[styles.name, { color: colors.text }]}>
              {caregiver.name}
            </Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color={colors.textDim} />
              <Text style={[styles.location, { color: colors.textDim }]}>
                {caregiver.city}
              </Text>
            </View>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.ratingContainer}>
              <Star size={18} color="#FFD700" fill="#FFD700" />
              <Text style={[styles.rating, { color: colors.text }]}>
                {caregiver.rating}
              </Text>
              <Text style={[styles.reviewCount, { color: colors.textDim }]}>
                ({caregiver.reviewCount} {t('caregiver.reviews')})
              </Text>
            </View>
            <View style={[styles.verifiedBadge, { backgroundColor: colors.success + '20' }]}>
              <Shield size={14} color={colors.success} />
              <Text style={[styles.verifiedText, { color: colors.success }]}>
                {t('caregiver.verified')}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
              <Clock size={20} color={colors.primary} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                {caregiver.experience} {t('caregiver.years')}
              </Text>
            </View>
            <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
              <DollarSign size={20} color={colors.primary} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                ${caregiver.hourlyRate}/hr
              </Text>
            </View>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'about' && { 
                  borderBottomColor: colors.primary,
                  borderBottomWidth: 2,
                }
              ]}
              onPress={() => setActiveTab('about')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'about' ? colors.primary : colors.textDim }
                ]}
              >
                {t('caregiver.about')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'reviews' && { 
                  borderBottomColor: colors.primary,
                  borderBottomWidth: 2,
                }
              ]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'reviews' ? colors.primary : colors.textDim }
                ]}
              >
                {t('caregiver.reviews')}
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'about' ? (
            <>
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  {t('caregiver.bio')}
                </Text>
                <Text style={[styles.bioText, { color: colors.text }]}>
                  {caregiver.bio}
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  {t('caregiver.skills')}
                </Text>
                <View style={styles.skillsContainer}>
                  {caregiver.skills.map((skill) => (
                    <View 
                      key={skill} 
                      style={[styles.skillBadge, { backgroundColor: colors.primaryLight }]}
                    >
                      <Text style={[styles.skillText, { color: colors.primary }]}>
                        {skill}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  {t('caregiver.certifications')}
                </Text>
                {caregiver.certifications.map((cert) => (
                  <View key={cert} style={styles.certificationItem}>
                    <Check size={16} color={colors.success} />
                    <Text style={[styles.certificationText, { color: colors.text }]}>
                      {cert}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <ReviewList caregiverId={caregiver.id} />
          )}
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        <View>
          <Text style={[styles.rateLabel, { color: colors.textDim }]}>
            {t('caregiver.hourlyRate')}
          </Text>
          <Text style={[styles.rateValue, { color: colors.text }]}>
            ${caregiver.hourlyRate}/hr
          </Text>
        </View>
        <TouchableOpacity style={[styles.contactButton, { backgroundColor: colors.primary }]}>
          <MessageCircle size={20} color="#fff" />
          <Text style={styles.contactButtonText}>
            {t('caregiver.contact')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  coverImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 16,
    right: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  skillBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 4,
  },
  skillText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  certificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  certificationText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  rateLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  rateValue: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  contactButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  notFoundText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginTop: 100,
  },
});