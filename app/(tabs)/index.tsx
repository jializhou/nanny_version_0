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
import { Star, Briefcase, Search } from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { featuredCaregivers } from '@/data/caregivers';
import CitySelector from '@/components/CitySelector';

const jobListings = [
  {
    id: '1',
    title: '双胞胎育儿嫂',
    location: '武汉市洪山区',
    salary: '12000-15000元/月',
    requirements: '3年以上经验，会早教',
    postedAt: '10分钟前',
    urgent: true,
  },
  {
    id: '2',
    title: '住家保姆',
    location: '武汉市江汉区',
    salary: '8000-10000元/月',
    requirements: '会做饭，照顾老人',
    postedAt: '30分钟前',
    urgent: false,
  },
  {
    id: '3',
    title: '钟点工',
    location: '武汉市武昌区',
    salary: '100元/小时',
    requirements: '勤快整洁，有责任心',
    postedAt: '1小时前',
    urgent: false,
  }
];

const jobSeekers = [
  {
    id: '1',
    name: '张阿姨',
    age: 45,
    experience: '8年育儿经验',
    skills: ['育儿', '早教', '月嫂'],
    expectedSalary: '10000-12000元/月',
    available: '随时到岗',
    image: 'https://images.pexels.com/photos/3768167/pexels-photo-3768167.jpeg'
  },
  {
    id: '2',
    name: '李阿姨',
    age: 42,
    experience: '5年家政经验',
    skills: ['保洁', '烹饪', '照顾老人'],
    expectedSalary: '8000-9000元/月',
    available: '一周内到岗',
    image: 'https://images.pexels.com/photos/3831612/pexels-photo-3831612.jpeg'
  },
  {
    id: '3',
    name: '王阿姨',
    age: 38,
    experience: '3年月嫂经验',
    skills: ['月嫂', '育儿', '营养搭配'],
    expectedSalary: '15000-18000元/月',
    available: '本月底到岗',
    image: 'https://images.pexels.com/photos/3979287/pexels-photo-3979287.jpeg'
  }
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  
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

  const renderJobListing = ({ item, index }) => (
    <TouchableOpacity 
      style={[
        styles.jobCard, 
        { 
          backgroundColor: colors.card,
          marginLeft: index === 0 ? 0 : 16 
        }
      ]}
    >
      <View style={styles.jobHeader}>
        <Text style={[styles.jobTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        {item.urgent && (
          <View style={[styles.urgentBadge, { backgroundColor: colors.error + '20' }]}>
            <Text style={[styles.urgentText, { color: colors.error }]}>急聘</Text>
          </View>
        )}
      </View>
      <Text style={[styles.jobLocation, { color: colors.textDim }]}>
        {item.location}
      </Text>
      <Text style={[styles.jobSalary, { color: colors.primary }]}>
        {item.salary}
      </Text>
      <Text style={[styles.jobRequirements, { color: colors.text }]}>
        {item.requirements}
      </Text>
      <Text style={[styles.jobTime, { color: colors.textDim }]}>
        {item.postedAt}
      </Text>
    </TouchableOpacity>
  );

  const renderJobSeeker = ({ item, index }) => (
    <TouchableOpacity 
      style={[
        styles.seekerCard, 
        { 
          backgroundColor: colors.card,
          marginLeft: index === 0 ? 0 : 16 
        }
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.seekerImage} />
      <View style={styles.seekerInfo}>
        <View style={styles.seekerHeader}>
          <Text style={[styles.seekerName, { color: colors.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.seekerAge, { color: colors.textDim }]}>
            {item.age}岁
          </Text>
        </View>
        <Text style={[styles.seekerExperience, { color: colors.text }]}>
          {item.experience}
        </Text>
        <View style={styles.seekerSkills}>
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
        <Text style={[styles.seekerSalary, { color: colors.primary }]}>
          {item.expectedSalary}
        </Text>
        <Text style={[styles.seekerAvailable, { color: colors.success }]}>
          {item.available}
        </Text>
      </View>
    </TouchableOpacity>
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
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            最新招聘
          </Text>
          <TouchableOpacity 
            style={styles.postButton}
            onPress={() => router.push('/(forms)/post-job')}
          >
            <Briefcase size={16} color={colors.primary} />
            <Text style={[styles.postButtonText, { color: colors.primary }]}>
              发布招聘
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.jobsScrollContent}
        >
          {jobListings.map((job, index) => (
            <React.Fragment key={job.id}>
              {renderJobListing({ item: job, index })}
            </React.Fragment>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            最新求职
          </Text>
          <TouchableOpacity 
            style={styles.postButton}
            onPress={() => router.push('/(forms)/find-work')}
          >
            <Search size={16} color={colors.primary} />
            <Text style={[styles.postButtonText, { color: colors.primary }]}>
              发布求职
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.seekersScrollContent}
        >
          {jobSeekers.map((seeker, index) => (
            <React.Fragment key={seeker.id}>
              {renderJobSeeker({ item: seeker, index })}
            </React.Fragment>
          ))}
        </ScrollView>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  postButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
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
  jobsScrollContent: {
    paddingRight: 16,
  },
  jobCard: {
    width: 280,
    padding: 16,
    borderRadius: 16,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    flex: 1,
  },
  urgentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  urgentText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  jobLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  jobSalary: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  jobRequirements: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  jobTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  seekersScrollContent: {
    paddingRight: 16,
  },
  seekerCard: {
    width: 280,
    borderRadius: 16,
    overflow: 'hidden',
  },
  seekerImage: {
    width: '100%',
    height: 160,
  },
  seekerInfo: {
    padding: 12,
  },
  seekerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  seekerName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  seekerAge: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  seekerExperience: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  seekerSkills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    marginHorizontal: -2,
  },
  seekerSalary: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  seekerAvailable: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});