const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const { bucket } = require("../config/firebaseConfig");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Upload image route
router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const file = req.file;
  const uniqueFileName = `${uuidv4()}-${Date.now()}${path.extname(
    file.originalname
  )}`;
  const fileUpload = bucket.file(uniqueFileName);

  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  stream.on("error", (error) => {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Image upload failed", error });
  });

  stream.on("finish", async () => {
    try {
      await fileUpload.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      res.status(200).json({ message: "Image uploaded", imageUrl: publicUrl });
    } catch (error) {
      console.error("Making file public failed:", error);
      res.status(500).json({ message: "Failed to make image public", error });
    }
  });

  stream.end(file.buffer);
});

module.exports = router;
