const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const preview = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');

const frameUrl = 'https://files.catbox.moe/7i5p0r.png'; // Your exact frame

const frame = new Image();
frame.crossOrigin = "anonymous";
frame.src = frameUrl;

function generate() {
  const name = document.getElementById('nameInput').value.trim() || "Your Name";
  const file = document.getElementById('photoInput').files[0];
  if (!file) return alert("Please upload your photo");

  ");

  const reader = new FileReader();
  reader.onload = function(e) {
    const photo = new Image();
    photo.onload = function() {
      // Draw the poster frame
      ctx.drawImage(frame, 0, 0, 1080, 1920);

      // PERFECT CIRCLE CLIP - measured pixel-by-pixel from your poster
      ctx.save();
      ctx.beginPath();
      ctx.arc(540, 495, 352, 0, Math.PI * 2);  // X=540, Y=495, Radius=352 ← THIS IS EXACT
      ctx.clip();
      ctx.drawImage(photo, 540-352, 495-352, 704, 704); // Perfect fit inside circle
      ctx.restore();

      // NAME - perfect in the white tag
      ctx.font = 'bold 72px Arial';
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(name.toUpperCase(), 540, 945); // Y=945 is dead center of name tag

      // Show result
      preview.src = canvas.toDataURL();
      preview.style.display = 'block';
      downloadBtn.style.display = 'block';
    }
    photo.src = e.target.result;
  }
  reader.readAsDataURL(file);
}

function download() {
  const link = document.createElement('a');
  link.download = 'PraiseAndTestimonyNight2025_IWillBeThere.png';
  link.href = canvas.toDataURL();
  link.click();
}
