// // plays.json データ
// const plays = {
//   "hamlet": { "name": "Hamlet", "type": "tragedy" },
//   "as-like": { "name": "As You Like It", "type": "comedy" },
//   "othello": { "name": "Othello", "type": "tragedy" }
// };

// // invoices.json データ
// const invoices = [
//   {
//     "customer": "BigCo",
//     "performances": [
//       {
//         "playID": "hamlet",
//         "audience": 55
//       },
//       {
//         "playID": "as-like",
//         "audience": 35
//       },
//       {
//         "playID": "othello",
//         "audience": 40
//       }
//     ]
//   }
// ];

// function statement(invoice, plays) {
//   return renderPlainText(createSteatmentData(invoice, plays));
// }

// function renderPlainText(data, plays) {
//   let result = `Statement for ${data.customer}\n`;
//   for (let perf of data.performances) {
//     // 注文の内訳を出力
//     result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
//   }
//   result += `Amount owed is ${usd(data.totalAmount)}\n`;
//   result += `You earned ${data.totalVolumeCredits} credits\n`;
//   return result;

//   function usd(aNumber) {
//     // Intl.NumberFormatはjsの組み込みオブジェクトで、数値を言語に応じて適切な形式に変換するために使用される。
//     return new Intl.NumberFormat("en-US",
//       {
//         style: "currency", currency: "USD",
//         minimumFractionDigits: 2
//       }).format(aNumber);
//   }
// }
// console.log("hello");
// // import createSteatmentData  from "./createStatementData.js";


// // console.log("hoge");

// // createSteatmentData(invoices[0], plays);

// // console.log("hehe");
// // console.log(invoices[0])
// // console.log(plays.hamlet)
// // console.log(statement(invoices[0], plays));
// // console.log(statement())

// // for (let perf of invoices[0].performances) {
// //   console.log(perf);
// // }

console.log("hello");