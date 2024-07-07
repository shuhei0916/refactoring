// plays.json データ
const plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
  };
  
  // invoices.json データ
  const invoices = [
    {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "hamlet",
          "audience": 55
        },
        {
          "playID": "as-like",
          "audience": 35
        },
        {
          "playID": "othello",
          "audience": 40
        }
      ]
    }
  ];

// 関数の戻り値の変数はresultとする
function amountFor(aPerformance, play) {
  let result = 0;
  switch (play.type) {
    case "tragedy":
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default: // switch文の中でほかの全てのcase条件に一致しなかった場合に実行されるセクション
        throw new Error(`unknown type: ${play.type}`);
    }
  return result;
}

function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    // Intl.NumberFormatはjsの組み込みオブジェクトで、数値を言語に応じて適切な形式に変換するために使用される。
    const format = new Intl.NumberFormat("en-US",
                          { style: "currency", currency: "USD",
                            minimumFractionDigits: 2 }).format;
  
    for (let perf of invoice.performances) {
      const play = plays[perf.playID];
      let thisAmount = amountFor(perf, play);
  
      // add volume credits
      volumeCredits += Math.max(perf.audience - 30, 0);
      // add extra credit for every ten comedy attendees
      if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
  
      // print line for this order
      result += `  ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
      totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

console.log("hehe");
console.log(invoices[0])
console.log(plays.hamlet)
console.log(statement(invoices[0], plays));
// console.log(statement())

// for (let perf of invoices[0].performances) {
//   console.log(perf);
// }