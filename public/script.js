// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLightMode = document.body.classList.contains('light-mode');
  
  if (isLightMode) {
    icon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'dark');
  }
});

const boxes = document.querySelectorAll('.content-box');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Optional: stop observing after it's visible
    }
  });
},{
    threshold: 0.1
  });

  boxes.forEach(box => {
    observer.observe(box);
  });

// Portfolio slides
const files = [
  {
    url: "https://via.placeholder.com/800x600.png?text=PNG+Example",
    description: "This is a PNG render of the board layout."
  },
  {
    url: "https://personal-viewer.365.altium.com/client/index.html?feature=embed&source=6AA717A0-3BE5-4DAD-A963-0127AE169DCB&activeView=3D",
    description: "STP/STEP file viewed in Altium 365 online viewer."
  },
  {
    url: "https://viewer.autodwg.com/?url=https://example.com/sample.dxf",
    description: "DXF file rendered using embedded AutoDWG viewer."
  },
  {
    url: "https://example.com/schematic.dwg",
    description: "DWG file - should use an online DWG viewer."
  }
];

const stack = document.getElementById("stack");
const desc = document.getElementById("description");

let current = 0;

function getFileExtension(url) {
  return url.split('.').pop().split(/\#|\?/)[0].toLowerCase();
}

function createSlide(file, index) {
  const ext = getFileExtension(file.url);
  const card = document.createElement('div');
  card.className = 'file-card' + (index === 0 ? ' active' : '');

  if (ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'svg') {
    const img = document.createElement('img');
    img.src = file.url;
    img.loading = 'lazy';
    img.alt = file.description;
    card.appendChild(img);
  } else {
    const iframe = document.createElement('iframe');
    iframe.src = file.url;
    iframe.title = file.description;
    iframe.onerror = function() {
      card.innerHTML = `<div class="error">Could not load ${file.url}</div>`;
    };
    card.appendChild(iframe);
  }

  stack.appendChild(card);
}

files.forEach((file, index) => {
  createSlide(file, index);
});

const cards = document.querySelectorAll('#stack .file-card');

function showSlide(index) {
  cards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
  desc.textContent = files[index].description;
}

function nextSlide() {
  current = (current + 1) % cards.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + cards.length) % cards.length;
  showSlide(current);
}

// Certification stack
  document.addEventListener("DOMContentLoaded", function() {
  // Certification data
  const certifications = [
    {
      title: "RF and millimeter-Wave Circuit Design",
      issuer: "Eindhoven University of Technology",
      year: "2022",
      link: "https://www.coursera.org/account/accomplishments/records/EWPYUTMXYGKL"
    },
    {
      title: "Example Certification 2",
      issuer: "Example University",
      year: "2023",
      link: "#"
    },
    {
      title: "Example Certification 3",
      issuer: "Another Institution",
      year: "2021",
      link: "#"
    }
  ];

  // DOM elements
  const certStack = document.getElementById("cert-stack");
  const certDesc = document.getElementById("cert-description");

  // Create certification cards
  function createCertCards() {
    certifications.forEach((cert, index) => {
      const card = document.createElement('div');
      card.className = 'file-card';
      card.innerHTML = `
        <h3>${cert.title}</h3>
        <p>${cert.issuer}</p>
        <small>${cert.year}</small>
        ${cert.link ? `<a href="${cert.link}" target="_blank">View Certificate</a>` : ''}
      `;
      card.addEventListener('click', () => showCertDetails(index));
      certStack.appendChild(card);
    });
  }

  // Show certification details
  function showCertDetails(index) {
    const cert = certifications[index];
    certDesc.innerHTML = `
      <h3>${cert.title}</h3>
      <p><strong>Issuer:</strong> ${cert.issuer}</p>
      <p><strong>Year:</strong> ${cert.year}</p>
      ${cert.link ? `<a href="${cert.link}" target="_blank" class="btn">View Full Certificate</a>` : ''}
    `;
  }

  // Initialize
  createCertCards();
  if (certifications.length > 0) showCertDetails(0);
});

// Scroll function (must be in global scope)
function scrollCerts(direction) {
  const container = document.querySelector('.carousel-container');
  container.scrollBy({
    left: direction * 300,
    behavior: 'smooth'
  });
}

// === Contact Form ===
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log("Sending email..."); // Debug log
    try {
      await Email.send({
        Host: "smtp.office365.com",
        Username: "balaji3006@outlook.in",
        Password: "fhhrpuqmvoasleak",
        To: "balaji3006@outlook.in",
        Subject: `New message from ${name}`,
        Body: `Name: ${name}<br>Email: ${email}<br>Message: ${message}`
      });
      alert("Message sent!");
      form.reset();
    } catch (error) {
      console.error("SMTPJS Error:", error);
      alert("Failed to send. Try EmailJS or mailto.");
    }
  });
});

const vcfBtn = document.getElementById('vcf-download-btn');

vcfBtn.addEventListener('click', async (e) => {
  if (!/Android|iPhone|iPad/i.test(navigator.userAgent)) return;
  
  e.preventDefault();
  
  try {
    // Fetch the VCF file
    const response = await fetch('contact.vcf');
    const vcardData = await response.text();
    
    // Create downloadable blob
    const blob = new Blob([vcardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    // Trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact.vcf';
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
    
  } catch (error) {
    console.error('VCF download failed:', error);
    // Fallback to regular download
    window.location.href = 'contact.vcf';
  }
});