import React, { useState, useEffect } from "react";
import CustomSelect from "./ui/CustomSelect";
import { Send, Loader2, CheckCircle2, Mail } from "lucide-react";
import toast from "react-hot-toast";
import "./EventForm.css";

interface FormData {
  fullName: string;
  whatsappNumber: string;
  email: string;
  message: string;
  interest: string;
}

const INTEREST_OPTIONS = [
  { label: "VIP Table Reservation", value: "vip_table" },
  { label: "General Admission", value: "general" },
  { label: "Group Booking (>5 people)", value: "group" },
  { label: "Corporate Event", value: "corporate" },
  { label: "Sponsorship Inquiry", value: "sponsor" },
  { label: "List your events", value: "list_event" },
];

type SubmitStatus = "idle" | "saving" | "sending" | "success";

const EventForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    whatsappNumber: "",
    email: "",
    message: "",
    interest: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [emailSent, setEmailSent] = useState<boolean | null>(null);

  // Clean up timer if component unmounts
  useEffect(() => {
    return () => {};
  }, []);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp Number is required";
    } else if (
      !/^\d{10,}$/.test(formData.whatsappNumber.replace(/[^0-9]/g, ""))
    ) {
      newErrors.whatsappNumber = "Enter a valid 10-digit number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.interest) newErrors.interest = "Please select an option";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, interest: value }));
    if (errors.interest) {
      setErrors((prev) => ({ ...prev, interest: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStatus("saving");

      // Simulate state progression for better UX
      // The API call usually takes 1-2s. We show "Saving" first, then switch to "Sending"
      // to give the user feedback that multiple steps are happening.
      const stateTimer = setTimeout(() => {
        setStatus((prev) => (prev === "saving" ? "sending" : prev));
      }, 1500);

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        // Safe JSON parsing
        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.indexOf("application/json") !== -1) {
          data = await response.json();
        } else {
          const text = await response.text();
          throw new Error(response.statusText || "Server error occurred");
        }

        if (!response.ok) {
          throw new Error(data.error || "Failed to register");
        }

        clearTimeout(stateTimer);
        // Primary: DB saved. Secondary: email may or may not have been sent.
        setStatus("success");
        // Show primary success toast for DB save
        toast.success("Registration saved to database.");

        // Show email status toast if backend provided it
        if (typeof data.emailSent !== "undefined") {
          setEmailSent(Boolean(data.emailSent));
          if (data.emailSent) {
            toast.success("Confirmation email sent to your address.");
          } else {
            const msg = data.emailError || "Failed to send confirmation email.";
            toast.error(`Confirmation email not sent: ${msg}`);
          }
        } else {
          setEmailSent(null);
        }
      } catch (error: any) {
        clearTimeout(stateTimer);
        setStatus("idle");
        console.error("Submission error:", error);
        toast.error(error.message || "Something went wrong. Please try again.");
      }
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  if (status === "success") {
    return (
      <div className="success-container">
        <div className="success-icon-bg">
          <Send className="success-icon" />
        </div>
        <h3 className="success-title">Request Sent!</h3>
        <p className="success-desc">
          Thanks for reaching out, {formData.fullName.split(" ")[0]}.<br />
          {emailSent ? (
            <>We've sent a confirmation email to <strong>{formData.email}</strong>.</>
          ) : emailSent === false ? (
            <>
              Your registration is saved, but we couldn't send a confirmation email to <strong>{formData.email}</strong>.
            </>
          ) : (
            <>Your registration is saved. You will receive a confirmation if email delivery is available.</>
          )}
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setFormData({
              fullName: "",
              whatsappNumber: "",
              email: "",
              message: "",
              interest: "",
            });
            setEmailSent(null);
          }}
          className="reset-btn"
        >
          Send Another
        </button>
      </div>
    );
  }

  // Helper to render button content based on state
  const renderButtonContent = () => {
    switch (status) {
      case "saving":
        return (
          <>
            <Loader2 className="spinner" />
            Saving details...
          </>
        );
      case "sending":
        return (
          <>
            <Loader2 className="spinner" />
            Sending confirmation...
          </>
        );
      case "idle":
      default:
        return "Submit Request";
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2 className="form-title">Registration</h2>
        <p className="form-subtitle">Fill in the details below to proceed</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullName" className="input-label">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={status !== "idle"}
            className={`text-input ${errors.fullName ? "has-error" : ""}`}
          />
          {errors.fullName && <p className="error-msg">{errors.fullName}</p>}
        </div>

        {/* WhatsApp & Email Row */}
        <div className="form-row">
          <div>
            <label htmlFor="whatsappNumber" className="input-label">
              WhatsApp Number
            </label>
            <input
              type="tel"
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              disabled={status !== "idle"}
              className={`text-input ${errors.whatsappNumber ? "has-error" : ""}`}
            />
            {errors.whatsappNumber && (
              <p className="error-msg">{errors.whatsappNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="input-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              disabled={status !== "idle"}
              className={`text-input ${errors.email ? "has-error" : ""}`}
            />
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>
        </div>

        {/* Custom Select */}
        <div
          style={{
            pointerEvents: status !== "idle" ? "none" : "auto",
            opacity: status !== "idle" ? 0.7 : 1,
          }}
        >
          <CustomSelect
            label="Booking Type"
            options={INTEREST_OPTIONS}
            value={formData.interest}
            onChange={handleSelectChange}
            placeholder="Choose booking type"
            error={errors.interest}
          />
        </div>

        {/* Message */}
        <div className="form-group" style={{ marginBottom: "32px" }}>
          <label htmlFor="message" className="input-label">
            Message <span className="optional-text">(Optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder="Any special requests or queries..."
            disabled={status !== "idle"}
            className="text-area"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status !== "idle"}
          className="submit-btn"
        >
          {renderButtonContent()}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
