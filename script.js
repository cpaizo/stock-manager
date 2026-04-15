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
    // 假設 data[0] 是標題列，data[1] 開始是資料
    // 我們選取一個 div 來顯示資料
    const container = document.getElementById('stock-list');
    container.innerHTML = ''; // 清空目前顯示
    
    // 循環處理資料並建立卡片
    data.slice(1).forEach(row => {
        const [ticker, name, qty, cost, price, profit] = row;
        const card = document.createElement('div');
        card.className = 'stock-card';
        card.innerHTML = `
            <div><strong>${ticker} ${name}</strong><br><small>${qty} 股</small></div>
            <div class="${profit >= 0 ? 'profit' : 'loss'}">
                ${profit >= 0 ? '+' : ''}${profit}
            </div>
        `;
        container.appendChild(card);
    });
}

// 頁面載入時執行
fetchPortfolio();
