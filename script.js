// 1. 設定 API 網址 (請填入您 GAS 部署後的正式網址)
const API_URL = "https://script.google.com/macros/s/AKfycbwD935znh0g0fCDu29F5gg7bmbeGvkKtCAu_2twp9i2QfEANxvXTStCsrCxvyT_H5U8/exec";

// 2. 當頁面載入時執行
document.addEventListener("DOMContentLoaded", function() {
    fetchData();
});

// 3. 從 Google Apps Script 獲取 JSON 資料
function fetchData() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            renderDashboard(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// 4. 智慧渲染與歸併邏輯
function renderDashboard(data) {
    const container = document.getElementById('stock-list');
    container.innerHTML = '';
    
    // 用來儲存歸併後的資料
    const summary = {};
    
    // data[0] 是標題列，我們從 i=1 開始遍歷
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const ticker = (row[0] || "").toString().trim().toUpperCase(); // A 欄：代號
        const name   = row[1] || "";                                   // B 欄：名稱
        const shares = parseFloat(row[2] || 0);                        // C 欄：股數
        const cost   = parseFloat(row[3] || 0);                        // D 欄：平均成本
        const profit = parseFloat(row[5] || 0);                        // F 欄：盈虧
        
        if (!ticker) continue;
        
        // 如果該股票尚未出現，初始化物件
        if (!summary[ticker]) {
            summary[ticker] = { name: name, shares: 0, cost: 0, profit: 0 };
        }
        
        // 進行加總
        summary[ticker].shares += shares;
        summary[ticker].cost += cost;
        summary[ticker].profit += profit;
    }
    
    // 5. 產生 HTML 卡片
    for (let ticker in summary) {
        const item = summary[ticker];
        const card = document.createElement('div');
        card.className = 'stock-card';
        
        // 將數值加入卡片，並使用 toLocaleString() 增加千分位符號
        card.innerHTML = `
            <h3>${ticker} ${item.name}</h3>
            <div class="card-info">
                <p>總股數: ${item.shares.toLocaleString()} 股</p>
                <p>平均成本: ${item.cost.toLocaleString()}</p>
                <p><strong>總盈虧: ${item.profit.toLocaleString()}</strong></p>
            </div>
        `;
        container.appendChild(card);
    }
}
