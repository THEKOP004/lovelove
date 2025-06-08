const couponListEl = document.getElementById('couponList');
const addCouponForm = document.getElementById('addCouponForm');
const couponTitleInput = document.getElementById('couponTitle');
const couponDescInput = document.getElementById('couponDesc');
const themeSelector = document.getElementById('themeSelector');

let coupons = JSON.parse(localStorage.getItem('giftCoupons')) || [
  { id: 1, title: 'ทำอาหารเย็นให้หน่อย', desc: 'ขอให้ทำอาหารเย็นให้คุณได้', used: false },
  { id: 2, title: 'ดูหนังด้วยกัน', desc: 'ใช้สำหรับดูหนังด้วยกัน', used: false },
  { id: 3, title: 'กอดฟรี 10 นาที', desc: 'ได้กอดอุ่นๆ เต็มอิ่ม 10 นาที', used: false },
];

let currentTheme = localStorage.getItem('couponTheme') || 'pink';
document.body.classList.add(`theme-${currentTheme}`);
themeSelector.value = currentTheme;

themeSelector.addEventListener('change', e => {
  document.body.classList.remove(`theme-${currentTheme}`);
  currentTheme = e.target.value;
  document.body.classList.add(`theme-${currentTheme}`);
  localStorage.setItem('couponTheme', currentTheme);
});

function saveCoupons() {
  localStorage.setItem('giftCoupons', JSON.stringify(coupons));
}

function checkExpirationAndReset() {
  const now = new Date();
  const lastResetStr = localStorage.getItem('lastResetDate');
  const lastResetDate = lastResetStr ? new Date(lastResetStr) : null;

  if (!lastResetDate || (now.getMonth() !== lastResetDate.getMonth() || now.getFullYear() !== lastResetDate.getFullYear())) {
    coupons.forEach(c => c.used = false);
    localStorage.setItem('lastResetDate', now.toISOString());
    saveCoupons();
  }

  coupons.forEach(c => {
    if (c.expiryDate) {
      c.isExpired = new Date(c.expiryDate) < now;
    } else {
      c.isExpired = false;
    }
  });
}

function renderCoupons() {
  checkExpirationAndReset();
  couponListEl.innerHTML = '';
  coupons.forEach(coupon => {
    const card = document.createElement('div');
    card.className = 'coupon-card';
    if (coupon.used) card.classList.add('used');
    if (coupon.isExpired) card.classList.add('expired');

    card.innerHTML = `
      <button class="delete-btn" title="ลบคูปอง">×</button>
      <div class="coupon-title">${coupon.title}</div>
      <div class="coupon-desc">${coupon.desc}</div>
      <div style="font-size:12px;">${coupon.expiryDate ? 'หมดอายุ: ' + new Date(coupon.expiryDate).toLocaleDateString() : ''}</div>
      <button class="redeem-btn" ${coupon.used || coupon.isExpired ? 'disabled' : ''}>
        ${coupon.used ? 'ใช้แล้ว' : (coupon.isExpired ? 'หมดอายุ' : 'แลกใช้')}
      </button>
    `;

    card.querySelector('.delete-btn').addEventListener('click', () => {
      if (confirm(`ลบคูปอง "${coupon.title}" ใช่ไหม?`)) {
        coupons = coupons.filter(c => c.id !== coupon.id);
        saveCoupons();
        renderCoupons();
      }
    });

    card.querySelector('.redeem-btn').addEventListener('click', () => {
      if (coupon.isExpired) return alert('คูปองหมดอายุแล้ว 😢');
      if (confirm(`คุณต้องการแลกใช้คูปอง "${coupon.title}" ใช่ไหม?`)) {
        coupon.used = true;
        saveCoupons();
        renderCoupons();
        alert('แลกใช้สำเร็จ! ❤️');
      }
    });

    couponListEl.appendChild(card);
  });
}

addCouponForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = couponTitleInput.value.trim();
  const desc = couponDescInput.value.trim();
  if (!title || !desc) return;

  let expiryDate = prompt("ระบุวันหมดอายุ (yyyy-mm-dd) หรือเว้นว่างไว้ถ้าไม่ต้องการ:");
  if (expiryDate && !/^\d{4}-\d{2}-\d{2}$/.test(expiryDate)) {
    return alert('รูปแบบวันหมดอายุไม่ถูกต้อง (yyyy-mm-dd)');
  }

  const newCoupon = {
    id: Date.now(),
    title,
    desc,
    used: false,
    expiryDate: expiryDate || null,
    isExpired: false,
  };

  coupons.push(newCoupon);
  saveCoupons();
  renderCoupons();

  couponTitleInput.value = '';
  couponDescInput.value = '';
});

renderCoupons();
