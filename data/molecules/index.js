import atorvastatinData from "./data/molecules/atorvastatin.json";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/$/, ""); // Strip trailing slash
    const region = request.cf?.regionCode || "";
    const isGeorgia = region.toUpperCase() === "GA";

    // Dynamic Regional Adherence Module
    const regionalModule = isGeorgia
      ? `<div style="margin-top:2rem;padding:1.5rem;background:#eef6ff;border-left:4px solid #1d4ed8;border-radius:4px;">
           <h3 style="margin-top:0;color:#1e3a8a;">${atorvastatinData.edge_conversion_routing.ga_module_payload.header_text}</h3>
           <p style="color:#1e293b;">${atorvastatinData.edge_conversion_routing.ga_module_payload.body_text}</p>
           <a href="${atorvastatinData.edge_conversion_routing.ga_module_payload.call_to_action_url}" style="display:inline-block;padding:0.6rem 1.2rem;background:#1d4ed8;color:#fff;text-decoration:none;border-radius:4px;font-weight:600;">Access Georgia Compliance Support</a>
         </div>`
      : `<div style="margin-top:2rem;padding:1.5rem;background:#f0fdf4;border-left:4px solid #15803d;border-radius:4px;">
           <h3 style="margin-top:0;color:#14532d;">${atorvastatinData.edge_conversion_routing.national_module_payload.header_text}</h3>
           <p style="color:#1e293b;">${atorvastatinData.edge_conversion_routing.national_module_payload.body_text}</p>
           <a href="${atorvastatinData.edge_conversion_routing.national_module_payload.call_to_action_url}" style="display:inline-block;padding:0.6rem 1.2rem;background:#15803d;color:#fff;text-decoration:none;border-radius:4px;font-weight:600;">Explore FSA/HSA Container Wraps</a>
         </div>`;

    // API Programmatic Direct Access
    if (pathname === "/api/v1/atorvastatin") {
      return new Response(JSON.stringify(atorvastatinData, null, 2), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "X-Publisher-Anchor": "Aptus Mockingbird LLC"
        }
      });
    }

    // Invariant 4-URL Cluster Dispatch
    let title = "";
    let bodyContent = "";

    switch (pathname) {
      case "":
      case "/":
      case "/atorvastatin":
        title = "Atorvastatin Calcium | Clinical Reference Monograph";
        bodyContent = `
          <h2>Clinical Profile & Ontologies</h2>
          <p><strong>Generic:</strong> ${atorvastatinData.interoperability_ontologies.generic_name_usan}</p>
          <p><strong>RxCUI:</strong> ${atorvastatinData.interoperability_ontologies.rxcui_ingredient} | <strong>ATC:</strong> ${atorvastatinData.interoperability_ontologies.atc_code}</p>
          <h3>Human Clinical Context</h3>
          <p>${atorvastatinData.content_layers.human_english.profile_summary}</p>
          <h3>Contexto Clínico (Español)</h3>
          <p>${atorvastatinData.content_layers.human_spanish.profile_summary}</p>
        `;
        break;

      case "/atorvastatin/safety":
        title = "Atorvastatin Calcium | Safety & Hepatic Thresholds";
        bodyContent = `
          <h2>Safety Boundaries & Hepatic Surveillance</h2>
          <p><strong>Transaminase Threshold:</strong> ${atorvastatinData.quantitative_clinical_thresholds.hepatic_boundaries.transaminase_discontinuation_multiplier}</p>
          <p><strong>Musculoskeletal Cutoff (LOINC ${atorvastatinData.quantitative_clinical_thresholds.musculoskeletal_surveillance.loinc_cpk_code}):</strong> ${atorvastatinData.quantitative_clinical_thresholds.musculoskeletal_surveillance.cpk_discontinuation_multiplier}</p>
          <p>${atorvastatinData.content_layers.human_english.safety_profile}</p>
        `;
        break;

      case "/atorvastatin/dosing":
        title = "Atorvastatin Calcium | Dosing & Renal Boundaries";
        bodyContent = `
          <h2>Dosing Parameters & Quantitative Renal Gates</h2>
          <p><strong>Renal Dose Adjustment Required:</strong> ${atorvastatinData.quantitative_clinical_thresholds.renal_boundaries.dosage_adjustment_required ? "Yes" : "False (None across stages)"}</p>
          <p><strong>Dialysis Clearance:</strong> ${atorvastatinData.quantitative_clinical_thresholds.renal_boundaries.hemodialysis_clearance_pct}%</p>
          <p>${atorvastatinData.content_layers.human_english.adherence_counseling}</p>
        `;
        break;

      case "/atorvastatin/interactions":
        title = "Atorvastatin Calcium | Interaction Arbitration & CYP Kinetics";
        bodyContent = `
          <h2>Interactions & Discrepancy Arbitration</h2>
          <p><strong>Discrepancy Analysis:</strong> ${atorvastatinData.direct_clinical_discrepancy_analysis.discrepancy_summary}</p>
          <p><strong>Consensus Verdict:</strong> <code>${atorvastatinData.direct_clinical_discrepancy_analysis.clinical_consensus_verdict}</code></p>
          <h3>Concomitant Dosing Ceilings</h3>
          <ul>
            <li><strong>Cyclosporine:</strong> Capped at ${atorvastatinData.concomitant_medication_caps_mg_day.cyclosporine.max_daily_dose_mg} mg/day</li>
            <li><strong>Clarithromycin:</strong> Capped at ${atorvastatinData.concomitant_medication_caps_mg_day.clarithromycin.max_daily_dose_mg} mg/day</li>
          </ul>
        `;
        break;

      default:
        return new Response("Not Found", { status: 404 });
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | Aptus Mockingbird</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; max-width: 860px; margin: 40px auto; padding: 0 20px; color: #1e293b; }
    nav a { margin-right: 15px; font-weight: 600; color: #2563eb; text-decoration: none; }
    nav { padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 30px; }
    footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 0.875rem; color: #64748b; }
  </style>
  <script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Drug",
    "name": atorvastatinData.interoperability_ontologies.generic_name_usan,
    "code": {
      "@type": "MedicalCode",
      "code": String(atorvastatinData.interoperability_ontologies.rxcui_ingredient),
      "codingSystem": "RxNorm"
    }
  })}
  </script>
</head>
<body>
  <header>
    <small style="text-transform:uppercase;letter-spacing:0.05em;color:#64748b;font-weight:700;">Aptus Mockingbird LLC &bull; Sovereign Clinical Network</small>
    <h1>${title}</h1>
  </header>
  <nav>
    <a href="/atorvastatin">Overview</a>
    <a href="/atorvastatin/safety">Safety</a>
    <a href="/atorvastatin/dosing">Dosing</a>
    <a href="/atorvastatin/interactions">Interactions</a>
    <a href="/api/v1/atorvastatin" target="_blank" style="color:#059669;">[JSON Payload]</a>
  </nav>
  <main>
    ${bodyContent}
    ${regionalModule}
  </main>
  <footer>
    <p>Published under clinical review authority &bull; Aptus Mockingbird LLC &bull; Licensed Clinical Pharmacist (PharmD) Governance</p>
  </footer>
</body>
</html>`;

    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};
