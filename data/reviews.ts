interface Review {
  id: string;
  caregiverId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerImage: string;
  rating: number;
  text: string;
  date: Date;
  helpfulCount: number;
}

const reviews: Review[] = [
  {
    id: '1',
    caregiverId: '1',
    reviewerId: 'u1',
    reviewerName: 'Jennifer B.',
    reviewerImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    rating: 5,
    text: 'Emma is an exceptional nanny! She is always on time, very responsible, and my kids absolutely adore her. She helps with homework and comes up with creative activities. Highly recommend!',
    date: new Date(2023, 9, 15),
    helpfulCount: 24
  },
  {
    id: '2',
    caregiverId: '1',
    reviewerId: 'u2',
    reviewerName: 'Robert M.',
    reviewerImage: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg',
    rating: 5,
    text: 'We\'ve been using Emma\'s services for over a year now, and she has been fantastic with our twins. She\'s patient, kind, and very knowledgeable about child development. She also helped our kids improve their reading skills!',
    date: new Date(2023, 8, 22),
    helpfulCount: 18
  },
  {
    id: '3',
    caregiverId: '1',
    reviewerId: 'u3',
    reviewerName: 'Sarah T.',
    reviewerImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    rating: 4,
    text: 'Emma is great with our toddler. She is energetic and engages him in educational activities. The only reason for 4 stars instead of 5 is that she was occasionally a few minutes late, but always communicated in advance.',
    date: new Date(2023, 7, 5),
    helpfulCount: 12
  },
  {
    id: '4',
    caregiverId: '2',
    reviewerId: 'u4',
    reviewerName: 'David L.',
    reviewerImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    rating: 5,
    text: 'Michael has been an incredible support for our family. His experience with special needs children is evident, and he has formed a wonderful bond with our son who has autism. He is patient, understanding, and knows exactly how to handle difficult situations.',
    date: new Date(2023, 10, 3),
    helpfulCount: 31
  },
  {
    id: '5',
    caregiverId: '2',
    reviewerId: 'u5',
    reviewerName: 'Michelle K.',
    reviewerImage: 'https://images.pexels.com/photos/1853098/pexels-photo-1853098.jpeg',
    rating: 5,
    text: 'We couldn\'t be happier with Michael\'s care for our daughter with ADHD. He has implemented strategies that have helped her focus better, and she looks forward to his visits. His knowledge about different disabilities is impressive.',
    date: new Date(2023, 9, 18),
    helpfulCount: 27
  },
  {
    id: '6',
    caregiverId: '3',
    reviewerId: 'u6',
    reviewerName: 'Andrew J.',
    reviewerImage: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg',
    rating: 5,
    text: 'Sophia is amazing! She speaks to our children in both English and Spanish, and it\'s wonderful to see them picking up a second language naturally. She\'s creative, fun, and very responsible.',
    date: new Date(2023, 10, 8),
    helpfulCount: 15
  },
  {
    id: '7',
    caregiverId: '3',
    reviewerId: 'u7',
    reviewerName: 'Catherine W.',
    reviewerImage: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg',
    rating: 4,
    text: 'Our kids love Sophia! She brings energy and enthusiasm to her babysitting. They enjoy the language games she plays with them, and she\'s always coming up with new activities to keep them engaged.',
    date: new Date(2023, 9, 27),
    helpfulCount: 10
  },
  {
    id: '8',
    caregiverId: '4',
    reviewerId: 'u8',
    reviewerName: 'Patricia H.',
    reviewerImage: 'https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg',
    rating: 5,
    text: 'James is the perfect nanny for our active boys! He takes them to the park, plays sports with them, and has even taught them swimming. He\'s also great with healthy meal preparation, which was a big plus for us.',
    date: new Date(2023, 10, 5),
    helpfulCount: 22
  },
  {
    id: '9',
    caregiverId: '4',
    reviewerId: 'u9',
    reviewerName: 'Thomas G.',
    reviewerImage: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg',
    rating: 4,
    text: 'James has been great for our family. Our son was quite sedentary, and James has really helped him become more active and interested in sports. He\'s reliable and always has a positive attitude.',
    date: new Date(2023, 9, 14),
    helpfulCount: 16
  }
];

export function getReviewsByCaregiver(caregiverId: string): Review[] {
  return reviews.filter(review => review.caregiverId === caregiverId);
}