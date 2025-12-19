// --- 4. Follower Dog Logic (Corgi Version) ---
const dog = document.getElementById("follower-dog");

// Link ảnh GIF (Bạn có thể tải về máy để chạy ổn định hơn)
// Ảnh đang chạy (Running GIF)
const runningURL =
  "https://img1.picmix.com/output/stamp/normal/8/5/2/9/1509258_def8a.gif";
// Ảnh đang ngồi/đứng yên (Idle GIF)
const idleURL =
  "https://img1.picmix.com/output/stamp/normal/5/9/2/9/1509295_f825e.gif";

if (dog) {
  // Vị trí ban đầu
  let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let vel = { x: 0, y: 0 };
  let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  // Cấu hình vật lý (Tăng độ nặng để cảm giác "bước đi" thật hơn)
  const SPRING = 0.08; // Lò xo cứng hơn chút để phản ứng nhanh
  const FRICTION = 0.85; // Ma sát cao hơn để dừng lại dứt khoát

  // Trạng thái
  let isMoving = false;
  let currentFacing = 1; // 1 = Phải, -1 = Trái

  // Mặc định ảnh ngồi
  dog.style.backgroundImage = `url('${idleURL}')`;

  // Cập nhật vị trí chuột
  document.addEventListener("mousemove", (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
  });

  function animateDog() {
    // 1. Tính toán vật lý (Di chuyển mượt mà)
    const dx = target.x - pos.x;
    const dy = target.y - pos.y;

    vel.x += dx * SPRING;
    vel.y += dy * SPRING;

    vel.x *= FRICTION;
    vel.y *= FRICTION;

    pos.x += vel.x;
    pos.y += vel.y;

    // 2. Tính tốc độ để xác định đang chạy hay đứng
    const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Ngưỡng để coi là đang chạy (speed > 1)
    const isRunning = speed > 1 || distance > 50;

    // 3. Xử lý quay đầu (Facing)
    // Nếu di chuyển sang phải (vel.x > 0.5) -> scaleX(1)
    // Nếu di chuyển sang trái (vel.x < -0.5) -> scaleX(-1)
    // Lưu ý: Cần trừ đi offset chiều rộng ảnh để căn giữa chuột
    if (vel.x > 0.5) currentFacing = 1;
    if (vel.x < -0.5) currentFacing = -1;

    if (isRunning) {
      if (!isMoving) {
        isMoving = true;
        dog.style.backgroundImage = `url('${runningURL}')`;
      }

      // Khi chạy: Chỉ di chuyển, KHÔNG bobbing (vì GIF đã nhún nhảy rồi)
      // Offset -40px để tâm con chó nằm giữa con chuột
      dog.style.transform = `translate(${pos.x - 40}px, ${
        pos.y - 60
      }px) scaleX(${currentFacing})`;
    } else {
      if (isMoving) {
        isMoving = false;
        dog.style.backgroundImage = `url('${idleURL}')`;
      }

      // Khi đứng yên: Có thể thêm hiệu ứng thở nhẹ (tùy chọn)
      dog.style.transform = `translate(${pos.x - 40}px, ${
        pos.y - 60
      }px) scaleX(${currentFacing})`;
    }

    requestAnimationFrame(animateDog);
  }

  animateDog();
}
