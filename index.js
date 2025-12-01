const axios = require("axios");

// Helper to send pretty JSON
function sendPretty(res, data, status = 200) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = status;
  res.end(JSON.stringify(data, null, 2)); // 2-space indentation
}

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return sendPretty(res, { success: false, message: "Method not allowed", author: "ItachiXD" }, 405);
  }

  const url = req.query.url;
  if (!url) {
    return sendPretty(res, { success: false, message: "Missing ?url=", author: "ItachiXD" }, 400);
  }

  try {
    const apiUrl = `https://alin-one-downloader-9nly.vercel.app/api/reels%20Downloader?url=${encodeURIComponent(url)}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
        Referer: "https://alin-one-downloader-9nly.vercel.app/",
        Origin: "https://alin-one-downloader-9nly.vercel.app"
      },
      timeout: 20000
    });

    return sendPretty(res, {
      success: true,
      author: "ItachiXD",
      data: response.data
    });
  } catch (err) {
    return sendPretty(res, {
      success: false,
      author: "ItachiXD",
      message: "Upstream API failed",
      error: err.message,
      details: err.response?.data || null
    }, 500);
  }
};
