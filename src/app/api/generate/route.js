import clientPromise from "@/lib/mongodb";

function generateRandomSlug(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let slug = '';
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.url) {
      return Response.json(
        { success: false, error: true, message: 'URL is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('linker_db');
    const collection = db.collection('url');
    
    console.log('MongoDB connected, db:', db.databaseName, 'collection:', collection.collectionName);

    let slug = body.shorturl?.trim();

    if (slug) {
      // Validate custom slug characters (alphanumeric, hyphens, underscores)
      const slugRegex = /^[a-zA-Z0-9-_]+$/;
      if (!slugRegex.test(slug)) {
        return Response.json(
          { success: false, error: true, message: 'Custom slug must contain only alphanumeric characters, hyphens, and underscores' },
          { status: 400 }
        );
      }

      // Check if custom slug is already taken
      const existing = await collection.findOne({ shorturl: slug });
      if (existing) {
        return Response.json(
          { success: false, error: true, message: 'This custom slug is already in use. Please try another one.' },
          { status: 400 }
        );
      }
    } else {
      // Generate a unique random slug
      let attempts = 0;
      while (attempts < 10) {
        slug = generateRandomSlug(6);
        const existing = await collection.findOne({ shorturl: slug });
        if (!existing) {
          break;
        }
        attempts++;
      }
      if (attempts >= 10) {
        return Response.json(
          { success: false, error: true, message: 'Failed to generate a unique slug. Please try again.' },
          { status: 500 }
        );
      }
    }

    const newUrl = {
      url: body.url.trim(),
      shorturl: slug,
      clicks: 0,
      createdAt: new Date()
    };

    await collection.insertOne(newUrl);

    return Response.json({
      success: true,
      error: false,
      message: 'URL generated successfully',
      data: newUrl
    });
  } catch (error) {
    console.error('POST /api/generate Error:', error);
    return Response.json(
      { success: false, error: true, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('linker_db');
    const collection = db.collection('url');
    
    console.log('MongoDB connected, db:', db.databaseName, 'collection:', collection.collectionName);

    // Fetch the 10 most recently shortened URLs
    const urls = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    return Response.json({
      success: true,
      error: false,
      urls
    });
  } catch (error) {
    console.error('GET /api/generate Error:', error);
    return Response.json(
      { success: false, error: true, message: error.message },
      { status: 500 }
    );
  }
}