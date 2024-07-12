// plays.json データ
const plays = {
  "hamlet": { "name": "Hamlet", "type": "tragedy" },
  "as-like": { "name": "As You Like It", "type": "comedy" },
  "othello": { "name": "Othello", "type": "tragedy" }
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

function statement(invoice, plays) {
  return renderPlainText(createSteatmentData(invoice, plays));
}

function renderPlainText(data, plays) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    // 注文の内訳を出力
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}
function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>`
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}
function usd(aNumber) {
  // Intl.NumberFormatはjsの組み込みオブジェクトで、数値を言語に応じて適切な形式に変換するために使用される。
  return new Intl.NumberFormat("en-US",
    {
      style: "currency", currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber);
}


// 別ファイルに移動できなかったので、とりあえずここに書きます。
export default function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  console.log("statementData: ", statementData);
  return statementData;
  // return renderPlainText(statementData, plays);

  function enrichPerformance(aPerformance) {
    const calculater = new PerformanceCalculator(aPerformance);
      const result = Object.assign({}, aPerformance);
      result.play = playFor(result);
      result.amount = amountFor(result);
      result.volumeCredits = volumeCreditsFor(result);
      return result;
  }

  function playFor(aPerformance) {
      return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
      let result = 0;
      switch (aPerformance.play.type) {
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
              throw new Error(`unknown type: ${aPerformance.play.type}`);
      }
      return result;
  }

  function volumeCreditsFor(aPerformance) {
      let result = 0;
      result += Math.max(aPerformance.audience - 30, 0);
      if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
      return result;
  }

  function totalAmount(data) {
      return data.performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(data) {
      return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}

class PerformanceCalculator {
  constructor(aPerformance) {
    this.performance = aPerformance;
  }
}

function displayResult(html) {
  const resultElement = document.getElementById('result');
  result.innerHTML = html;
}

// console.log(invoices[0], plays);
console.log(createStatementData(invoices[0], plays));

displayResult(htmlStatement(invoices[0], plays));