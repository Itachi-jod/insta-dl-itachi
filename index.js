const axios = require("axios");

// -------------------------------------
// Pretty Print helper
// -------------------------------------
function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

module.exports = async function (req, res) {
  // Force JSON output
  res.setHeader("Content-Type", "application/json");

  const url = req.query.url;

  // -------------------------------------
  // Missing URL Parameter
  // -------------------------------------
  if (!url) {
    return res.status(400).send(
      pretty({
        author: "ItachiXD",
        success: false,
        message: "Missing ?url parameter"
      })
    );
  }

  try {
    // Instagram API
    const apiURL = `https://reelsaver.vercel.app/api/video?postUrl=${encodeURIComponent(
      url
    )}`;

    const response = await axios.get(apiURL);

    // -------------------------------------
    // Success Response
    // -------------------------------------
    return res.status(200).send(
      pretty({
        author: "ItachiXD",
        success: true,
        platform: "Instagram",
        data: response.data.result || response.data
      })
    );
  } catch (err) {
    console.error("Download error:", err.response?.data || err.message);

    // -------------------------------------
    // Error Response (Pretty)
    // -------------------------------------
    return res.status(500).send(
      pretty({
        author: "ItachiXD",
        success: false,
        message: "Failed to fetch Instagram Post/Reel",
        details: err.response?.data || err.message
      })
    );
  }
};
