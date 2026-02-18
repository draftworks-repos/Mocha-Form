const mongoose = require("mongoose");
const { Resend } = require("resend");

// Initialize the cached connection variable
let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in environment variables");
  }

  const opts = { bufferCommands: false };
  const db = await mongoose.connect(process.env.MONGO_URI, opts);
  cachedDb = db;
  return db;
};

// Define Schema
const registrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  email: { type: String, required: true },
  interest: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

// Initialize Resend
// WARNING: It is strictly recommended to use process.env.RESEND_API_KEY
// The fallback string is provided based on user request but should be moved to env vars.
const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

module.exports = async (req, res) => {
  // CORS Middleware
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // 1. Connect to Database
    await connectToDatabase();

    const { fullName, whatsappNumber, email, interest, message } = req.body;

    if (!fullName || !whatsappNumber || !email || !interest) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 2. Save to MongoDB (Critical Step)
    const newRegistration = new Registration({
      fullName,
      whatsappNumber,
      email,
      interest,
      message,
    });

    const savedDoc = await newRegistration.save();
    console.log(`Registration saved with ID: ${savedDoc._id}`);

    // 3. Send Thank You Email via Resend (Fail-safe Step)
    // Wrapped in try/catch so database success is not affected by email failure
    try {
      const emailResponse = await resend.emails.send({
        from: "Mocha Event <onboarding@resend.dev>", // Default Resend test domain
        to: email, // Valid only if 'to' is your verified email in Resend free tier, or domain is verified
        subject: "Mocha Event - Registration Confirmed",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #1C1C1C;">Registration Confirmed</h2>
            <p>Hi <strong>${fullName}</strong>,</p>
            <p>Thank you for registering for the <strong>Mocha Mono Vol. 2</strong> event. We have successfully received your details.</p>
            
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Interest:</strong> ${interest}</p>
              <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Email:</strong> ${email}</p>
            </div>

            <p>We will review your request and get back to you shortly with further details.</p>
            
            <p style="margin-top: 30px; font-size: 12px; color: #999;">
              Mocha by Scale Media<br>
              Kolkata, West Bengal
            </p>
          </div>
        `,
      });
      console.log("Resend Email ID:", emailResponse.data?.id);
    } catch (emailError) {
      // Log error but do NOT fail the request
      console.error("Resend Email Error:", emailError);
    }

    // 4. Return Success
    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
