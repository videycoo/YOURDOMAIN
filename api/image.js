export default async function handler(req, res) {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).send("Image URL missing");
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "facebookexternalhit/1.1",
        "Accept": "image/*"
      }
    });

    if (!response.ok) {
      return res.status(404).send("Failed to fetch image");
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(buffer);
  } catch (err) {
    return res.status(500).send("Server error");
  }
}
