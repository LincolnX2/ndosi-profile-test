const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function createTestImage() {
  const fixturesDir = path.join(__dirname, '../fixtures');
  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
  }

  const imagePath = path.join(fixturesDir, 'test-image.png');

  if (fs.existsSync(imagePath)) {
    console.log('? Test image already exists at:', imagePath);
    return imagePath;
  }

  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 200, 200);
  gradient.addColorStop(0, '#FF6B6B');
  gradient.addColorStop(0.5, '#4ECDC4');
  gradient.addColorStop(1, '#45B7D1');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 200, 200);

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 196, 196);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TEST', 100, 100);

  ctx.beginPath();
  ctx.arc(50, 50, 20, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(150, 150, 20, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fill();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(imagePath, buffer);

  console.log('? Test image created at:', imagePath);
  return imagePath;
}

createTestImage();
