export async function onRequest(context) {
  try {
    // 官方 Interpark 請求網址（包含多個 blockKeys 參數以監控不同分區）
    const targetUrl = "https://tickets.interpark.com/onestop/api/seatStatus?goodsCode=26013132&placeCode=26001152&playSeq=001&blockKeys=001%3A3A001&blockKeys=001%3A3A002&blockKeys=001%3A3A003&bizCode=88889"; 
    
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://tickets.interpark.com/"
      }
    });
    
    const rawData = await response.json();

    // 數據解析邏輯：將官方 bitmap 陣列轉化為各分區的真實餘票數
    // 這裡我們示範如何將接收到的 data 陣列進行解析
    let parsedBlocks = [];
    if (rawData && Array.isArray(rawData.data)) {
      // 假設我們監控的三個分區代碼對應過來
      const blockNames = ["3A001 區", "3A002 區", "3A003 區"];
      
      rawData.data.forEach((hexStr, index) => {
        // 簡單示範：計算十六進位字串中代表空位的特徵，或者將其轉為可用餘票估算
        // 實務上可以透過計算字串裏 "0" 的比例或長度來反應餘票
        let availableCount = calculateAvailableSeats(hexStr);
        
        parsedBlocks.push({
          blockName: blockNames[index] || `分區 #${index + 1}`,
          count: availableCount
        });
      });
    }

    const result = [
      {
        gradeName: "NOL World 實時監控場次",
        totalAvailable: parsedBlocks.reduce((sum, b) => sum + b.count, 0),
        blocks: parsedBlocks
      }
    ];

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { "Content-Type": "application/json;charset=utf-8" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json;charset=utf-8" }
    });
  }
}

// 簡易輔助函數：將座位圖 bitmap 轉換為可用票數
function calculateAvailableSeats(hexStr) {
  if (!hexStr) return 0;
  // 這裡可以根據實際需求調整計算方式，例如計算非零或特定字符的數量
  // 簡易示範：如果全是 0 代表全部可售，如果是滿編全塞則是其他情況
  let zeroCount = 0;
  for (let i = 0; i < hexStr.length; i++) {
    if (hexStr[i] === '0') zeroCount++;
  }
  // 根據位圖比例折算成大約的剩餘票數（可依實際測試微調）
  return Math.floor(zeroCount / 2);
}
