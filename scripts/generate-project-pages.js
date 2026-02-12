import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://valora-rs.com';
const defaultImage = `${baseUrl}/src/assets/logos/MAIN%20LOGO.png`;

// Fetch data from API
function fetchAPI(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function generateHTML(meta) {
  return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/jpeg" href="/src/assets/logos/Valora%20green.jpeg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${meta.description}" />
    
    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${meta.url}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:site_name" content="VALORA" />
    <meta property="og:image" content="${meta.image}" />
    <meta property="og:image:url" content="${meta.image}" />
    <meta property="og:image:secure_url" content="${meta.image}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${meta.title}" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${meta.image}" />
    
    <title>${meta.title}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
}

async function generateProjectPages() {
  const distDir = path.join(__dirname, '..', 'dist');
  
  if (!fs.existsSync(distDir)) {
    console.log('⚠️  dist folder not found. Skipping project page generation.');
    return;
  }

  try {
    // Read environment variables from .env or use defaults
    const apiUrl = process.env.VITE_CRM_BACKEND_URL || 'https://sge-commerce.onrender.com/api/v1';
    const companyId = process.env.VITE_CRM_COMPANY_ID || '';
    
    if (!companyId) {
      console.log('⚠️  VITE_CRM_COMPANY_ID not set. Skipping project pages.');
      return;
    }
    
    console.log('📡 Fetching projects from API...');
    const url = `${apiUrl}/project/public?deleted=false&company=${companyId}&PageCount=100&page=1&sort=-createdAt`;
    const data = await fetchAPI(url);
    const projects = data.data || [];
    
    console.log(`📦 Found ${projects.length} projects`);
    
    for (const project of projects) {
      if (!project.slug) continue;
      
      const projectTitle = project.name?.en || project.name?.ar || project.name || 'Project';
      const projectDesc = project.locationDescription?.en || project.locationDescription?.ar || 
                        `Discover ${projectTitle} in Egypt. Premium real estate by VALORA.`;
      const projectImage = project.mainImage || defaultImage;
      
      const meta = {
        title: `${projectTitle} - VALORA`,
        description: projectDesc.substring(0, 200), // Limit description length
        image: projectImage,
        url: `${baseUrl}/projects/${project.slug}`,
      };
      
      const filePath = path.join(distDir, 'projects', project.slug, 'index.html');
      const dirPath = path.dirname(filePath);
      
      // Create directory
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      // Generate and write HTML
      const html = generateHTML(meta);
      fs.writeFileSync(filePath, html);
      console.log(`✅ Generated: projects/${project.slug}/index.html`);
    }
    
    console.log('\n🎉 Project pages generated successfully!');
  } catch (error) {
    console.error('❌ Error generating project pages:', error.message);
  }
}

generateProjectPages();
