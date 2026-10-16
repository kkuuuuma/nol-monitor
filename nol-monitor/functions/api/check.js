export async function onRequest(context) {
  // 这里未来填入你抓包获取的 NOL World 官方接口
  // 目前先返回模拟的分区数据让你看到效果
  const mockData = [
    {
      gradeName: "VIP 席",
      totalAvailable: 5,
      blocks: [
        { blockName: "Floor A区", count: 2 },
        { blockName: "Floor B区", count: 3 }
      ]
    }
  ];

  return new Response(JSON.stringify({ success: true, data: mockData }), {
    headers: { "Content-Type": "application/json;charset=utf-8" }
  });
}