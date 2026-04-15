const API_URL = "https://script.google.com/macros/s/AKfycbwD935znh0g0fCDu29F5gg7bmbeGvkKtCAu_2twp9i2QfEANxvXTStCsrCxvyT_H5U8/exec";

window.onload = async () => {
    const pwd = prompt("請輸入管理密碼");
    const response = await fetch(`${API_URL}?action=auth&pwd=${pwd}`);
    const result = await response.json();
    if (result.success) {
        document.getElementById('admin-container').style.display = 'block';
    } else {
        alert("密碼錯誤");
        window.location.href = "index.html";
    }
};

document.getElementById('admin-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        type: document.getElementById('type').value,
        amount: document.getElementById('amount').value,
        note: document.getElementById('note').value
    };
    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data)
    });
    alert("記錄成功！");
    location.reload();
});
