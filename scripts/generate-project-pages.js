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

function slugify(text) {
  if (!text) return '';
  return encodeURIComponent(
    text
      .toString()
      .normalize('NFKD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
  );
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
// Build asset tags using the compiled assets in dist/assets
function buildAssetsTags(distDir) {
  const assetsDir = path.join(distDir, 'assets');
  if (!fs.existsSync(assetsDir)) return '';

  const files = fs.readdirSync(assetsDir);
  const cssFiles = files.filter((f) => f.endsWith('.css'));
  const jsFiles = files.filter((f) => f.endsWith('.js'));

  const cssTags = cssFiles.map((f) => `<link rel="stylesheet" href="/assets/${f}" />`).join('\n    ');
  const jsTags = jsFiles.map((f) => `<script type="module" src="/assets/${f}"></script>`).join('\n    ');

  return `${cssTags}\n    ${jsTags}`.trim();
}

function generateHTMLWithAssets(meta, assetsHtml) {
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
    
    ${assetsHtml}
    <title>${meta.title}</title>
  </head>
  <body>
    <div id="root"></div>
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
    
    // Build assets HTML once
    const assetsHtml = buildAssetsTags(distDir);

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
      
      // Generate and write HTML (include correct assets)
      const html = generateHTMLWithAssets(meta, assetsHtml);
      fs.writeFileSync(filePath, html);
      // Also write a percent-encoded slug path so encoded URLs resolve on hosts
      // that serve encoded paths (e.g. /projects/%D9%... )
      try {
        const encodedSlug = encodeURIComponent(project.slug);
        const encodedPath = path.join(distDir, 'projects', encodedSlug, 'index.html');
        const encodedDir = path.dirname(encodedPath);
        if (!fs.existsSync(encodedDir)) fs.mkdirSync(encodedDir, { recursive: true });
        fs.writeFileSync(encodedPath, html);
      } catch (e) {
        // ignore encoding write failures
      }
      console.log(`✅ Generated: projects/${project.slug}/index.html`);

      // Also generate an English-name based slug (ASCII) so links can include the English name
      try {
        const enName = project.name?.en || projectTitle;
        const enSlug = slugify(enName) || project.slug;
        if (enSlug && enSlug !== project.slug) {
          const enFilePath = path.join(distDir, 'projects', enSlug, 'index.html');
          const enDir = path.dirname(enFilePath);
          if (!fs.existsSync(enDir)) fs.mkdirSync(enDir, { recursive: true });
          // update meta url to point to english slug
          const enMeta = { ...meta, url: `${baseUrl}/projects/${enSlug}` };
          const enHtml = generateHTMLWithAssets(enMeta, assetsHtml);
          fs.writeFileSync(enFilePath, enHtml);
          // also write encoded version
          try {
            const encodedEn = encodeURIComponent(enSlug);
            const encEnPath = path.join(distDir, 'projects', encodedEn, 'index.html');
            const encEnDir = path.dirname(encEnPath);
            if (!fs.existsSync(encEnDir)) fs.mkdirSync(encEnDir, { recursive: true });
            fs.writeFileSync(encEnPath, enHtml);
          } catch (e) {}
          console.log(`✅ Generated: projects/${enSlug}/index.html`);
        }
      } catch (e) {
        // ignore english-slug generation errors
      }
    }

    // Write manifest of generated project slugs for verification during deploy
    try {
      const manifest = projects.map((p) => {
        const en = p.name?.en ? slugify(p.name.en) : '';
        return {
          slug: p.slug,
          url: `${baseUrl}/projects/${p.slug}`,
          encoded: encodeURIComponent(p.slug),
          enSlug: en || null,
          enUrl: en ? `${baseUrl}/projects/${en}` : null,
        };
      });
      const manifestPath = path.join(distDir, 'projects', 'manifest.json');
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      console.log(`🗂️  Wrote projects manifest with ${manifest.length} entries`);
    } catch (e) {
      // ignore manifest errors
    }
    
  } catch (error) {
    console.error('❌ Error generating project pages:', error);
  }
}

generateProjectPages();
