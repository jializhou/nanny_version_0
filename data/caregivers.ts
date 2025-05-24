interface Caregiver {
  id: string;
  name: string;
  imageUrl: string;
  city: string;
  hometown: string;
  age: number;
  specialty: string;
  monthlySalary: number;
  rating: number;
  reviewCount: number;
  experience: number;
  bio: string;
  skills: string[];
  certifications: string[];
  shortBio: string;
  startTime: string; // Added field for earliest start time
  images?: {
    cooking?: string;
    childcare?: string;
    cleaning?: string;
  };
}

export const featuredCaregivers: Caregiver[] = [
  {
    id: '1',
    name: '王淑芳',
    imageUrl: 'https://images.pexels.com/photos/3768167/pexels-photo-3768167.jpeg',
    city: '武汉',
    hometown: '湖北武汉',
    age: 45,
    specialty: '育婴护理',
    monthlySalary: 8000,
    rating: 4.9,
    reviewCount: 128,
    experience: 8,
    bio: '从事育婴工作8年，有丰富的育儿经验。擅长新生儿护理、辅食制作和早教活动。持有育婴师证书和健康证。性格温和，有耐心，深受家长和宝宝的喜爱。最早开始时间：2025年6月下旬',
    shortBio: '性格温和，有耐心，擅长照顾新生儿和婴幼儿。经验丰富，持有多项专业证书。最早开始时间：2025年6月下旬',
    skills: ['育婴', '做饭', '早教', '月嫂'],
    certifications: ['育婴师证书', '健康证', '母婴护理证'],
    startTime: '2025年6月下旬',
    images: {
      cooking: 'https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg',
      childcare: 'https://images.pexels.com/photos/3875225/pexels-photo-3875225.jpeg',
      cleaning: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg'
    }
  },
  {
    id: '2',
    name: '张丽华',
    imageUrl: 'https://images.pexels.com/photos/3831612/pexels-photo-3831612.jpeg',
    city: '北京',
    hometown: '河北石家庄',
    age: 48,
    specialty: '老人护理',
    monthlySalary: 9500,
    rating: 4.8,
    reviewCount: 97,
    experience: 10,
    bio: '专业从事养老护理工作10年，对老年人的生活起居、康复护理有丰富经验。性格开朗，有爱心和耐心，擅长与老人沟通交流。持有养老护理证书。最早开始时间：2025年7月初',
    shortBio: '性格开朗，专注老年人护理，擅长沟通和康复护理。持有养老护理证书，经验丰富。最早开始时间：2025年7月初',
    skills: ['老人护理', '做饭', '保洁', '康复护理'],
    certifications: ['养老护理证书', '健康证', '急救证书'],
    startTime: '2025年7月初',
    images: {
      cooking: 'https://images.pexels.com/photos/4252138/pexels-photo-4252138.jpeg',
      cleaning: 'https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg'
    }
  },
  {
    id: '3',
    name: '李秀英',
    imageUrl: 'https://images.pexels.com/photos/3979287/pexels-photo-3979287.jpeg',
    city: '上海',
    hometown: '江苏南京',
    age: 42,
    specialty: '保洁做饭',
    monthlySalary: 7500,
    rating: 4.7,
    reviewCount: 84,
    experience: 5,
    bio: '有5年家政服务经验，擅长家居清洁和烹饪。了解各类清洁用品的使用方法，会制作各地特色菜品。工作认真负责，注重细节，有良好的职业道德。最早开始时间：2025年6月中旬',
    shortBio: '工作认真负责，擅长清洁和烹饪。了解各类清洁用品使用方法，会做多种菜品。最早开始时间：2025年6月中旬',
    skills: ['保洁', '做饭', '收纳整理', '日常护理'],
    certifications: ['家政服务证书', '健康证', '厨师证'],
    startTime: '2025年6月中旬',
    images: {
      cooking: 'https://images.pexels.com/photos/4252139/pexels-photo-4252139.jpeg',
      cleaning: 'https://images.pexels.com/photos/4108717/pexels-photo-4108717.jpeg'
    }
  },
  {
    id: '4',
    name: '陈玉兰',
    imageUrl: 'https://images.pexels.com/photos/3768114/pexels-photo-3768114.jpeg',
    city: '广州',
    hometown: '广东广州',
    age: 46,
    specialty: '住家保姆',
    monthlySalary: 8500,
    rating: 4.8,
    reviewCount: 76,
    experience: 7,
    bio: '从事家政工作7年，经验丰富，为人踏实勤劳。擅长家务整理、烹饪和照顾老人孩子。持有多项家政服务证书，深受雇主信赖。最早开始时间：2025年8月初',
    shortBio: '为人踏实勤劳，经验丰富。擅长家务整理、烹饪，可照顾老人和孩子。最早开始时间：2025年8月初',
    skills: ['住家', '做饭', '保洁', '老人护理'],
    certifications: ['家政服务证书', '健康证', '育婴证'],
    startTime: '2025年8月初',
    images: {
      cooking: 'https://images.pexels.com/photos/4252140/pexels-photo-4252140.jpeg',
      childcare: 'https://images.pexels.com/photos/3875226/pexels-photo-3875226.jpeg',
      cleaning: 'https://images.pexels.com/photos/4108718/pexels-photo-4108718.jpeg'
    }
  }
];

