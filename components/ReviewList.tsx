import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { Star, ThumbsUp, Flag } from 'lucide-react-native';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { getReviewsByCaregiver } from '@/data/reviews';
import { formatReviewDate } from '@/utils/dateFormatter';

interface ReviewListProps {
  caregiverId: string;
}

export default function ReviewList({ caregiverId }: ReviewListProps) {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  
  const reviews = getReviewsByCaregiver(caregiverId);
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([]);
  
  const markHelpful = (reviewId: string) => {
    if (helpfulReviews.includes(reviewId)) {
      setHelpfulReviews(helpfulReviews.filter(id => id !== reviewId));
    } else {
      setHelpfulReviews([...helpfulReviews, reviewId]);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            color="#FFD700"
            fill={star <= rating ? "#FFD700" : "transparent"}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {reviews.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.textDim }]}>
            {t('reviews.noReviews')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.reviewCard, { backgroundColor: colors.card }]}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerInfo}>
                  <Image source={{ uri: item.reviewerImage }} style={styles.reviewerImage} />
                  <View>
                    <Text style={[styles.reviewerName, { color: colors.text }]}>
                      {item.reviewerName}
                    </Text>
                    <Text style={[styles.reviewDate, { color: colors.textDim }]}>
                      {formatReviewDate(item.date)}
                    </Text>
                  </View>
                </View>
                {renderStars(item.rating)}
              </View>
              
              <Text style={[styles.reviewText, { color: colors.text }]}>
                {item.text}
              </Text>
              
              <View style={styles.reviewFooter}>
                <TouchableOpacity 
                  style={[
                    styles.helpfulButton, 
                    helpfulReviews.includes(item.id) && { backgroundColor: colors.primaryLight }
                  ]}
                  onPress={() => markHelpful(item.id)}
                >
                  <ThumbsUp 
                    size={16} 
                    color={helpfulReviews.includes(item.id) ? colors.primary : colors.textDim}
                  />
                  <Text 
                    style={[
                      styles.helpfulText, 
                      { 
                        color: helpfulReviews.includes(item.id) 
                          ? colors.primary 
                          : colors.textDim
                      }
                    ]}
                  >
                    {t('reviews.helpful')} ({item.helpfulCount + (helpfulReviews.includes(item.id) ? 1 : 0)})
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.reportButton}>
                  <Flag size={16} color={colors.textDim} />
                  <Text style={[styles.reportText, { color: colors.textDim }]}>
                    {t('reviews.report')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  reviewCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 2,
  },
  reviewDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  helpfulText: {
    marginLeft: 6,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportText: {
    marginLeft: 6,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});