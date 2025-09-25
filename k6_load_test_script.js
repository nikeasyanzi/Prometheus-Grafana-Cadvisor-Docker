import http from "k6/http";
import { check, sleep } from "k6";

// 配置測試的階段（負載模式）
export const options = {
  stages: [
    { duration: "30s", target: 1000 }, // 30秒內提升到20個虛擬使用者
    { duration: "1m30s", target: 1000 }, // 1分30秒內降到10個虛擬使用者
    { duration: "20s", target: 0 }, // 20秒內逐步降到0個虛擬使用者
  ],
};

// 測試腳本的主要邏輯
export default function () {
  // 發送 GET 請求到目標 URL, Please use exported IP address
  const res = http.get("http://10.122.168.81:8082/stub_status");

  // 驗證請求的響應狀態碼是否為 200
  const checkRes = check(res, {
    "status was 200": (r) => r.status === 200,
  });

  // 如果需要，可以打印結果到控制台（可選）
  if (!checkRes) {
    console.error(`Request failed. Response status: ${res.status}`);
  }

  // 模擬用戶操作間的停頓
  sleep(1);
}
