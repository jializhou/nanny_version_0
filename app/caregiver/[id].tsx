import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  FlatList
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Star, MapPin, Heart, Shield, Check, Clock, Phone, MessageCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { getCaregiverById } from '@/data/caregivers';
import { getReviewsByCaregiver } from '@/data/reviews';

const { width } = Dimensions.get('window');

export default function CaregiverDetailScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = Colors[colorScheme ?? 'light'];
  
  const caregiver = getCaregiverById(id);
  const reviews = getReviewsByCaregiver(id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  if (!caregiver) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFoundText, { color: colors.text }]}>
          未找到该阿姨
        </Text>
      </View>
    );
  }

  const renderReview = ({ item }) => (
    <View style={[styles.reviewCard, { backgroundColor: colors.card }]}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: item.reviewerImage }} style={styles.reviewerAvatar} />
        <View style={styles.reviewerInfo}>
          <Text style={[styles.reviewerName, { color: colors.text }]}>
            {item.reviewerName}
          </Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                color="#FFD700"
                fill={star <= item.rating ? "#FFD700" : "transparent"}
              />
            ))}
          </View>
        </View>
        <Text style={[styles.reviewDate, { color: colors.textDim }]}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      <Text style={[styles.reviewText, { color: colors.text }]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: caregiver.imageUrl }} style={styles.coverImage} />
          <TouchableOpacity
            style={[styles.favoriteButton, { backgroundColor: colors.card }]}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Heart 
              size={24} 
              color={isFavorite ? colors.accent : colors.text}
              fill={isFavorite ? colors.accent : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
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
            <View style={[styles.verifiedBadge, { backgroundColor: colors.success + '20' }]}>
              <Shield size={14} color={colors.success} />
              <Text style={[styles.verifiedText, { color: colors.success }]}>
                已认证
              </Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: colors.card }]}>
              <Star size={20} color="#FFD700" fill="#FFD700" />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {caregiver.rating}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textDim }]}>
                评分
              </Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.card }]}>
              <Clock size={20} color={colors.primary} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {caregiver.experience}年
              </Text>
              <Text style={[styles.statLabel, { color: colors.textDim }]}>
                经验
              </Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.card }]}>
              <MessageCircle size={20} color={colors.primary} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {caregiver.reviewCount}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textDim }]}>
                评价
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              个人简介
            </Text>
            <Text style={[styles.bioText, { color: colors.text }]}>
              {caregiver.bio}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              技能特长
            </Text>
            <View style={styles.skillsContainer}>
              {caregiver.skills.map((skill) => (
                <View 
                  key={skill} 
                  style={[styles.skillBadge, { backgroundColor: colors.primaryLight }]}
                >
                  <Check size={14} color={colors.primary} />
                  <Text style={[styles.skillText, { color: colors.primary }]}>
                    {skill}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              证书资质
            </Text>
            <View style={styles.certificatesContainer}>
              {caregiver.certifications.map((cert) => (
                <View 
                  key={cert}
                  style={[styles.certCard, { backgroundColor: colors.card }]}
                >
                  <Shield size={20} color={colors.primary} />
                  <Text style={[styles.certText, { color: colors.text }]}>
                    {cert}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              服务评价
            </Text>
            <FlatList
              data={reviews}
              renderItem={renderReview}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text style={[styles.noReviewsText, { color: colors.textDim }]}>
                  暂无评价
                </Text>
              }
            />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        <View>
          <Text style={[styles.rateLabel, { color: colors.textDim }]}>
            月薪
          </Text>
          <Text style={[styles.rateValue, { color: colors.text }]}>
            ¥{caregiver.monthlySalary}/月
          </Text>
        </View>
        <View style={styles.footerButtons}>
          <TouchableOpacity 
            style={[styles.phoneButton, { backgroundColor: colors.primaryLight }]}
          >
            <Phone size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contactButton, { backgroundColor: colors.primary }]}>
            <Text style={styles.contactButtonText}>
              立即联系
            </Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
    marginRight: 16,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 4,
  },
  skillText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  certificatesContainer: {
    marginHorizontal: -4,
  },
  certCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  certText: {
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  reviewCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  reviewText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  noReviewsText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 12,
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
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  notFoundText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginTop: 100,
  },
});