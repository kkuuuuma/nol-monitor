export async function onRequest(context) {
  try {
    // 這裡放入你帶有多個 blockKeys 的完整官方 Interpark 請求網址
    const targetUrl = "https://tickets.interpark.com/onestop/api/seatStatus?goodsCode=26013132&placeCode=26001152&playSeq=001&blockKeys=001%3A3A001&blockKeys=001%3A3A002&blockKeys=001%3A3A003&bizCode=88889"; 
    
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://tickets.interpark.com/"
      }
    });
    
    const rawData = await response.json();

    // 將官方返回的多區塊原始數據直接交給前端渲染
    return new Response(JSON.stringify({ success: true, data: rawData }), {
      headers: { "Content-Type": "application/json;charset=utf-8" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json;charset=utf-8" }
    });
  }
}
