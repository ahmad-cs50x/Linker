import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const client = await connectToDatabase();
    const db = client.db('linker_db');
    const collection = db.collection('url');

    // Find the URL record with the matching shorturl slug
    const record = await collection.findOne({ shorturl: slug });

    if (record) {
      // Increment clicks count
      await collection.updateOne(
        { _id: record._id },
        { $inc: { clicks: 1 } }
      );

      // Ensure the redirect URL has a protocol (http:// or https://)
      let targetUrl = record.url;
      if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl;
      }

      return Response.redirect(targetUrl, 307);
    }
  } catch (error) {
    console.error('Redirection error:', error);
  }

  // If slug is not found or an error occurs, fallback and redirect to home
  return Response.redirect(new URL('/', request.url), 307);
}

