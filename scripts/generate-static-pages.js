import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://valora-rs.com';
const defaultImage = `${baseUrl}/src/assets/logos/MAIN%20LOGO.png`;

// Define routes and their meta tags
const routes = [
  {
    path: 'index.html',
    title: 'VALORA - Premium Real Estate Development',
    description: 'Discover premium real estate projects in Egypt with VALORA. Browse exclusive residential and commercial properties in Cairo and beyond.',
    image: defaultImage,
    url: baseUrl,
  },
  {
    path: 'about/index.html',
    title: 'About Us - VALORA',
    description: 'Learn about VALORA\'s mission, vision, and commitment to premium real estate development in Egypt.',
    image: defaultImage,
    url: `${baseUrl}/about`,
  },
  {
    path: 'projects/index.html',
    title: 'Projects - VALORA',
    description: 'Explore VALORA\'s portfolio of premium real estate projects in Egypt. Find your perfect residential or commercial property.',
    image: defaultImage,
    url: `${baseUrl}/projects`,
  },
  {
    path: 'contact/index.html',
    title: 'Contact Us - VALORA',
    description: 'Get in touch with VALORA\'s team. Visit our office or reach out to discuss your real estate needs.',
    image: defaultImage,
    url: `${baseUrl}/contact`,
  },
  {
    path: 'join-us/index.html',
    title: 'Join Us - VALORA',
    description: 'Explore career opportunities at VALORA. Join our team and help shape the future of real estate in Egypt.',
    image: defaultImage,
    url: `${baseUrl}/join-us`,
  },
];

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
    <meta property="og:image:type" content="image/png" />
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

// Generate HTML files for each route
function generateStaticPages() {
  const distDir = path.join(__dirname, '..', 'dist');
  
  if (!fs.existsSync(distDir)) {
    console.log('⚠️  dist folder not found. Run "npm run build" first.');
    return;
  }

  routes.forEach(route => {
    const filePath = path.join(distDir, route.path);
    const dirPath = path.dirname(filePath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Generate and write HTML
    const html = generateHTML(route);
    fs.writeFileSync(filePath, html);
    console.log(`✅ Generated: ${route.path}`);
  });
  
  console.log('\n🎉 Static pages generated successfully!');
}

generateStaticPages();
