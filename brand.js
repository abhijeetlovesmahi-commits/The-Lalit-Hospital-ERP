/* --- DYNAMIC BRANDING SCRIPT (MEDICAL SAAS MODE) --- */

function applyBranding() {
    // 1. Default Fallback (Tabhi dikhega jab Master DB se data nahi aayega)
    let brandData = {
        name: "CarePlus Clinic", 
        slogan: "Healing with Compassion",
        address: "",
        regNo: "", // Hospital Registration/License Number (UDISE ki jagah)
        phone: "",
        logo: "https://via.placeholder.com/192/00B4D8/FFFFFF?text=Logo" 
    };

    // 2. 🚀 BINA OVERRIDE KIYE DATA TRANSFER
    const savedBrandStr = localStorage.getItem('hospitalBrandData'); // Key updated for Hospital
    if (savedBrandStr) {
        try {
            const parsedData = JSON.parse(savedBrandStr);
            
            // Jo bhi data Super Admin se aayega, wo direct set hoga
            brandData.name = parsedData.hospitalName || parsedData.name || brandData.name;
            brandData.logo = parsedData.logoUrl || parsedData.logo || brandData.logo;
            
            brandData.slogan = parsedData.slogan || "";
            brandData.address = parsedData.address || "";
            brandData.regNo = parsedData.regNo || parsedData.registrationNo || ""; // Updated
            brandData.phone = parsedData.phone || "";
            
        } catch(e) {
            console.error("Error reading hospital brand data", e);
        }
    }

    window.BRAND_DATA = brandData;

    // =========================================================
    // 🚀 3. DYNAMIC PWA & WHITE-LABEL (SABHI PAGES KE LIYE)
    // =========================================================
    document.title = brandData.name + " | Portal";

    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
    }
    favicon.href = brandData.logo;

    document.querySelectorAll('link[rel="manifest"]').forEach(el => el.remove());
    
    // Theme colors updated to match MedCore UI
    const dynamicManifest = {
        "name": brandData.name,
        "short_name": brandData.name,
        "start_url": "/",
        "display": "standalone",
        "background_color": "#f0f8ff", 
        "theme_color": "#002B5B", 
        "icons": [
            { "src": brandData.logo, "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
            { "src": brandData.logo, "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
        ]
    };
    
    const manifestBlob = new Blob([JSON.stringify(dynamicManifest)], {type: 'application/json'});
    const manifestUrl = URL.createObjectURL(manifestBlob);
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = manifestUrl;
    document.head.appendChild(manifestLink);

    // =========================================================
    // 🎨 4. UI HEADER INJECTION 
    // =========================================================
    const brandContainer = document.getElementById('brand-header-container');
    
    if (brandContainer) {
        brandContainer.style.display = "flex";
        brandContainer.style.flexDirection = "column";
        brandContainer.style.alignItems = "center";
        brandContainer.style.textAlign = "center";
        brandContainer.style.width = "100%";
        brandContainer.style.paddingTop = "35px"; 
        brandContainer.style.marginBottom = "5px";

        const logoHtml = brandData.logo ? `<img src="${brandData.logo}" alt="Hospital Logo" class="hospital-logo" style="height:90px; width:auto; margin-bottom:10px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">` : `<div style="height: 15px;"></div>`; 
        
        // Font aur colors Hospital theme ke hisaab se (Teal aur Deep Blue)
        const sloganHtml = brandData.slogan ? `<p style="margin:2px 0; letter-spacing: 1px; font-size: 0.6rem; color: var(--med-teal, #00B4D8); font-weight:600; text-transform: uppercase; font-family: 'Montserrat', sans-serif;">${brandData.slogan}</p>` : '';
        
        const addressHtml = brandData.address ? `<p style="margin:2px 0; font-size: 0.55rem; color: var(--text-muted, #555); font-family: 'Poppins', sans-serif;"> <i class="fas fa-map-marker-alt" style="color: #e74c3c;"></i> ${brandData.address}</p>` : '';
        
        // Smart Formatting (RegNo/Phone)
        let regText = brandData.regNo ? (brandData.regNo.toLowerCase().includes('reg') ? brandData.regNo : `Reg No: ${brandData.regNo}`) : "";
        let phoneText = brandData.phone ? (brandData.phone.includes('📞') ? brandData.phone : `📞 ${brandData.phone}`) : "";

        let metaHtml = "";
        if(regText || phoneText) {
            metaHtml = `<div style="display:flex; gap:10px; justify-content:center; font-size:0.5rem; color:var(--med-dark, #002B5B); font-weight:500; margin-top:4px; font-family: 'Poppins', sans-serif;">
                            ${regText ? `<span><i class="fas fa-certificate text-warning"></i> ${regText}</span>` : ''}
                            ${phoneText ? `<span>${phoneText}</span>` : ''}
                        </div>`;
        }

        brandContainer.innerHTML = `
            ${logoHtml}
            <h1 style="font-size:22px; color:var(--med-dark, #002B5B); margin:0; font-family:'Montserrat', sans-serif; font-weight:800; line-height:1.2; width: 100%; text-transform: uppercase;">
                ${brandData.name}
            </h1>
            ${sloganHtml}
            ${addressHtml}
            ${metaHtml}
        `;
    }
}

document.addEventListener('DOMContentLoaded', applyBranding);
