import { getCaregiverById } from '@/data/caregivers';

export function GET(request: Request, { params }: { params: { id: string } }) {
  const caregiver = getCaregiverById(params.id);

  if (!caregiver) {
    return new Response('Caregiver not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  return Response.json(caregiver);
}