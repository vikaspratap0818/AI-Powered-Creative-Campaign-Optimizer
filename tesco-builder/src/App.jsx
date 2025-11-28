  import { FileText, Palette } from "lucide-react";

  import React, { useState, useEffect } from "react";
  import {
    AlertCircle,
    CheckCircle,
    ShieldAlert,
    RefreshCw,
    Download,
    Eye,
    User,
    AlertTriangle,
    ChevronDown,
    ChevronUp,
    Smartphone,
    ZoomIn,
    ZoomOut,
    Wand2,
    Ban,
    Info,

  } from "lucide-react";

  // --- Constants (Appendix B Rules) ---
  const HARD_FAIL_KEYWORDS = [
    "sustainability",
    "green",
    "eco-friendly",
    "t&cs",
    "terms and conditions",
    "competition",
    "win",
    "prize",
    "charity",
    "donation",
    "money-back",
    "guarantee",
    "warranty",
    "buy now",
    "click here",
    "shop now",
  ];
  const IMAGE_URLS = {
    "Great value every day": "https://digitalcontent.api.tesco.com/v2/media/ghs/10865b8e-1887-4e7d-896e-28e24eeae2d7/03b9a387-7c45-4763-b08c-4fc9546d86bb_113337687.jpeg?h=225&w=225",
    "Freshness you can taste": "https://digitalcontent.api.tesco.com/v2/media/ghs/f1ddbb44-ff7f-43d3-a3b3-1903dce97ada/e752fc56-bfc0-48da-9f19-21cd1c771370_2007476925.jpeg?h=225&w=225",
    "Quality food, loved by you": "https://digitalcontent.api.tesco.com/v2/media/ghs/6e6e149a-49a2-4027-a44b-749de3ee9895/23f82562-7a10-4492-921c-b26ac8f0bb5d_1340645238.jpeg?h=225&w=225",
    "Pure ingredients. Real goodness.": "https://digitalcontent.api.tesco.com/v2/media/ghs/54ca3733-a5aa-439a-b6ad-497d8a645566/efaf5d15-9097-43a3-9e01-0f1ab421017f_1525579185.jpeg?h=225&w=225",
    "Big deals big savings" : "https://digitalcontent.api.tesco.com/v2/media/ghs/25c6d76c-8172-4ea1-9ecf-2df99457c7dc/7f44f451-94d1-43b1-8c75-f8e34344ceb2_862436107.jpeg?h=225&w=225",
    "Made for moments that matter":"https://digitalcontent.api.tesco.com/v2/media/ghs/ff27aa49-6289-49ce-9f0d-297c51d4a19a/5eea899e-3c2d-431e-ac3e-c73874bb7b16.jpeg?h=225&w=225",
    "Your favorites, now fresher":"https://digitalcontent.api.tesco.com/v2/media/ghs/15b0d75f-c522-42a8-8943-8554eefec850/2960c956-a2c1-4ab6-a464-3f22bf567eaa.jpeg?h=225&w=225",
    "Better choices, every aisle": "https://digitalcontent.api.tesco.com/v2/media/ghs/6892215c-64e2-4547-ab47-9a6ce40bf96b/aa1cdf8d-0011-4ef6-b917-39550d1a5ad9.jpeg?h=225&w=225",
    "Taste the difference":"https://digitalcontent.api.tesco.com/v2/media/ghs/0f292431-29c5-444c-b734-e0069859d8ff/7ccf0372-639c-48b1-92e1-1b3e38ce5b6a.jpeg?h=225&w=225",
    "Shop smart, live better":"https://digitalcontent.api.tesco.com/v2/media/ghs/f8cee6a0-7510-4fc1-900a-cb4c7e560eeb/0a80fa39-54c6-44ba-868f-03a2aaaddf00.jpeg?h=225&w=225"
  };




  const AI_SUGGESTIONS = [
    {
      headline: "Great value every day",
      subhead: "Selected stores. While stocks last.",
    },
    {
      headline: "Freshness you can taste",
      subhead: "Perfect for your family dinner.",
    },
    {
      headline: "Quality food, loved by you",
      subhead: "Try something new tonight.",
    },
    {
      headline: "Big deals, big savings",
      subhead: "Your weekly essentials at better prices.",
    },
    {
      headline: "Made for moments that matter",
      subhead: "Bring joy to every bite.",
    },
    {
      headline: "Your favorites, now fresher",
      subhead: "Picked with care. Packed with flavor.",
    },
    {
      headline: "Better choices, every aisle",
      subhead: "Wholesome options for your lifestyle.",
    },
    {
      headline: "Taste the difference",
      subhead: "Crafted for quality and freshness.",
    },
    {
      headline: "Shop smart, live better",
      subhead: "Every basket brings more savings.",
    },
    {
      headline: "Pure ingredients. Real goodness.",
      subhead: "Feel good about what you bring home.",
    },
  ];


  export default function TescoCreativeBuilder() {
    // --- State ---
    const [formData, setFormData] = useState({
    headline: "Great value every day",
    subhead: "Selected stores. While stocks last.",
    price: "3.50",
    regularPrice: "4.00",
    tileType: "clubcard",
    tag: "available",
    expiryDate: "",
    imageUrl: IMAGE_URLS["Great value every day"],  
    isAlcohol: false,
    backgroundType: "white",
  });

  useEffect(() => {
    
    const newUrl = IMAGE_URLS[formData.headline];
    if (newUrl && newUrl !== formData.imageUrl) {
      setFormData(prev => ({ ...prev, imageUrl: newUrl }));
    }
  }, [formData.headline]);

    const [uiState, setUiState] = useState({
      showSafeZones: false,
      visionStatus: null,
      isGenerating: false,
      activeTab: "edit", // 'edit' | 'report'
      scale: 1,
      activeSection: "content", // 'content' | 'design' | 'rules'
    });

    const [validationErrors, setValidationErrors] = useState([]);

    // --- Rule Validation Engine ---
    useEffect(() => {
      const errors = [];
      const textToCheck = (
        formData.headline +
        " " +
        formData.subhead
      ).toLowerCase();

      // 1. Hard Fail Keywords
      HARD_FAIL_KEYWORDS.forEach((word) => {
        if (textToCheck.includes(word)) {
          errors.push({
            type: "hard-fail",
            msg: `Prohibited content: "${word}"`,
          });
        }
      });

      // 2. Price Callouts
      if (
        textToCheck.includes("£") ||
        (/\d/.test(textToCheck) && textToCheck.includes("price"))
      ) {
        errors.push({
          type: "hard-fail",
          msg: "No price call-outs in text. Use Value Tile.",
        });
      }

      // 3. Clubcard Rules
      if (formData.tileType === "clubcard") {
        if (!formData.expiryDate)
          errors.push({
            type: "error",
            msg: "Clubcard requires end date (DD/MM).",
          });
        if (!formData.regularPrice)
          errors.push({
            type: "error",
            msg: "Regular price required for comparison.",
          });
      }

      // 4. LEP Rules
      if (formData.tileType === "lep" && formData.backgroundType !== "white") {
        errors.push({
          type: "hard-fail",
          msg: "LEP must have white background.",
        });
      }

      setValidationErrors(errors);
    }, [formData]);

    // --- Actions ---
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
      setUiState((prev) => ({ ...prev, visionStatus: null }));
    };

    const toggleSection = (section) => {
      setUiState((prev) => ({
        ...prev,
        activeSection: prev.activeSection === section ? null : section,
      }));
    };

    const handleAiGenerate = () => {
      setUiState((prev) => ({ ...prev, isGenerating: true }));
      setTimeout(() => {
        const suggestion =
          AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)];
        setFormData((prev) => ({
          ...prev,
          headline: suggestion.headline,
          subhead: suggestion.subhead,
        }));
        setUiState((prev) => ({ ...prev, isGenerating: false }));
      }, 1000);
    };

    const handleVisionCheck = () => {
      setUiState((prev) => ({ ...prev, isGenerating: true }));
      setTimeout(() => {
        setUiState((prev) => ({
          ...prev,
          isGenerating: false,
          visionStatus: "Caution: Person detected (Rule B.4). Confirm relevance.",
          activeTab: "report",
        }));
      }, 1200);
    };

    // --- Style Helpers ---
    const getTileStyle = () => {
      switch (formData.tileType) {
        case "clubcard":
          return "bg-[#FFDE00] text-[#00539F] ring-4 ring-white shadow-xl";
        case "lep":
          return "bg-white text-[#00539F] border-2 border-[#00539F] shadow-lg";
        case "new":
          return "bg-[#CC0000] text-white ring-4 ring-white shadow-xl";
        default:
          return "bg-white text-[#00539F] shadow-lg border border-gray-100";
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans text-slate-800 flex flex-col">
        {/* --- Navbar --- */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/90">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#00539F] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                T
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#00539F] leading-tight">
                  Creative Builder
                </h1>
                <div className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                  Retail Media Compliance AI
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1">
                <button
                  onClick={() =>
                    setUiState((s) => ({
                      ...s,
                      scale: Math.max(0.5, s.scale - 0.1),
                    }))
                  }
                  className="p-1 hover:bg-white rounded-full transition"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="text-xs font-mono w-8 text-center">
                  {Math.round(uiState.scale * 100)}%
                </span>
                <button
                  onClick={() =>
                    setUiState((s) => ({
                      ...s,
                      scale: Math.min(1.2, s.scale + 0.1),
                    }))
                  }
                  className="p-1 hover:bg-white rounded-full transition"
                >
                  <ZoomIn size={14} />
                </button>
              </div>
              <button className="bg-[#00539F] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-md flex items-center gap-2">
                <Download size={16} />{" "}
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 h-[calc(100vh-64px)]">
          {/* --- LEFT: Controls Sidebar --- */}
          <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar h-full">
            {/* AI Action Card */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-[#00539F]">
                  AI Copy Assistant
                </h3>
                <p className="text-xs text-blue-600/80 mt-0.5">
                  Generate compliant headlines instantly
                </p>
              </div>
              <button
                onClick={handleAiGenerate}
                disabled={uiState.isGenerating}
                className="bg-white hover:bg-blue-50 text-[#00539F] border border-blue-200 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition shadow-sm"
              >
                <Wand2
                  size={14}
                  className={uiState.isGenerating ? "animate-spin" : ""}
                />
                {uiState.isGenerating ? "Working..." : "Auto-Fill"}
              </button>
            </div>

            {/* Input Accordions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Section 1: Content */}
              <div className="border-b border-slate-100">
                <button
                  onClick={() => toggleSection("content")}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition"
                >
                  <span className="font-bold text-sm flex items-center gap-2">
                    <FileTextIcon /> Content Details
                  </span>
                  {uiState.activeSection === "content" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                {uiState.activeSection === "content" && (
                  <div className="p-4 pt-0 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">
                        Headline
                      </label>
                      <input
                        name="headline"
                        value={formData.headline}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">
                        Subhead
                      </label>
                      <textarea
                        name="subhead"
                        value={formData.subhead}
                        onChange={handleInputChange}
                        className="input-field h-20 resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">
                          Price (£)
                        </label>
                        <input
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="input-field"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">
                          Was (£)
                        </label>
                        <input
                          name="regularPrice"
                          value={formData.regularPrice}
                          onChange={handleInputChange}
                          disabled={formData.tileType !== "clubcard"}
                          className={`input-field ${
                            formData.tileType !== "clubcard" &&
                            "bg-slate-100 text-slate-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: Design */}
              <div className="border-b border-slate-100">
                <button
                  onClick={() => toggleSection("design")}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition"
                >
                  <span className="font-bold text-sm flex items-center gap-2">
                    <PaletteIcon /> Design & Format
                  </span>
                  {uiState.activeSection === "design" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                {uiState.activeSection === "design" && (
                  <div className="p-4 pt-0 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">
                        Tile Type
                      </label>
                      <select
                        name="tileType"
                        value={formData.tileType}
                        onChange={handleInputChange}
                        className="input-field bg-white"
                      >
                        <option value="clubcard">Clubcard Price</option>
                        <option value="lep">Low Everyday Price (LEP)</option>
                        <option value="new">New Product</option>
                        <option value="white">Standard White</option>
                      </select>
                    </div>
                    {formData.tileType === "clubcard" && (
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#00539F] uppercase">
                          End Date (Required)
                        </label>
                        <input
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="DD/MM"
                          className={`input-field ${
                            !formData.expiryDate && "border-red-300 bg-red-50"
                          }`}
                        />
                      </div>
                    )}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">
                        Tesco Tag
                      </label>
                      <select
                        name="tag"
                        value={formData.tag}
                        onChange={handleInputChange}
                        className="input-field bg-white"
                      >
                        <option value="available">Available at Tesco</option>
                        <option value="only">Only at Tesco</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition">
                      <input
                        type="checkbox"
                        name="isAlcohol"
                        checked={formData.isAlcohol}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#00539F] rounded"
                      />
                      <div>
                        <span className="text-sm font-semibold block">
                          Alcohol Product
                        </span>
                        <span className="text-[10px] text-slate-500">
                          Adds Drinkaware footer
                        </span>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              {/* Section 3: Validation */}
              <div>
                <button
                  onClick={() => toggleSection("rules")}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition"
                >
                  <span className="font-bold text-sm flex items-center gap-2">
                    <ShieldAlert
                      size={16}
                      className={
                        validationErrors.length > 0
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    />
                    Compliance Status
                  </span>
                  {validationErrors.length > 0 && (
                    <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {validationErrors.length} Issues
                    </span>
                  )}
                  {uiState.activeSection === "rules" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                {uiState.activeSection === "rules" && (
                  <div className="p-4 pt-0 animate-in slide-in-from-top-2 duration-200">
                    <div className="bg-slate-50 rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                      {validationErrors.length === 0 && !uiState.visionStatus && (
                        <div className="flex items-center gap-2 text-green-700 text-xs font-medium">
                          <CheckCircle size={14} /> All strict rules passed.
                        </div>
                      )}
                      {uiState.visionStatus && (
                        <div className="flex gap-2 text-orange-700 bg-orange-50 p-2 rounded text-xs border border-orange-100">
                          <Eye size={14} className="shrink-0 mt-0.5" />{" "}
                          {uiState.visionStatus}
                        </div>
                      )}
                      {validationErrors.map((err, i) => (
                        <div
                          key={i}
                          className={`flex gap-2 p-2 rounded text-xs border ${
                            err.type === "hard-fail"
                              ? "bg-red-50 text-red-700 border-red-100"
                              : "bg-yellow-50 text-yellow-700 border-yellow-100"
                          }`}
                        >
                          {err.type === "hard-fail" ? (
                            <Ban size={14} className="shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle
                              size={14}
                              className="shrink-0 mt-0.5"
                            />
                          )}
                          <span>{err.msg}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleVisionCheck}
                      className="w-full mt-3 text-xs text-slate-500 hover:text-[#00539F] flex items-center justify-center gap-1 py-2 border border-dashed border-slate-300 rounded hover:border-[#00539F] transition"
                    >
                      <Eye size={12} /> Run Computer Vision Check
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* --- RIGHT: Preview Canvas --- */}
          <div className="lg:col-span-8 flex flex-col h-full bg-slate-200/50 rounded-2xl border border-slate-300/50 backdrop-blur-sm relative overflow-hidden group">
            {/* Toolbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur shadow-sm border border-slate-200 rounded-full px-4 py-1.5 flex gap-4 transition-all opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-600 hover:text-[#00539F]">
                <input
                  type="checkbox"
                  checked={uiState.showSafeZones}
                  onChange={() =>
                    setUiState((s) => ({ ...s, showSafeZones: !s.showSafeZones }))
                  }
                  className="rounded text-[#00539F] focus:ring-0"
                />
                Show Safe Zones
              </label>
              <div className="w-px h-4 bg-slate-300"></div>
              <span className="text-[10px] text-slate-400 font-mono pt-0.5">
                9:16 MOBILE PREVIEW
              </span>
            </div>

            {/* Canvas Container with Zoom */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-8 custom-scrollbar relative">
              {/* Simulated Phone Frame */}
              <div
                className="relative transition-transform duration-300 ease-out origin-center bg-black rounded-[40px] p-3 shadow-2xl ring-1 ring-slate-900/10"
                style={{ transform: `scale(${uiState.scale})` }}
              >
                {/* Bezel */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-30"></div>
                <div className="absolute -right-1 top-24 w-1 h-16 bg-slate-700 rounded-r-md"></div>
                <div className="absolute -left-1 top-24 w-1 h-8 bg-slate-700 rounded-l-md"></div>

                {/* Screen (The Banner) */}
                <div className="relative w-[320px] h-[568px] bg-white rounded-[32px] overflow-hidden flex flex-col shrink-0">
                  {/* Safe Zone Overlays */}
                  {uiState.showSafeZones && (
                    <div className="absolute inset-0 z-50 pointer-events-none fade-in">
                      <div className="absolute top-0 w-full h-[200px] bg-red-500/10 border-b border-red-500/50 text-red-600 text-[10px] p-4 font-mono font-bold flex justify-center uppercase tracking-widest backdrop-blur-[1px]">
                        Safe Zone (200px)
                      </div>
                      <div className="absolute bottom-0 w-full h-[250px] bg-red-500/10 border-t border-red-500/50 text-red-600 text-[10px] p-4 font-mono font-bold flex items-end justify-center uppercase tracking-widest backdrop-blur-[1px]">
                        Safe Zone (250px)
                      </div>
                    </div>
                  )}

                  {/* Banner Content */}
                  <div className="relative h-full flex flex-col">
                    {/* Product Image Layer */}
                    <div className="absolute inset-0 z-0 bg-white">
                      {uiState.isGenerating ? (
                        <div className="w-full h-[60%] mt-[80px] bg-slate-100 animate-pulse rounded-lg mx-auto w-[90%]"></div>
                      ) : (
                        <img
                          src={formData.imageUrl}
                          alt="Packshot"
                          className="w-full h-[55%] object-contain object-center mt-[90px] drop-shadow-xl"
                        />
                      )}
                    </div>

                    {/* Tags */}
                    <div className="absolute top-6 left-0 z-10">
                      {formData.tag !== "none" && (
                        <div className="bg-[#00539F] text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-r shadow-lg">
                          {formData.tag === "only"
                            ? "Only at Tesco"
                            : "Available at Tesco"}
                        </div>
                      )}
                    </div>

                    {/* Value Tile */}
                    <div className="absolute top-[42%] right-3 z-20 group-hover:scale-105 transition-transform duration-300">
                      <div
                        className={`rounded-full w-[100px] h-[100px] flex flex-col items-center justify-center ${getTileStyle()} p-1 text-center`}
                      >
                        {formData.tileType === "clubcard" && (
                          <>
                            <span className="text-[9px] font-extrabold uppercase leading-none mb-0.5 tracking-tight">
                              Clubcard Price
                            </span>
                            <span className="text-[26px] font-extrabold leading-none tracking-tighter">
                              £{formData.price}
                            </span>
                            <div className="flex flex-col leading-none mt-0.5">
                              <span className="text-[8px] opacity-80 font-medium">
                                was £{formData.regularPrice}
                              </span>
                              <span className="text-[8px] opacity-80 font-medium">
                                {formData.expiryDate || "DD/MM"}
                              </span>
                            </div>
                          </>
                        )}
                        {(formData.tileType === "lep" ||
                          formData.tileType === "white") && (
                          <span className="text-[28px] font-extrabold tracking-tighter">
                            £{formData.price}
                          </span>
                        )}
                        {formData.tileType === "new" && (
                          <>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest mb-1">
                              New
                            </span>
                            <span className="text-[22px] font-extrabold leading-none">
                              £{formData.price}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Text Area */}
                    <div className="absolute bottom-0 w-full bg-white/95 backdrop-blur-sm z-10 px-6 pb-8 flex flex-col justify-end min-h-[30%]">
                      <div className="absolute -top-16 left-0 w-full h-16 bg-gradient-to-t from-white via-white/80 to-transparent"></div>

                      <div className="mb-4 relative z-10">
                        <h2
                          className="text-[#EE1C25] font-extrabold text-[24px] tracking-tighter leading-none"
                          style={{ fontFamily: "Arial" }}
                        >
                          TESCO
                        </h2>
                        <div className="h-[3px] w-8 bg-[#00539F] mt-1.5 rounded-full"></div>
                      </div>

                      <div className="relative z-10">
                        {uiState.isGenerating ? (
                          <div className="space-y-2">
                            <div className="h-6 bg-slate-100 rounded animate-pulse w-3/4"></div>
                            <div className="h-4 bg-slate-100 rounded animate-pulse w-1/2"></div>
                          </div>
                        ) : (
                          <>
                            <h3 className="text-[#00539F] font-bold text-[22px] leading-tight mb-2 tracking-tight">
                              {formData.headline}
                            </h3>
                            <p className="text-slate-600 text-[13px] leading-snug font-medium">
                              {formData.subhead}
                            </p>
                          </>
                        )}
                      </div>

                      {formData.isAlcohol && (
                        <div className="mt-4 pt-2 border-t border-slate-100 relative z-10">
                          <div className="border border-slate-900 inline-block px-2 py-0.5">
                            <p className="text-[8px] font-bold uppercase tracking-wide">
                              bedrinkaware.co.uk
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <style>{`
          .input-field {
            width: 100%;
            padding: 0.6rem 0.8rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            outline: none;
            transition: all 0.2s;
          }
          .input-field:focus {
            border-color: #00539F;
            box-shadow: 0 0 0 3px rgba(0, 83, 159, 0.1);
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 20px;
          }
        `}</style>
      </div>
    );
  }

  // Icons
  const FileTextIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
  const PaletteIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.01 17.461 2 12 2z" />
    </svg>
  );
