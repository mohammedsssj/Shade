document.addEventListener("DOMContentLoaded", () => {
    const bankList = document.getElementById("bankList");
    const banks = [
        { name: "البنك العربي", value: "ARB" },
        { name: "بنك القاهرة", value: "CAI" },
        { name: "بنك تونس", value: "TUN" },
        { name: "HSBC", value: "HSBC" },
        { name: "بنك الراجحي", value: "RAJ" },
        { name: "بنك الإمارات دبي", value: "EMD" },
        { name: "SBI", value: "SBI" },
        { name: "بنك أوف أمريكا", value: "BOA" },
        { name: "بنك الجزائر", value: "ALG" },
        { name: "بنك مصر", value: "MIS" },
        { name: "CIB", value: "CIB" },
        { name: "بنك سامبا", value: "SAM" },
        { name: "QNB", value: "QNB" },
        { name: "بنك لبنان", value: "LEB" },
        { name: "البنك الفرنسي", value: "FR" },
        { name: "Citibank", value: "CITI" },
        { name: "بنك البركة", value: "BAR" },
        { name: "بنك الكويت الوطني", value: "NBK" },
        { name: "Deutsche Bank", value: "DB" },
        { name: "بنك البرتغال", value: "POR" }
    ];

    banks.forEach(bank => {
        const li = document.createElement("li");
        li.innerHTML = `${bank.name} <span>${bank.value}</span>`;
        li.onclick = () => window.location.href = "withdraw.html";
        bankList.appendChild(li);
    });
});