export const allCaregivers: Caregiver[] = [
  ...featuredCaregivers,
  {
    id: '5',
    name: '周桂芝',
    imageUrl: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg',
    city: '深圳',
    hometown: '湖南长沙',
    age: 50,
    specialty: '月嫂',
    monthlySalary: 12000,
    rating: 4.9,
    reviewCount: 143,
    experience: 12,
    bio: '专业月嫂，从事母婴护理工作12年。精通产妇护理、新生儿护理、产后恢复等。持有高级母婴护理证书，了解最新的育婴知识和技能。最早开始时间：2025年7月中旬',
    shortBio: '专业月嫂，精通产妇和新生儿护理。持有高级母婴护理证书，经验丰富。最早开始时间：2025年7月中旬',
    skills: ['月嫂', '育婴', '做饭', '产妇护理'],
    certifications: ['高级母婴护理师', '催乳师证书', '健康证'],
    startTime: '2025年7月中旬',
    images: {
      cooking: 'https://images.pexels.com/photos/4252141/pexels-photo-4252141.jpeg',
      childcare: 'https://images.pexels.com/photos/3875227/pexels-photo-3875227.jpeg'
    }
  },
  {
    id: '6',
    name: '刘春花',
    imageUrl: 'https://images.pexels.com/photos/3791664/pexels-photo-3791664.jpeg',
    city: '成都',
    hometown: '四川成都',
    age: 38,
    specialty: '育儿嫂',
    monthlySalary: 8000,
    rating: 4.7,
    reviewCount: 89,
    experience: 6,
    bio: '有6年育儿经验，擅长婴幼儿照护和早教。性格温和，有爱心，懂得科学育儿方法。持有育婴师证书，经常参加育儿知识培训。最早开始时间：2025年9月初',
    shortBio: '性格温和有爱心，擅长婴幼儿照护和早教。持有育婴师证书，经验丰富。最早开始时间：2025年9月初',
    skills: ['育婴', '早教', '做饭', '保洁'],
    certifications: ['育婴师证书', '早教证书', '健康证'],
    startTime: '2025年9月初',
    images: {
      childcare: 'https://images.pexels.com/photos/3875228/pexels-photo-3875228.jpeg',
      cleaning: 'https://images.pexels.com/photos/4108719/pexels-photo-4108719.jpeg'
    }
  },
  {
    id: '7',
    name: '孙金凤',
    imageUrl: 'https://images.pexels.com/photos/3876366/pexels-photo-3876366.jpeg',
    city: '杭州',
    hometown: '浙江金华',
    age: 44,
    specialty: '钟点工',
    monthlySalary: 6000,
    rating: 4.8,
    reviewCount: 112,
    experience: 4,
    bio: '专业提供小时工服务，包括家居清洁、整理收纳等。工作认真细致，注重效率。熟悉各类家电使用和清洁方法，有良好的服务意识。最早开始时间：2025年6月初',
    shortBio: '工作认真细致，擅长家居清洁和收纳整理。熟悉各类家电使用和清洁方法。最早开始时间：2025年6月初',
    skills: ['保洁', '收纳', '洗衣', '擦玻璃'],
    certifications: ['家政服务证书', '健康证'],
    startTime: '2025年6月初',
    images: {
      cleaning: 'https://images.pexels.com/photos/4108720/pexels-photo-4108720.jpeg'
    }
  },
  {
    id: '8',
    name: '赵月琴',
    imageUrl: 'https://images.pexels.com/photos/3876387/pexels-photo-3876387.jpeg',
    city: '重庆',
    hometown: '重庆',
    age: 47,
    specialty: '照护老人',
    monthlySalary: 7500,
    rating: 4.6,
    reviewCount: 67,
    experience: 9,
    bio: '专注于老年人照护，有9年工作经验。了解老年人的生活习惯和心理需求，善于与老人沟通。可以提供专业的养老护理服务。最早开始时间：2025年8月中旬',
    shortBio: '专注老年人照护，了解老年人生活习惯和心理需求。善于沟通，经验丰富。最早开始时间：2025年8月中旬',
    skills: ['老人护理', '做饭', '保洁', '康复护理'],
    certifications: ['养老护理证书', '健康证', '急救证书'],
    startTime: '2025年8月中旬',
    images: {
      cooking: 'https://images.pexels.com/photos/4252142/pexels-photo-4252142.jpeg',
      cleaning: 'https://images.pexels.com/photos/4108721/pexels-photo-4108721.jpeg'
    }
  }
];

export function getCaregiverById(id: string | undefined): Caregiver | undefined {
  if (!id) return undefined;
  return allCaregivers.find(caregiver => caregiver.id === id);
}