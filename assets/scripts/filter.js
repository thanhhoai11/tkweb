document.addEventListener("DOMContentLoaded", () => {

  /* ================== CHUẨN HÓA CHỮ ================== */
  function normalizeText(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d");
  }

  /* ================== BIẾN CHUNG ================== */
  const petListEl = document.getElementById("petList");
  const resultEl = document.getElementById("result");
  const perPage = 8;

  let currentPage = 1;

  /* JSON inline từ HTML */
  const jsonText = document.getElementById("pets-data").textContent;
  const allPets = JSON.parse(jsonText);
  let filteredPets = [...allPets];

  const pageNumbers = document.querySelector(".page-numbers");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  /* ================== RENDER THÚ CƯNG ================== */
  function renderPets(pets) {
    petListEl.innerHTML = "";

    pets.forEach(pet => {
      const div = document.createElement("div");
      div.className = "pet-card";

      div.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}">
        <h3>${pet.name}</h3>
        <p><b>Giới tính:</b> ${pet.gender === "duc" ? "Đực" : "Cái"}</p>
        <p><b>Tuổi:</b> ${
          pet.age === "tre" ? "Trẻ" :
          pet.age === "truongthanh" ? "Trưởng thành" : "Lớn tuổi"
        }</p>
        <p><b>Triệt sản:</b> ${
          pet.sterilized === "yes" ? "Đã triệt" :
          pet.sterilized === "no" ? "Chưa triệt" : "Chưa rõ"
        }</p>
      `;
      petListEl.appendChild(div);
    });
  }

  /* ================== RENDER TRANG ================== */
  function renderPage(page) {
    currentPage = page;

    const start = (page - 1) * perPage;
    const end = start + perPage;

    renderPets(filteredPets.slice(start, end));

    document.querySelectorAll(".page-numbers button")
      .forEach(btn => btn.classList.remove("active"));

    const activeBtn = document.querySelector(
      `.page-numbers button[data-page="${page}"]`
    );
    if (activeBtn) activeBtn.classList.add("active");
  }

  /* ================== TẠO PHÂN TRANG ================== */
  function createPagination() {
    pageNumbers.innerHTML = "";

    if (filteredPets.length === 0) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      return;
    }

    const totalPages = Math.ceil(filteredPets.length / perPage);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.dataset.page = i;
      btn.onclick = () => renderPage(i);
      pageNumbers.appendChild(btn);
    }

    prevBtn.style.display = totalPages > 1 ? "inline-block" : "none";
    nextBtn.style.display = totalPages > 1 ? "inline-block" : "none";
  }

  /* ================== TÌM KIẾM ================== */
  document.getElementById("searchBtn").onclick = () => {
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const sterilized = document.getElementById("sterilized").value;
    const color = document.getElementById("color").value;
    const keyword = normalizeText(
      document.getElementById("keyword").value
    );

    filteredPets = allPets.filter(pet =>
      (age === "all" || pet.age === age) &&
      (gender === "all" || pet.gender === gender) &&
      (sterilized === "all" || pet.sterilized === sterilized) &&
      (color === "all" || pet.color === color) &&
      (keyword === "" || normalizeText(pet.name).includes(keyword))
    );

    resultEl.innerHTML =
      filteredPets.length === 0
        ? "❌ Không tìm thấy thú cưng phù hợp"
        : "";

    currentPage = 1;
    createPagination();
    renderPage(1);
  };

  /* ================== CHÓ / MÈO ================== */
  document.querySelectorAll(".filter-type button").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".filter-type button")
        .forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const type = btn.dataset.type;
      filteredPets = allPets.filter(p =>
        type === "all" ? true : p.type === type
      );

      resultEl.innerHTML =
        filteredPets.length === 0
          ? "❌ Không có thú cưng trong danh mục này"
          : "";

      currentPage = 1;
      createPagination();
      renderPage(1);
    };
  });

  /* ================== PREV / NEXT ================== */
  prevBtn.onclick = () => {
    if (currentPage > 1) renderPage(currentPage - 1);
  };

  nextBtn.onclick = () => {
    const totalPages = Math.ceil(filteredPets.length / perPage);
    if (currentPage < totalPages) renderPage(currentPage + 1);
  };

  /* ================== REVEAL ON SCROLL ================== */
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);

  /* ================== KHỞI TẠO ================== */
  createPagination();
  renderPage(1);

});
