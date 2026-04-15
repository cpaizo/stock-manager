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
  container.innerHTML = ''; // 清空目前的顯示

  // 從第二列開始遍歷 (跳過標題列)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const ticker = row[0]; // A欄：代號
    
    // 【關鍵修改】：如果沒有代號，就跳過這行，不要產生卡片
    if (!ticker) continue; 

    // 產生卡片的邏輯...
    const card = document.createElement('div');
    card.className = 'stock-card';
    card.innerHTML = `<h3>${ticker}</h3><p>盈虧: ${row[5] || '0'}</p>`;
    container.appendChild(card);
  }
}

// 頁面載入時執行
fetchPortfolio();
