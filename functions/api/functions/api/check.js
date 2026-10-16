export async function onRequest(context) {
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
