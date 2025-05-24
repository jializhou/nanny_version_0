import { allCaregivers } from '@/data/caregivers';

export function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search')?.toLowerCase();
  const category = url.searchParams.get('category')?.toLowerCase();
  const minRate = Number(url.searchParams.get('minRate')) || 0;
  const maxRate = Number(url.searchParams.get('maxRate')) || Infinity;

  let filteredCaregivers = [...allCaregivers];

  if (search) {
    filteredCaregivers = filteredCaregivers.filter(
      caregiver => 
        caregiver.name.toLowerCase().includes(search) ||
        caregiver.specialty.toLowerCase().includes(search) ||
        caregiver.skills.some(skill => skill.toLowerCase().includes(search))
    );
  }

  if (category) {
    filteredCaregivers = filteredCaregivers.filter(
      caregiver => caregiver.specialty.toLowerCase().includes(category)
    );
  }

  filteredCaregivers = filteredCaregivers.filter(
    caregiver => 
      caregiver.hourlyRate >= minRate &&
      caregiver.hourlyRate <= maxRate
  );

  return Response.json(filteredCaregivers);
}