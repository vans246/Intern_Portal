export const defaultCertificateHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 32px; background: #f2f4f8; color: #172033; font-family: Georgia, serif; }
    .certificate { max-width: 760px; min-height: 480px; margin: 0 auto; padding: 48px; background: #fff; border: 12px solid #d7b56d; text-align: center; }
    .eyebrow { color: #8b6b2d; font: 700 12px Arial, sans-serif; letter-spacing: 3px; text-transform: uppercase; }
    h1 { margin: 28px 0 18px; font-size: 42px; font-weight: 400; }
    p { font-size: 17px; line-height: 1.7; }
    .recipient { margin: 28px 0; font-size: 28px; }
    .signature { margin-top: 48px; font: 600 13px Arial, sans-serif; }
  </style>
</head>
<body>
  <main class="certificate">
    <div class="eyebrow">Certificate of Completion</div>
    <h1>Certificate of Achievement</h1>
    <p>This certificate is proudly presented to</p>
    <div class="recipient">Alex Morgan</div>
    <p>for successfully completing the internship program.</p>
    <div class="signature">UptoSkills · 2026</div>
  </main>
</body>
</html>`;
