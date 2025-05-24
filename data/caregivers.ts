interface Caregiver {
  id: string;
  name: string;
  imageUrl: string;
  city: string;
  specialty: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  experience: number;
  bio: string;
  skills: string[];
  certifications: string[];
}

export const featuredCaregivers: Caregiver[] = [
  {
    id: '1',
    name: '王阿姨',
    imageUrl: 'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg',
    city: '武汉',
    specialty: '育婴护理',
    hourlyRate: 35,
    rating: 4.9,
    reviewCount: 128,
    experience: 8,
    bio: '从事育婴工作8年，有丰富的育儿经验。擅长新生儿护理、辅食制作和早教活动。持有育婴师证书和健康证。性格温和，有耐心，深受家长和宝宝的喜爱。',
    skills: ['育婴', '做饭', '早教', '月嫂'],
    certifications: ['育婴师证书', '健康证', '母婴护理证']
  },
  {
    id: '2',
    name: '张阿姨',
    imageUrl: 'https://images.pexels.com/photos/3831612/pexels-photo-3831612.jpeg',
    city: '北京',
    specialty: '老人护理',
    hourlyRate: 40,
    rating: 4.8,
    reviewCount: 97,
    experience: 10,
    bio: '专业从事养老护理工作10年，对老年人的生活起居、康复护理有丰富经验。性格开朗，有爱心和耐心，擅长与老人沟通交流。持有养老护理证书。',
    skills: ['老人护理', '做饭', '保洁', '康复护理'],
    certifications: ['养老护理证书', '健康证', '急救证书']
  },
  {
    id: '3',
    name: '李阿姨',
    imageUrl: 'https://images.pexels.com/photos/3979287/pexels-photo-3979287.jpeg',
    city: '上海',
    specialty: '保洁做饭',
    hourlyRate: 30,
    rating: 4.7,
    reviewCount: 84,
    experience: 5,
    bio: '有5年家政服务经验，擅长家居清洁和烹饪。了解各类清洁用品的使用方法，会制作各地特色菜品。工作认真负责，注重细节，有良好的职业道德。',
    skills: ['保洁', '做饭', '收纳整理', '日常护理'],
    certifications: ['家政服务证书', '健康证', '厨师证']
  },
  {
    id: '4',
    name: '陈阿姨',
    imageUrl: 'https://images.pexels.com/photos/3768114/pexels-photo-3768114.jpeg',
    city: '广州',
    specialty: '住家保姆',
    hourlyRate: 38,
    rating: 4.8,
    reviewCount: 76,
    experience: 7,
    bio: '从事家政工作7年，经验丰富，为人踏实勤劳。擅长家务整理、烹饪和照顾老人孩子。持有多项家政服务证书，深受雇主信赖。',
    skills: ['住家', '做饭', '保洁', '老人护理'],
    certifications: ['家政服务证书', '健康证', '育婴证']
  }
];

export const allCaregivers: Caregiver[] = [
  ...featuredCaregivers,
  {
    id: '5',
    name: '周阿姨',
    imageUrl: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg',
    city: '深圳',
    specialty: '月嫂',
    hourlyRate: 45,
    rating: 4.9,
    reviewCount: 143,
    experience: 12,
    bio: '专业月嫂，从事母婴护理工作12年。精通产妇护理、新生儿护理、产后恢复等。持有高级母婴护理证书，了解最新的育婴知识和技能。',
    skills: ['月嫂', '育婴', '做饭', '产妇护理'],
    certifications: ['高级母婴护理师', '催乳师证书', '健康证']
  },
  {
    id: '6',
    name: '刘阿姨',
    imageUrl: 'https://images.pexels.com/photos/3791664/pexels-photo-3791664.jpeg',
    city: '成都',
    specialty: '育儿嫂',
    hourlyRate: 35,
    rating: 4.7,
    reviewCount: 89,
    experience: 6,
    bio: '有6年育儿经验，擅长婴幼儿照护和早教。性格温和，有爱心，懂得科学育儿方法。持有育婴师证书，经常参加育儿知识培训。',
    skills: ['育婴', '早教', '做饭', '保洁'],
    certifications: ['育婴师证书', '早教证书', '健康证']
  },
  {
    id: '7',
    name: '孙阿姨',
    imageUrl: 'https://images.pexels.com/photos/3876366/pexels-photo-3876366.jpeg',
    city: '杭州',
    specialty: '钟点工',
    hourlyRate: 25,
    rating: 4.8,
    reviewCount: 112,
    experience: 4,
    bio: '专业提供小时工服务，包括家居清洁、整理收纳等。工作认真细致，注重效率。熟悉各类家电使用和清洁方法，有良好的服务意识。',
    skills: ['保洁', '收纳', '洗衣', '擦玻璃'],
    certifications: ['家政服务证书', '健康证']
  },
  {
    id: '8',
    name: '赵阿姨',
    imageUrl: 'https://images.pexels.com/photos/3876387/pexels-photo-3876387.jpeg',
    city: '重庆',
    specialty: '照护老人',
    hourlyRate: 32,
    rating: 4.6,
    reviewCount: 67,
    experience: 9,
    bio: '专注于老年人照护，有9年工作经验。了解老年人的生活习惯和心理需求，善于与老人沟通。可以提供专业的养老护理服务。',
    skills: ['老人护理', '做饭', '保洁', '康复护理'],
    certifications: ['养老护理证书', '健康证', '急救证书']
  }
];

export function getCaregiverById(id: string | undefined): Caregiver | undefined {
  if (!id) return undefined;
  return allCaregivers.find(caregiver => caregiver.id === id);
}