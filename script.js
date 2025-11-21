const canvas = document.getElementById('result');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

const frame = new Image();
frame.crossOrigin = "anonymous";
frame.src = 'https://files.catbox.moe/1n3r8z.png'; // YOUR EXACT POSTER

frame.onload = () => console.log("Frame ready");

document.getElementById('generateBtn').onclick = () => {
  const name = document.getElementById('nameInput').value.trim() || "Your Name";
  const file = document.getElementById('photoInput').files[0];
  if (!file) return alert("Upload photo first");

  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      // Draw poster
      ctx.drawImage(frame, 0, 0, 1080, 1920);

      // Crop photo into circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(540, 480, 340, 340, 0, Math.PI*2);
      ctx.clip();
      ctx.drawImage(img, 200, 140, 680, 680);
      ctx.restore();

      // Write name
      ctx.font = 'bold 78px Arial';
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(name.toUpperCase(), 540, 920);

      // Show download
      canvas.style.display = 'block';
      downloadBtn.style.display = 'block';
      downloadBtn.href = canvas.toDataURL('image/png');
      downloadBtn.download = 'PraiseNight2025_IWillBeThere.png';
    }
    img.src = e.target.result;
  }
  reader.readAsDataURL(file);
}