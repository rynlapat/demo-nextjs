import multer from "multer";
import cloudinary from "../../../cloudinary";

const upload = multer({ dest: "uploads/" });

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      upload.single("file")(req, res, async function (err) {
        if (err) {
          console.error("Error uploading file:", err);
          return res.status(400).json({ error: "Error uploading file" });
        }

        const file = req.file;

        if (!file) {
          return res.status(400).json({ error: "No file uploaded" });
        }

        const result = await cloudinary.uploader.upload(file.path);

        console.log("Uploaded image URL:", result.secure_url);

        return res.status(200).json({ url: result.secure_url });
      });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
