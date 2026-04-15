// 您的 GAS Web App URL (請替換為您在第二階段取得的真實網址)
const API_URL = "https://script.google.com/macros/s/AKfycbwD935znh0g0fCDu29F5gg7bmbeGvkKtCAu_2twp9i2QfEANxvXTStCsrCxvyT_H5U8/exec";

async function fetchPortfolio() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderDashboard(data);
    } catch (error) {
        console.error("資料獲取失敗:", error);
    }
}

function renderDashboard(data) {
  const container = document.getElementById('stock-list');
  container.innerHTML = ''; 

  // 從第二列開始遍歷 (跳過標題列)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const ticker = row[0]; // A 欄：代號
    const name = row[1];   // B 欄：名稱
    const profit = row[5]; // F 欄：盈虧

    if (!ticker) continue; 

    const card = document.createElement('div');
    card.className = 'stock-card';
    
    // 這裡加入名稱顯示
    card.innerHTML = `
      <div class="card-content">
        <h3>${ticker} ${name || ''}</h3>
        <p>盈虧: ${profit || '0'}</p>
      </div>
    `;
    container.appendChild(card);
  }
}
// 頁面載入時執行
fetchPortfolio();
