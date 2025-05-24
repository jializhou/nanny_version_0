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
    name: 'Emma Wilson',
    imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    city: 'New York',
    specialty: 'Nanny & Tutor',
    hourlyRate: 25,
    rating: 4.9,
    reviewCount: 128,
    experience: 5,
    bio: 'Dedicated childcare professional with 5 years of experience working with children of all ages. I specialize in educational activities and homework help. I am CPR certified and have a background in early childhood education.',
    skills: ['First Aid', 'Cooking', 'Homework Help', 'Arts & Crafts'],
    certifications: ['CPR Certified', 'Early Childhood Education', 'Water Safety']
  },
  {
    id: '2',
    name: 'Michael Chen',
    imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    city: 'Boston',
    specialty: 'Special Needs Care',
    hourlyRate: 30,
    rating: 4.8,
    reviewCount: 97,
    experience: 7,
    bio: 'Experienced special needs caregiver with 7 years of dedicated service. I have worked with children with various conditions including autism, ADHD, and physical disabilities. I focus on creating personalized care plans and activities.',
    skills: ['Special Needs', 'Sign Language', 'Medication Management', 'Behavior Management'],
    certifications: ['Special Education Certification', 'CPR/First Aid', 'ABA Therapy Training']
  },
  {
    id: '3',
    name: 'Sophia Rodriguez',
    imageUrl: 'https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg',
    city: 'Chicago',
    specialty: 'Multilingual Babysitter',
    hourlyRate: 22,
    rating: 4.7,
    reviewCount: 84,
    experience: 3,
    bio: 'Energetic and caring babysitter fluent in English, Spanish, and French. I love creating fun activities that also help children learn languages naturally. I have experience with children from 6 months to 12 years old.',
    skills: ['Multilingual', 'Educational Games', 'Music', 'Outdoor Activities'],
    certifications: ['Child Development Associate', 'Language Education', 'CPR Certified']
  },
  {
    id: '4',
    name: 'James Turner',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    city: 'Los Angeles',
    specialty: 'Active & Sports',
    hourlyRate: 28,
    rating: 4.6,
    reviewCount: 72,
    experience: 4,
    bio: 'Former physical education teacher now working as a nanny specializing in active lifestyles. I encourage outdoor play, sports, and physical activities while ensuring safety and fun. I\'m also experienced in meal preparation and homework help.',
    skills: ['Sports Coaching', 'Swimming', 'Healthy Cooking', 'First Aid'],
    certifications: ['Physical Education Degree', 'Lifeguard Certified', 'Nutrition Training']
  }
];

export const allCaregivers: Caregiver[] = [
  ...featuredCaregivers,
  {
    id: '5',
    name: 'Olivia Kim',
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    city: 'Seattle',
    specialty: 'Infant Care Specialist',
    hourlyRate: 32,
    rating: 4.9,
    reviewCount: 143,
    experience: 8,
    bio: 'Certified infant care specialist with over 8 years of experience. I specialize in newborn care, sleep training, and developmental activities for babies. I have extensive experience with twins and multiples as well.',
    skills: ['Newborn Care', 'Sleep Training', 'Breastfeeding Support', 'Developmental Activities'],
    certifications: ['Infant Care Specialist', 'Newborn CPR', 'Lactation Support']
  },
  {
    id: '6',
    name: 'Noah Martinez',
    imageUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    city: 'Denver',
    specialty: 'Homework Help & Tutoring',
    hourlyRate: 26,
    rating: 4.7,
    reviewCount: 89,
    experience: 5,
    bio: 'Former elementary school teacher now working as a nanny and tutor. I specialize in helping children with their schoolwork and developing strong study habits. I make learning fun and engaging!',
    skills: ['Tutoring', 'Reading', 'Math', 'Science Projects'],
    certifications: ['Teaching License', 'Elementary Education Degree', 'CPR Certified']
  },
  {
    id: '7',
    name: 'Isabella Smith',
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    city: 'Miami',
    specialty: 'Arts & Music',
    hourlyRate: 24,
    rating: 4.8,
    reviewCount: 76,
    experience: 3,
    bio: 'Creative and energetic nanny with a background in music and arts education. I love to encourage children\'s creativity through drawing, painting, music, and crafts. I also provide general childcare and light housekeeping.',
    skills: ['Music Lessons', 'Arts & Crafts', 'Creative Play', 'Cooking'],
    certifications: ['Arts Education', 'Music Theory', 'Child Development']
  },
  {
    id: '8',
    name: 'William Johnson',
    imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    city: 'Austin',
    specialty: 'After School Care',
    hourlyRate: 23,
    rating: 4.6,
    reviewCount: 67,
    experience: 4,
    bio: 'Reliable and punctual after-school caregiver. I can pick up children from school, help with homework, prepare healthy snacks, and supervise activities until parents return from work. I have a clean driving record and reliable transportation.',
    skills: ['Homework Help', 'Meal Prep', 'Driving', 'Outdoor Activities'],
    certifications: ['Driver Safety', 'CPR/First Aid', 'Food Handling']
  }
];

export function getCaregiverById(id: string | undefined): Caregiver | undefined {
  if (!id) return undefined;
  return allCaregivers.find(caregiver => caregiver.id === id);
}