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
    reviewerName: '张女士',
    reviewerImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    rating: 5,
    text: '王阿姨非常负责任，对孩子很有耐心。她会做可口的饭菜，家里总是收拾得很干净。最让我感动的是她总是能想到我们想不到的细节，真的很贴心。',
    date: new Date(2023, 9, 15),
    helpfulCount: 24
  },
  {
    id: '2',
    caregiverId: '1',
    reviewerId: 'u2',
    reviewerName: '李先生',
    reviewerImage: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg',
    rating: 5,
    text: '我们家请王阿姨已经一年多了，她把我们的双胞胎照顾得特别好。不仅生活起居安排得妥妥当当，还会教孩子们学习认字，非常专业。',
    date: new Date(2023, 8, 22),
    helpfulCount: 18
  },
  {
    id: '3',
    caregiverId: '1',
    reviewerId: 'u3',
    reviewerName: '陈女士',
    reviewerImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    rating: 4,
    text: '王阿姨对我家小孩很好，会做营养的餐点，也会带孩子玩教育性的游戏。给4星是因为偶尔会迟到几分钟，不过都会提前通知。',
    date: new Date(2023, 7, 5),
    helpfulCount: 12
  },
  {
    id: '4',
    caregiverId: '2',
    reviewerId: 'u4',
    reviewerName: '刘先生',
    reviewerImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    rating: 5,
    text: '张阿姨在照顾老人方面很有经验，对我父亲照顾得无微不至。她不仅会做适合老人的饮食，还会陪老人聊天散步，让我父亲的生活质量提高了很多。',
    date: new Date(2023, 10, 3),
    helpfulCount: 31
  },
  {
    id: '5',
    caregiverId: '2',
    reviewerId: 'u5',
    reviewerName: '王女士',
    reviewerImage: 'https://images.pexels.com/photos/1853098/pexels-photo-1853098.jpeg',
    rating: 5,
    text: '张阿姨特别细心，会记录我母亲的用药时间，定期测量血压。她还会做一些适合老人的运动，帮助保持身体机能。非常感谢她的照顾。',
    date: new Date(2023, 9, 18),
    helpfulCount: 27
  },
  {
    id: '6',
    caregiverId: '3',
    reviewerId: 'u6',
    reviewerName: '赵先生',
    reviewerImage: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg',
    rating: 5,
    text: '李阿姨的厨艺特别好，每天变着花样给我们做不同的菜。家里收拾得也很干净整洁，是位非常勤快的阿姨。',
    date: new Date(2023, 10, 8),
    helpfulCount: 15
  },
  {
    id: '7',
    caregiverId: '3',
    reviewerId: 'u7',
    reviewerName: '孙女士',
    reviewerImage: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg',
    rating: 4,
    text: '李阿姨工作认真负责，把家里打理得井井有条。她还会教我一些家务小技巧，非常实用。唯一建议是可以多和家人交流。',
    date: new Date(2023, 9, 27),
    helpfulCount: 10
  },
  {
    id: '8',
    caregiverId: '4',
    reviewerId: 'u8',
    reviewerName: '郑女士',
    reviewerImage: 'https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg',
    rating: 5,
    text: '陈阿姨是我们遇到的最好的住家阿姨！她不仅把家务做得很好，还很会照顾小孩。最重要的是她人特别踏实可靠，让我们很放心。',
    date: new Date(2023, 10, 5),
    helpfulCount: 22
  },
  {
    id: '9',
    caregiverId: '4',
    reviewerId: 'u9',
    reviewerName: '杨先生',
    reviewerImage: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg',
    rating: 4,
    text: '陈阿姨对工作很认真，也很有责任心。她会主动做一些我们没想到的事情，比如整理衣柜、擦玻璃等。建议可以再多一些主动沟通。',
    date: new Date(2023, 9, 14),
    helpfulCount: 16
  }
];

export function getReviewsByCaregiver(caregiverId: string): Review[] {
  return reviews.filter(review => review.caregiverId === caregiverId);
}