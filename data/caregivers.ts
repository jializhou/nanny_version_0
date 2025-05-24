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
  startTime: string;
  available: boolean;
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
    available: true,
    images: {
      cooking: 'https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg',
      childcare: 'https://images.pexels.com/photos/3875225/pexels-photo-3875225.jpeg',
      cleaning: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg'
    }
  },
  // ... rest of the caregivers data