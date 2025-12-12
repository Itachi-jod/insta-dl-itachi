const axios = require("axios");

// Pretty Print helper
function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

module.exports = async function (req, res) {
  const url = req.query.url;

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
    const apiURL = `https://reelsaver.vercel.app/api/video?postUrl=${encodeURIComponent(url)}`;

    const response = await axios.get(apiURL);

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
