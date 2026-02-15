import { useState, useEffect, useRef, useCallback } from "react";

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icons = {
  Heart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  ),
  Activity: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  Brain: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4 7.5L12 22l3-5.5c2-2 4-4.5 4-7.5a7 7 0 0 0-7-7z"/>
      <circle cx="12" cy="9" r="3"/>
    </svg>
  ),
  FileText: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  User: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Moon: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  Sun: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Download: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Copy: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  Save: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  ),
  Lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Stethoscope: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>
    </svg>
  ),
  Clock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Clipboard: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
};

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const mockPreviousReports = [
  { id: 1, patientName: "Sarah Johnson", date: "2026-02-14", diagnosis: "Upper Respiratory Infection", status: "Completed" },
  { id: 2, patientName: "Michael Chen", date: "2026-02-13", diagnosis: "Type 2 Diabetes - Follow-up", status: "Completed" },
  { id: 3, patientName: "Emily Rodriguez", date: "2026-02-12", diagnosis: "Acute Gastritis", status: "Pending Review" },
  { id: 4, patientName: "James Wilson", date: "2026-02-11", diagnosis: "Hypertension Management", status: "Completed" },
  { id: 5, patientName: "Aisha Patel", date: "2026-02-10", diagnosis: "Migraine with Aura", status: "Completed" },
];

const mockAnalysisResult = {
  diagnoses: [
    { name: "Acute Bronchitis", probability: 78, description: "Inflammation of the bronchial tubes, commonly caused by viral infection." },
    { name: "Community-Acquired Pneumonia", probability: 45, description: "Lung infection acquired outside of a hospital setting." },
    { name: "Allergic Rhinitis", probability: 30, description: "Inflammation of the nasal passages due to allergens." },
  ],
  labTests: [
    "Complete Blood Count (CBC)",
    "C-Reactive Protein (CRP)",
    "Chest X-Ray (PA view)",
    "Sputum Culture & Sensitivity",
  ],
  redFlags: [
    "Patient reports persistent fever >38.5°C for 5 days",
    "Oxygen saturation should be monitored",
  ],
  nextSteps: [
    "Prescribe broad-spectrum antibiotics pending culture results",
    "Schedule follow-up in 48-72 hours",
    "Advise adequate hydration and rest",
    "Consider referral to pulmonology if no improvement in 7 days",
  ],
};

