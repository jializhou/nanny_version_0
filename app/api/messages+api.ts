import { messages } from '@/data/messages';

export function GET(request: Request) {
  const url = new URL(request.url);
  const unreadOnly = url.searchParams.get('unread') === 'true';

  let filteredMessages = [...messages];

  if (unreadOnly) {
    filteredMessages = filteredMessages.filter(message => !message.read);
  }

  return Response.json(filteredMessages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipientId, message } = body;

    if (!recipientId || !message) {
      return new Response('Missing required fields', {
        status: 400,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    // In a real app, this would save to a database
    const newMessage = {
      id: String(Date.now()),
      sender: 'Current User',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      lastMessage: message,
      timestamp: new Date(),
      read: true,
      online: true
    };

    return Response.json(newMessage);
  } catch (error) {
    return new Response('Invalid request body', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}