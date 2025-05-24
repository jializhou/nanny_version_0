import { getReviewsByCaregiver } from '@/data/reviews';

export function GET(request: Request) {
  const url = new URL(request.url);
  const caregiverId = url.searchParams.get('caregiverId');

  if (!caregiverId) {
    return new Response('Caregiver ID is required', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  const reviews = getReviewsByCaregiver(caregiverId);
  return Response.json(reviews);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { caregiverId, rating, text } = body;

    if (!caregiverId || !rating || !text) {
      return new Response('Missing required fields', {
        status: 400,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    // In a real app, this would save to a database
    const newReview = {
      id: String(Date.now()),
      caregiverId,
      reviewerId: 'current-user',
      reviewerName: 'Current User',
      reviewerImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      rating,
      text,
      date: new Date(),
      helpfulCount: 0
    };

    return Response.json(newReview);
  } catch (error) {
    return new Response('Invalid request body', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}