const painLocations = [
  "Head", "Neck", "Chest", "Upper Back", "Lower Back",
  "Left Arm", "Right Arm", "Abdomen", "Left Leg", "Right Leg",
  "Left Shoulder", "Right Shoulder", "Throat", "Pelvis", "Joints (Multiple)"
];

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // Form state
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "", age: "", gender: "", weight: "", height: "",
    allergies: "", medications: "",
    chronicDiseases: "", surgeries: "", familyHistory: "",
    symptoms: "", duration: "", severity: 5, fever: "No",
    painLocation: "", notes: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [analysisState, setAnalysisState] = useState("idle"); // idle, loading, done
  const [analysisResult, setAnalysisResult] = useState(null);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const theme = darkMode ? "dark" : "light";

  const navigate = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === "doctor@medai.com" && loginForm.password === "password") {
      setIsLoggedIn(true);
      setLoginError("");
      navigate("dashboard");
    } else if (loginForm.email && loginForm.password) {
      // Accept any credentials for demo
      setIsLoggedIn(true);
      setLoginError("");
      navigate("dashboard");
    } else {
      setLoginError("Please enter your credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormStep(0);
    setAnalysisState("idle");
    setAnalysisResult(null);
    setReportGenerated(false);
    navigate("landing");
  };

  const validateStep = (step) => {
    const errors = {};
    if (step === 0) {
      if (!formData.fullName.trim()) errors.fullName = "Required";
      if (!formData.age || formData.age < 0 || formData.age > 150) errors.age = "Valid age required";
      if (!formData.gender) errors.gender = "Required";
    }
    if (step === 2) {
      if (!formData.symptoms.trim()) errors.symptoms = "Please describe symptoms";
      if (!formData.duration.trim()) errors.duration = "Duration required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(Math.min(formStep + 1, 2));
    }
  };

  const prevStep = () => setFormStep(Math.max(formStep - 1, 0));

  const submitForm = () => {
    if (!validateStep(2)) return;
    setAnalysisState("loading");
    navigate("analysis");
    setTimeout(() => {
      setAnalysisResult(mockAnalysisResult);
      setAnalysisState("done");
    }, 3500);
  };

  const generateReport = () => {
    setReportGenerated(true);
    navigate("report");
  };

  const copyReport = () => {
    const reportText = buildReportText();
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buildReportText = () => {
    return `
MEDICAL REPORT
══════════════════════════════════════
Generated: ${new Date().toLocaleDateString()}

PATIENT INFORMATION
──────────────────
Name: ${formData.fullName}
Age: ${formData.age} | Gender: ${formData.gender}
Weight: ${formData.weight || "N/A"} kg | Height: ${formData.height || "N/A"} cm
Allergies: ${formData.allergies || "None reported"}
Current Medications: ${formData.medications || "None reported"}

MEDICAL HISTORY
──────────────────
Chronic Diseases: ${formData.chronicDiseases || "None reported"}
Previous Surgeries: ${formData.surgeries || "None reported"}
Family History: ${formData.familyHistory || "None reported"}

PRESENTING SYMPTOMS
──────────────────
${formData.symptoms}
Duration: ${formData.duration}
Severity: ${formData.severity}/10
Fever: ${formData.fever}
Pain Location: ${formData.painLocation || "Not specified"}
Additional Notes: ${formData.notes || "None"}

AI DIFFERENTIAL DIAGNOSIS
──────────────────
${analysisResult?.diagnoses.map((d, i) => `${i + 1}. ${d.name} (${d.probability}% probability)`).join("\n")}

RECOMMENDED INVESTIGATIONS
──────────────────
${analysisResult?.labTests.map((t, i) => `${i + 1}. ${t}`).join("\n")}

CLINICAL NOTES
──────────────────
${clinicalNotes || "No additional notes."}

──────────────────
Doctor Signature: ________________________
Date: ${new Date().toLocaleDateString()}

DISCLAIMER: This AI-generated report assists clinical decision-making and does not replace professional medical judgment.
    `.trim();
  };

  const filteredReports = mockPreviousReports.filter(r =>
    r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ─── STYLES ──────────────────────────────────────────────────────────────
  const colors = darkMode ? {
    bg: "#0f1117", bgCard: "#1a1d27", bgSecondary: "#252836",
    text: "#e8eaf0", textMuted: "#8b8fa3", textLight: "#6b7085",
    primary: "#4da6ff", primaryHover: "#3d96ef", primaryLight: "rgba(77,166,255,0.12)",
    accent: "#38d9a9", danger: "#ff6b6b", dangerBg: "rgba(255,107,107,0.1)",
    warning: "#ffd43b", warningBg: "rgba(255,212,59,0.1)",
    border: "#2d3148", borderLight: "#22253a",
    gradient: "linear-gradient(135deg, #1a1d27 0%, #0f1117 100%)",
    heroGradient: "linear-gradient(160deg, #0f1117 0%, #1a2332 50%, #0f1117 100%)",
    shadow: "0 4px 24px rgba(0,0,0,0.4)",
  } : {
    bg: "#f5f7fb", bgCard: "#ffffff", bgSecondary: "#f0f4f8",
    text: "#1a2332", textMuted: "#5a6a7e", textLight: "#8896a6",
    primary: "#2b7de9", primaryHover: "#1b6dd9", primaryLight: "rgba(43,125,233,0.08)",
    accent: "#0ca678", danger: "#e03131", dangerBg: "rgba(224,49,49,0.06)",
    warning: "#e67700", warningBg: "rgba(230,119,0,0.06)",
    border: "#e2e8f0", borderLight: "#edf2f7",
    gradient: "linear-gradient(135deg, #ffffff 0%, #f5f7fb 100%)",
    heroGradient: "linear-gradient(160deg, #f5f7fb 0%, #e8f4fd 50%, #f5f7fb 100%)",
    shadow: "0 4px 24px rgba(0,0,0,0.06)",
  };

  const baseStyles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Instrument+Serif&display=swap');
    
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: 'DM Sans', -apple-system, sans-serif;
      background: ${colors.bg};
      color: ${colors.text};
      transition: background 0.3s, color 0.3s;
      overflow-x: hidden;
    }

    ::selection { background: ${colors.primary}; color: white; }

    input, textarea, select {
      font-family: 'DM Sans', -apple-system, sans-serif;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(1.1); }
      50% { transform: scale(1); }
      75% { transform: scale(1.05); }
    }
    @keyframes progressFill {
      from { width: 0%; }
      to { width: var(--target-width); }
    }
    @keyframes dotPulse {
      0%, 80%, 100% { transform: scale(0); opacity: 0; }
      40% { transform: scale(1); opacity: 1; }
    }
  `;

  // ─── COMPONENT: NAV ────────────────────────────────────────────────────
  const Navbar = () => (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: darkMode ? "rgba(15,17,23,0.85)" : "rgba(255,255,255,0.85)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderBottom: `1px solid ${colors.border}`,
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => navigate(isLoggedIn ? "dashboard" : "landing")}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
            <Icons.Stethoscope />
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>Med<span style={{ color: colors.primary }}>AI</span></span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="desktop-nav">
          {isLoggedIn && (
            <>
              <NavBtn onClick={() => navigate("dashboard")} active={currentPage === "dashboard"}>Dashboard</NavBtn>
              <NavBtn onClick={() => navigate("consultation")} active={currentPage === "consultation"}>New Consultation</NavBtn>
            </>
          )}
          <button onClick={() => setDarkMode(!darkMode)} style={{
            width: 40, height: 40, borderRadius: 10, border: `1px solid ${colors.border}`,
            background: colors.bgCard, color: colors.textMuted, display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", transition: "all 0.2s",
          }}>
            {darkMode ? <Icons.Sun /> : <Icons.Moon />}
          </button>
          {isLoggedIn ? (
            <button onClick={handleLogout} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
              borderRadius: 10, border: `1px solid ${colors.border}`, background: "transparent",
              color: colors.textMuted, cursor: "pointer", fontSize: 14, fontWeight: 500,
              transition: "all 0.2s",
            }}>
              <Icons.LogOut /> Sign Out
            </button>
          ) : (
            <button onClick={() => navigate("login")} style={{
              padding: "8px 20px", borderRadius: 10, border: "none",
              background: colors.primary, color: "white", cursor: "pointer",
              fontSize: 14, fontWeight: 600, transition: "all 0.2s",
            }}>
              Sign In
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{
          display: "none", width: 40, height: 40, borderRadius: 10,
          border: `1px solid ${colors.border}`, background: colors.bgCard,
          color: colors.text, alignItems: "center", justifyContent: "center", cursor: "pointer",
        }} className="mobile-menu-btn">
          {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div style={{
          position: "absolute", top: 64, left: 0, right: 0,
          background: colors.bgCard, borderBottom: `1px solid ${colors.border}`,
          padding: 16, display: "flex", flexDirection: "column", gap: 8,
          animation: "fadeIn 0.2s ease",
        }} className="mobile-menu">
          {isLoggedIn && (
            <>
              <MobileNavBtn onClick={() => navigate("dashboard")}>Dashboard</MobileNavBtn>
              <MobileNavBtn onClick={() => navigate("consultation")}>New Consultation</MobileNavBtn>
            </>
          )}
          <MobileNavBtn onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </MobileNavBtn>
          {isLoggedIn ? (
            <MobileNavBtn onClick={handleLogout}>Sign Out</MobileNavBtn>
          ) : (
            <MobileNavBtn onClick={() => navigate("login")}>Sign In</MobileNavBtn>
          )}
        </div>
      )}
    </nav>
  );

  const NavBtn = ({ children, onClick, active }) => (
    <button onClick={onClick} style={{
      padding: "8px 16px", borderRadius: 10, border: "none",
      background: active ? colors.primaryLight : "transparent",
      color: active ? colors.primary : colors.textMuted,
      cursor: "pointer", fontSize: 14, fontWeight: 500,
      transition: "all 0.2s",
    }}>
      {children}
    </button>
  );

  const MobileNavBtn = ({ children, onClick }) => (
    <button onClick={onClick} style={{
      width: "100%", padding: "12px 16px", borderRadius: 10, border: "none",
      background: colors.bgSecondary, color: colors.text,
      cursor: "pointer", fontSize: 14, fontWeight: 500, textAlign: "left",
    }}>
      {children}
    </button>
  );

  // ─── SHARED COMPONENTS ──────────────────────────────────────────────────
  const Card = ({ children, style: s, ...props }) => (
    <div style={{
      background: colors.bgCard, borderRadius: 16, border: `1px solid ${colors.border}`,
      boxShadow: colors.shadow, transition: "all 0.3s", ...s,
    }} {...props}>
      {children}
    </div>
  );

  const PrimaryButton = ({ children, onClick, disabled, style: s, variant = "primary" }) => (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "12px 28px", borderRadius: 12, border: "none",
      background: variant === "primary"
        ? `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
        : variant === "outline" ? "transparent" : colors.bgSecondary,
      color: variant === "primary" ? "white" : variant === "outline" ? colors.primary : colors.text,
      border: variant === "outline" ? `2px solid ${colors.primary}` : "none",
      cursor: disabled ? "not-allowed" : "pointer",
      fontSize: 15, fontWeight: 600, transition: "all 0.3s",
      opacity: disabled ? 0.5 : 1,
      display: "inline-flex", alignItems: "center", gap: 8,
      ...s,
    }}>
      {children}
    </button>
  );

  const InputField = ({ label, error, ...props }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.02em", textTransform: "uppercase" }}>{label}</label>}
      <input {...props} style={{
        padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${error ? colors.danger : colors.border}`,
        background: colors.bgSecondary, color: colors.text, fontSize: 15, outline: "none",
        transition: "all 0.2s", width: "100%",
        ...(props.style || {}),
      }} />
      {error && <span style={{ fontSize: 12, color: colors.danger }}>{error}</span>}
    </div>
  );

  const SelectField = ({ label, options, error, ...props }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.02em", textTransform: "uppercase" }}>{label}</label>}
      <select {...props} style={{
        padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${error ? colors.danger : colors.border}`,
        background: colors.bgSecondary, color: colors.text, fontSize: 15, outline: "none",
        transition: "all 0.2s", width: "100%", appearance: "auto",
      }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <span style={{ fontSize: 12, color: colors.danger }}>{error}</span>}
    </div>
  );

  const TextArea = ({ label, error, ...props }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.02em", textTransform: "uppercase" }}>{label}</label>}
      <textarea {...props} style={{
        padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${error ? colors.danger : colors.border}`,
        background: colors.bgSecondary, color: colors.text, fontSize: 15, outline: "none",
        transition: "all 0.2s", width: "100%", minHeight: 100, resize: "vertical",
        fontFamily: "'DM Sans', sans-serif",
      }} />
      {error && <span style={{ fontSize: 12, color: colors.danger }}>{error}</span>}
    </div>
  );

  // ─── PAGE: LANDING ────────────────────────────────────────────────────
  const LandingPage = () => (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: colors.heroGradient, position: "relative", overflow: "hidden",
        padding: "100px 24px 60px",
      }}>
        {/* Background pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: darkMode ? 0.03 : 0.04,
          backgroundImage: `radial-gradient(${colors.primary} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        {/* Glow */}
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.primary}15, transparent 70%)`,
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 800, textAlign: "center", position: "relative", zIndex: 1, animation: "fadeInUp 0.8s ease" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px",
            borderRadius: 100, background: colors.primaryLight, border: `1px solid ${colors.primary}30`,
            fontSize: 13, fontWeight: 600, color: colors.primary, marginBottom: 32,
          }}>
            <Icons.Shield /> HIPAA Compliant · Secure · AI-Powered
          </div>
          <h1 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(36px, 6vw, 68px)", lineHeight: 1.1,
            fontWeight: 400, marginBottom: 24, letterSpacing: "-0.02em",
          }}>
            AI-Powered Medical Assistant for{" "}
            <span style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Smarter Diagnoses</span>
          </h1>
          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)", color: colors.textMuted,
            lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px",
          }}>
            Collect patient data, analyze symptoms, generate differential diagnoses, and create structured medical reports — all powered by advanced AI, designed for clinicians.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <PrimaryButton onClick={() => navigate("login")} style={{ padding: "16px 36px", fontSize: 16 }}>
              Start Consultation <Icons.ChevronRight />
            </PrimaryButton>
            <PrimaryButton variant="outline" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "16px 36px", fontSize: 16 }}>
              Learn More
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{
        padding: "100px 24px", maxWidth: 1200, margin: "0 auto",
      }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, marginBottom: 16,
          }}>
            Built for Clinical Excellence
          </h2>
          <p style={{ color: colors.textMuted, fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
            Every feature designed with practicing physicians in mind.
          </p>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}>
          {[
            { icon: <Icons.Clipboard />, title: "Smart Data Collection", desc: "Structured multi-step forms capture comprehensive patient data efficiently." },
            { icon: <Icons.Activity />, title: "AI Symptom Analysis", desc: "Advanced algorithms analyze symptoms and suggest differential diagnoses." },
            { icon: <Icons.FileText />, title: "Report Generation", desc: "Generate detailed, structured medical reports ready for clinical use." },
            { icon: <Icons.Shield />, title: "HIPAA Compliant", desc: "Enterprise-grade security ensures all patient data remains protected." },
          ].map((f, i) => (
            <Card key={i} style={{
              padding: 32, animation: `fadeInUp 0.6s ease ${i * 0.1}s both`,
              cursor: "default",
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: colors.primary, marginBottom: 20,
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: colors.textMuted, fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Privacy Notice */}
      <section style={{
        padding: "60px 24px 100px", maxWidth: 800, margin: "0 auto", textAlign: "center",
      }}>
        <Card style={{
          padding: "40px 32px",
          background: darkMode ? "rgba(77,166,255,0.06)" : "rgba(43,125,233,0.04)",
          border: `1px solid ${colors.primary}20`,
        }}>
          <Icons.Lock />
          <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 16, marginBottom: 12 }}>Data Privacy & HIPAA Compliance</h3>
          <p style={{ color: colors.textMuted, fontSize: 14, lineHeight: 1.8, maxWidth: 600, margin: "0 auto" }}>
            MedAI adheres to HIPAA regulations and industry best practices for handling protected health information (PHI). All data is encrypted in transit and at rest. Access is restricted to authorized healthcare professionals only. No patient data is used for AI training.
          </p>
        </Card>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: `1px solid ${colors.border}`, padding: "32px 24px",
        textAlign: "center", color: colors.textLight, fontSize: 13,
      }}>
        © 2026 MedAI. All rights reserved. This tool does not replace professional medical judgment.
      </footer>
    </div>
  );

  // ─── PAGE: LOGIN ──────────────────────────────────────────────────────
  const LoginPage = () => (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: colors.heroGradient, padding: "100px 24px 60px",
    }}>
      <Card style={{
        width: "100%", maxWidth: 420, padding: "48px 36px",
        animation: "fadeInUp 0.6s ease",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: "0 auto 20px",
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            display: "flex", alignItems: "center", justifyContent: "center", color: "white",
          }}>
            <Icons.Lock />
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, fontWeight: 400, marginBottom: 8 }}>Welcome Back</h2>
          <p style={{ color: colors.textMuted, fontSize: 14 }}>Sign in to access your medical dashboard</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <InputField
            label="Email"
            type="email"
            placeholder="doctor@hospital.com"
            value={loginForm.email}
            onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={loginForm.password}
            onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
          />
          {loginError && (
            <div style={{ color: colors.danger, fontSize: 13, textAlign: "center" }}>{loginError}</div>
          )}
          <PrimaryButton onClick={handleLogin} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
            Sign In
          </PrimaryButton>
        </form>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: colors.textLight }}>
          Demo credentials: any email & password
        </p>
      </Card>
    </div>
  );

  // ─── PAGE: DASHBOARD ──────────────────────────────────────────────────
  const DashboardPage = () => (
    <div style={{
      minHeight: "100vh", paddingTop: 88, padding: "88px 24px 60px",
      maxWidth: 1200, margin: "0 auto",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        marginBottom: 40, flexWrap: "wrap", gap: 16,
        animation: "fadeIn 0.5s ease",
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 400, marginBottom: 8,
          }}>
            Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}, Doctor
          </h1>
          <p style={{ color: colors.textMuted, fontSize: 15 }}>Here's an overview of your recent activity.</p>
        </div>
        <PrimaryButton onClick={() => { setFormStep(0); setAnalysisState("idle"); setAnalysisResult(null); setReportGenerated(false); setFormData({fullName:"",age:"",gender:"",weight:"",height:"",allergies:"",medications:"",chronicDiseases:"",surgeries:"",familyHistory:"",symptoms:"",duration:"",severity:5,fever:"No",painLocation:"",notes:""}); navigate("consultation"); }}>
          <Icons.Plus /> New Consultation
        </PrimaryButton>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 20, marginBottom: 40,
      }}>
        {[
          { label: "Total Patients", value: "1,248", icon: <Icons.User />, color: colors.primary },
          { label: "Reports Generated", value: "856", icon: <Icons.FileText />, color: colors.accent },
          { label: "This Week", value: "23", icon: <Icons.Activity />, color: "#e67700" },
          { label: "Pending Review", value: "4", icon: <Icons.Clock />, color: colors.danger },
        ].map((stat, i) => (
          <Card key={i} style={{
            padding: 24, animation: `fadeInUp 0.5s ease ${i * 0.08}s both`,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.03em" }}>{stat.label}</span>
              <div style={{ color: stat.color, opacity: 0.7 }}>{stat.icon}</div>
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card style={{ animation: "fadeInUp 0.6s ease 0.3s both" }}>
        <div style={{
          padding: "24px 28px", borderBottom: `1px solid ${colors.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Recent Patient Reports</h3>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, padding: "8px 14px",
            borderRadius: 10, border: `1px solid ${colors.border}`, background: colors.bgSecondary,
          }}>
            <Icons.Search />
            <input
              type="text" placeholder="Search patients..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              style={{
                border: "none", background: "transparent", color: colors.text,
                outline: "none", fontSize: 14, width: 180,
              }}
            />
          </div>
        </div>
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr>
                {["Patient", "Date", "Diagnosis", "Status"].map(h => (
                  <th key={h} style={{
                    padding: "14px 28px", textAlign: "left", fontSize: 12,
                    fontWeight: 600, color: colors.textLight, textTransform: "uppercase",
                    letterSpacing: "0.05em", borderBottom: `1px solid ${colors.border}`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((r, i) => (
                <tr key={r.id} style={{
                  borderBottom: `1px solid ${colors.borderLight}`,
                  transition: "background 0.15s",
                  cursor: "pointer",
                }}>
                  <td style={{ padding: "16px 28px", fontWeight: 500 }}>{r.patientName}</td>
                  <td style={{ padding: "16px 28px", color: colors.textMuted, fontSize: 14 }}>{r.date}</td>
                  <td style={{ padding: "16px 28px", fontSize: 14 }}>{r.diagnosis}</td>
                  <td style={{ padding: "16px 28px" }}>
                    <span style={{
                      padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                      background: r.status === "Completed" ? `${colors.accent}18` : `${colors.warning}18`,
                      color: r.status === "Completed" ? colors.accent : colors.warning,
                    }}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // ─── PAGE: CONSULTATION FORM ──────────────────────────────────────────
  const stepLabels = ["Basic Information", "Medical History", "Current Symptoms"];

  const ConsultationPage = () => (
    <div style={{
      minHeight: "100vh", paddingTop: 88, padding: "88px 24px 60px",
      maxWidth: 720, margin: "0 auto",
    }}>
      <div style={{ animation: "fadeIn 0.5s ease", marginBottom: 40 }}>
        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 400, marginBottom: 8,
        }}>
          Patient Consultation
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 15 }}>Collect comprehensive patient data for AI analysis.</p>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: 40, animation: "fadeIn 0.5s ease 0.1s both" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          {stepLabels.map((label, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              color: i <= formStep ? colors.primary : colors.textLight,
              fontSize: 13, fontWeight: i === formStep ? 600 : 400,
              transition: "all 0.3s",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700,
                background: i < formStep ? colors.primary : i === formStep ? colors.primaryLight : colors.bgSecondary,
                color: i < formStep ? "white" : i === formStep ? colors.primary : colors.textLight,
                border: i === formStep ? `2px solid ${colors.primary}` : "2px solid transparent",
                transition: "all 0.3s",
              }}>
                {i < formStep ? <Icons.Check /> : i + 1}
              </div>
              <span className="step-label">{label}</span>
            </div>
          ))}
        </div>
        <div style={{
          height: 4, borderRadius: 4, background: colors.bgSecondary, overflow: "hidden",
        }}>
          <div style={{
            height: "100%", borderRadius: 4,
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
            width: `${((formStep + 1) / 3) * 100}%`,
            transition: "width 0.5s ease",
          }} />
        </div>
      </div>

      <Card style={{ padding: "36px 32px", animation: "fadeIn 0.4s ease 0.2s both" }}>
        {formStep === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Basic Information</h3>
            <InputField label="Full Name" placeholder="Patient full name" value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })} error={formErrors.fullName} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <InputField label="Age" type="number" placeholder="Age" value={formData.age}
                onChange={e => setFormData({ ...formData, age: e.target.value })} error={formErrors.age} />
              <SelectField label="Gender" value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                options={[{ value: "", label: "Select..." }, { value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }]}
                error={formErrors.gender} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <InputField label="Weight (kg)" type="number" placeholder="kg" value={formData.weight}
                onChange={e => setFormData({ ...formData, weight: e.target.value })} />
              <InputField label="Height (cm)" type="number" placeholder="cm" value={formData.height}
                onChange={e => setFormData({ ...formData, height: e.target.value })} />
            </div>
            <InputField label="Known Allergies" placeholder="e.g., Penicillin, Latex..." value={formData.allergies}
              onChange={e => setFormData({ ...formData, allergies: e.target.value })} />
            <InputField label="Current Medications" placeholder="e.g., Metformin 500mg..." value={formData.medications}
              onChange={e => setFormData({ ...formData, medications: e.target.value })} />
          </div>
        )}

        {formStep === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Medical History</h3>
            <TextArea label="Chronic Diseases" placeholder="e.g., Type 2 Diabetes, Hypertension..."
              value={formData.chronicDiseases} onChange={e => setFormData({ ...formData, chronicDiseases: e.target.value })} />
            <TextArea label="Previous Surgeries" placeholder="e.g., Appendectomy 2018..."
              value={formData.surgeries} onChange={e => setFormData({ ...formData, surgeries: e.target.value })} />
            <TextArea label="Family Medical History" placeholder="e.g., Father - Heart Disease..."
              value={formData.familyHistory} onChange={e => setFormData({ ...formData, familyHistory: e.target.value })} />
          </div>
        )}

        {formStep === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Current Symptoms</h3>
            <TextArea label="Symptom Description" placeholder="Describe the patient's current symptoms in detail..."
              value={formData.symptoms} onChange={e => setFormData({ ...formData, symptoms: e.target.value })}
              error={formErrors.symptoms} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <InputField label="Duration" placeholder="e.g., 5 days" value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })} error={formErrors.duration} />
              <SelectField label="Fever" value={formData.fever}
                onChange={e => setFormData({ ...formData, fever: e.target.value })}
                options={[{ value: "No", label: "No" }, { value: "Yes", label: "Yes" }]} />
            </div>

            {/* Severity Slider */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Severity: <span style={{ color: formData.severity > 7 ? colors.danger : formData.severity > 4 ? colors.warning : colors.accent }}>{formData.severity}/10</span>
              </label>
              <input type="range" min="1" max="10" value={formData.severity}
                onChange={e => setFormData({ ...formData, severity: parseInt(e.target.value) })}
                style={{ width: "100%", accentColor: colors.primary }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: colors.textLight }}>
                <span>Mild</span><span>Moderate</span><span>Severe</span>
              </div>
            </div>

            <SelectField label="Pain Location" value={formData.painLocation}
              onChange={e => setFormData({ ...formData, painLocation: e.target.value })}
              options={[{ value: "", label: "Select location..." }, ...painLocations.map(p => ({ value: p, label: p }))]} />

            <TextArea label="Additional Notes" placeholder="Any other observations or context..."
              value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
          </div>
        )}

        {/* Navigation */}
        <div style={{
          display: "flex", justifyContent: "space-between", marginTop: 32,
          paddingTop: 24, borderTop: `1px solid ${colors.border}`,
        }}>
          <PrimaryButton variant="ghost" onClick={prevStep} disabled={formStep === 0}>
            <Icons.ChevronLeft /> Back
          </PrimaryButton>
          {formStep < 2 ? (
            <PrimaryButton onClick={nextStep}>
              Next <Icons.ChevronRight />
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={submitForm}>
              <Icons.Activity /> Analyze Symptoms
            </PrimaryButton>
          )}
        </div>
      </Card>

      {/* JSON Output Preview */}
      <Card style={{ marginTop: 24, padding: 20, animation: "fadeIn 0.4s ease 0.3s both" }}>
        <details>
          <summary style={{ cursor: "pointer", fontSize: 13, fontWeight: 600, color: colors.textMuted }}>
            View JSON Output
          </summary>
          <pre style={{
            marginTop: 12, padding: 16, borderRadius: 10, background: colors.bgSecondary,
            fontSize: 12, overflow: "auto", color: colors.textMuted, lineHeight: 1.6,
            maxHeight: 300,
          }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </details>
      </Card>
    </div>
  );

  // ─── PAGE: ANALYSIS ───────────────────────────────────────────────────
  const AnalysisPage = () => (
    <div style={{
      minHeight: "100vh", paddingTop: 88, padding: "88px 24px 60px",
      maxWidth: 900, margin: "0 auto",
    }}>
      {analysisState === "loading" && (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", minHeight: "60vh", animation: "fadeIn 0.5s ease",
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 32, animation: "heartbeat 1.5s ease infinite",
          }}>
            <div style={{ color: colors.primary }}><Icons.Activity /></div>
          </div>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 28, fontWeight: 400, marginBottom: 16,
          }}>
            Analyzing Patient Data
          </h2>
          <p style={{ color: colors.textMuted, fontSize: 15, marginBottom: 32 }}>
            Processing symptoms, medical history, and clinical indicators...
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 12, height: 12, borderRadius: "50%", background: colors.primary,
                animation: `dotPulse 1.4s ease ${i * 0.2}s infinite`,
              }} />
            ))}
          </div>
        </div>
      )}

      {analysisState === "done" && analysisResult && (
        <div style={{ animation: "fadeInUp 0.6s ease" }}>
          <div style={{ marginBottom: 40 }}>
            <h1 style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 400, marginBottom: 8,
            }}>
              AI Analysis Results
            </h1>
            <p style={{ color: colors.textMuted, fontSize: 15 }}>
              Patient: <strong>{formData.fullName}</strong> · {formData.age} y/o {formData.gender}
            </p>
          </div>

          {/* Diagnoses */}
          <Card style={{ padding: "28px 32px", marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: colors.primary }}><Icons.Brain /></span> Possible Diagnoses
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {analysisResult.diagnoses.map((d, i) => (
                <div key={i} style={{ animation: `slideIn 0.4s ease ${i * 0.1}s both` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{i + 1}. {d.name}</span>
                    <span style={{
                      fontWeight: 700, fontSize: 14,
                      color: d.probability > 60 ? colors.primary : d.probability > 40 ? colors.warning : colors.textMuted,
                    }}>
                      {d.probability}%
                    </span>
                  </div>
                  <div style={{
                    height: 8, borderRadius: 4, background: colors.bgSecondary, overflow: "hidden", marginBottom: 6,
                  }}>
                    <div style={{
                      height: "100%", borderRadius: 4,
                      background: d.probability > 60
                        ? `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`
                        : d.probability > 40 ? colors.warning : colors.textLight,
                      width: `${d.probability}%`,
                      transition: "width 1s ease",
                      "--target-width": `${d.probability}%`,
                      animation: "progressFill 1.2s ease both",
                    }} />
                  </div>
                  <p style={{ fontSize: 13, color: colors.textMuted }}>{d.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Lab Tests */}
          <Card style={{ padding: "28px 32px", marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: colors.accent }}><Icons.Clipboard /></span> Suggested Lab Tests
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {analysisResult.labTests.map((t, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px", borderRadius: 10, background: colors.bgSecondary,
                  animation: `slideIn 0.4s ease ${i * 0.08}s both`,
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", background: colors.accent, flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 14 }}>{t}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Red Flags */}
          {analysisResult.redFlags.length > 0 && (
            <Card style={{
              padding: "28px 32px", marginBottom: 24,
              background: colors.dangerBg,
              border: `1px solid ${colors.danger}25`,
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 10, color: colors.danger }}>
                <Icons.AlertTriangle /> Red-Flag Warnings
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {analysisResult.redFlags.map((f, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "12px 16px", borderRadius: 10,
                    background: darkMode ? "rgba(255,107,107,0.08)" : "rgba(224,49,49,0.05)",
                  }}>
                    <span style={{ color: colors.danger, marginTop: 2, flexShrink: 0 }}>⚠</span>
                    <span style={{ fontSize: 14 }}>{f}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Next Steps */}
          <Card style={{ padding: "28px 32px", marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: colors.primary }}><Icons.ChevronRight /></span> Suggested Next Steps
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {analysisResult.nextSteps.map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "12px 16px", borderRadius: 10, background: colors.bgSecondary,
                }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                    background: colors.primaryLight, color: colors.primary,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700,
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 14, lineHeight: 1.6 }}>{s}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Disclaimer + Generate */}
          <Card style={{
            padding: "24px 32px", marginBottom: 24,
            background: colors.warningBg,
            border: `1px solid ${colors.warning}20`,
          }}>
            <p style={{ fontSize: 13, color: colors.warning, fontWeight: 500, lineHeight: 1.7 }}>
              ⚕ <strong>Disclaimer:</strong> This AI tool assists clinical decision-making and does not replace professional medical judgment. Always verify AI suggestions with clinical expertise.
            </p>
          </Card>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <PrimaryButton onClick={generateReport} style={{ padding: "16px 40px", fontSize: 16 }}>
              <Icons.FileText /> Generate Medical Report
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );

  // ─── PAGE: REPORT ─────────────────────────────────────────────────────
  const ReportPage = () => (
    <div style={{
      minHeight: "100vh", paddingTop: 88, padding: "88px 24px 60px",
      maxWidth: 800, margin: "0 auto",
    }}>
      <div style={{ animation: "fadeInUp 0.6s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 400, marginBottom: 8,
            }}>
              Medical Report
            </h1>
            <p style={{ color: colors.textMuted, fontSize: 14 }}>Generated on {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <PrimaryButton variant="ghost" onClick={copyReport} style={{ padding: "10px 18px", fontSize: 13 }}>
              {copied ? <><Icons.Check /> Copied!</> : <><Icons.Copy /> Copy</>}
            </PrimaryButton>
            <PrimaryButton variant="ghost" onClick={() => alert("Report saved to system.")} style={{ padding: "10px 18px", fontSize: 13 }}>
              <Icons.Save /> Save
            </PrimaryButton>
            <PrimaryButton onClick={() => window.print()} style={{ padding: "10px 18px", fontSize: 13 }}>
              <Icons.Download /> Download PDF
            </PrimaryButton>
          </div>
        </div>

        {/* Report Content */}
        <Card style={{ padding: "40px 36px" }} id="report-content">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32, paddingBottom: 24, borderBottom: `2px solid ${colors.primary}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                display: "flex", alignItems: "center", justifyContent: "center", color: "white",
              }}>
                <Icons.Stethoscope />
              </div>
              <span style={{ fontSize: 20, fontWeight: 700 }}>Med<span style={{ color: colors.primary }}>AI</span></span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>MEDICAL REPORT</h2>
            <p style={{ fontSize: 13, color: colors.textMuted }}>
              Date: {new Date().toLocaleDateString()} · Report ID: MR-{Math.random().toString(36).substr(2, 8).toUpperCase()}
            </p>
          </div>

          {/* Sections */}
          <ReportSection title="Patient Information">
            <ReportRow label="Full Name" value={formData.fullName} />
            <ReportRow label="Age" value={formData.age} />
            <ReportRow label="Gender" value={formData.gender} />
            <ReportRow label="Weight" value={formData.weight ? `${formData.weight} kg` : "N/A"} />
            <ReportRow label="Height" value={formData.height ? `${formData.height} cm` : "N/A"} />
            <ReportRow label="Allergies" value={formData.allergies || "None reported"} />
            <ReportRow label="Medications" value={formData.medications || "None reported"} />
          </ReportSection>

          <ReportSection title="Medical History Summary">
            <ReportRow label="Chronic Diseases" value={formData.chronicDiseases || "None reported"} />
            <ReportRow label="Previous Surgeries" value={formData.surgeries || "None reported"} />
            <ReportRow label="Family History" value={formData.familyHistory || "None reported"} />
          </ReportSection>

          <ReportSection title="Presenting Symptoms">
            <ReportRow label="Description" value={formData.symptoms} />
            <ReportRow label="Duration" value={formData.duration} />
            <ReportRow label="Severity" value={`${formData.severity}/10`} />
            <ReportRow label="Fever" value={formData.fever} />
            <ReportRow label="Pain Location" value={formData.painLocation || "Not specified"} />
            {formData.notes && <ReportRow label="Additional Notes" value={formData.notes} />}
          </ReportSection>

          <ReportSection title="AI Suggested Differential Diagnosis">
            {analysisResult?.diagnoses.map((d, i) => (
              <div key={i} style={{
                padding: "10px 0",
                borderBottom: i < analysisResult.diagnoses.length - 1 ? `1px solid ${colors.borderLight}` : "none",
              }}>
                <span style={{ fontWeight: 600 }}>{i + 1}. {d.name}</span>
                <span style={{ color: colors.textMuted, marginLeft: 8 }}>— {d.probability}% probability</span>
                <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>{d.description}</p>
              </div>
            ))}
          </ReportSection>

          <ReportSection title="Recommended Investigations">
            {analysisResult?.labTests.map((t, i) => (
              <div key={i} style={{ padding: "6px 0", fontSize: 14 }}>• {t}</div>
            ))}
          </ReportSection>

          {/* Clinical Notes - Editable */}
          <ReportSection title="Clinical Notes">
            <textarea
              value={clinicalNotes}
              onChange={e => setClinicalNotes(e.target.value)}
              placeholder="Add clinical notes here..."
              style={{
                width: "100%", minHeight: 120, padding: 16, borderRadius: 10,
                border: `1.5px solid ${colors.border}`, background: colors.bgSecondary,
                color: colors.text, fontSize: 14, resize: "vertical", outline: "none",
                fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7,
              }}
            />
          </ReportSection>

          {/* Signature */}
          <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid ${colors.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
              <div>
                <p style={{ fontSize: 13, color: colors.textMuted, marginBottom: 32 }}>Doctor Signature:</p>
                <div style={{ width: 200, borderBottom: `2px solid ${colors.text}` }} />
              </div>
              <div>
                <p style={{ fontSize: 13, color: colors.textMuted, marginBottom: 8 }}>Date:</p>
                <p style={{ fontWeight: 500 }}>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{
            marginTop: 32, padding: 16, borderRadius: 10,
            background: colors.warningBg, border: `1px solid ${colors.warning}20`,
          }}>
            <p style={{ fontSize: 12, color: colors.warning, lineHeight: 1.7 }}>
              ⚕ <strong>Disclaimer:</strong> This AI-generated report assists clinical decision-making and does not replace professional medical judgment.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );

  const ReportSection = ({ title, children }) => (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{
        fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em",
        color: colors.primary, marginBottom: 14, paddingBottom: 8,
        borderBottom: `1px solid ${colors.border}`,
      }}>
        {title}
      </h3>
      {children}
    </div>
  );

  const ReportRow = ({ label, value }) => (
    <div style={{
      display: "flex", padding: "8px 0", gap: 12,
      borderBottom: `1px solid ${colors.borderLight}`,
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted, minWidth: 140, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 14 }}>{value}</span>
    </div>
  );

  // ─── RENDER ─────────────────────────────────────────────────────────────
  return (
    <>
      <style>{baseStyles}</style>
      <style>{`
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .step-label { display: none; }
        }
        @media print {
          nav, .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
        }
      `}</style>
      <Navbar />
      {currentPage === "landing" && <LandingPage />}
      {currentPage === "login" && <LoginPage />}
      {currentPage === "dashboard" && <DashboardPage />}
      {currentPage === "consultation" && <ConsultationPage />}
      {currentPage === "analysis" && <AnalysisPage />}
      {currentPage === "report" && <ReportPage />}
    </>
  );
}
