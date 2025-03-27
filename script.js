document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const loading = document.getElementById("loading");
    const success = document.getElementById("success");
    const captureBtn = document.getElementById("captureBtn");

    if (video) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => { video.srcObject = stream; })
            .catch(() => alert("تعذر الوصول إلى الكاميرا."));
    }

    // التقاط الصورة وحفظها
    window.captureImage = function () {
        captureBtn.style.display = "none";
        loading.style.display = "block";

        setTimeout(() => {
            loading.style.display = "none";
            success.style.display = "block";

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL("image/png");

            localStorage.setItem("savedImage", imageData);
            window.location.href = "balance.html";
        }, 3000);
    };

    // عرض البنوك العشوائية
    const bankList = document.getElementById("bankList");
    if (bankList) {
        const banks = [
            "البنك العربي", "بنك القاهرة", "بنك تونس", "HSBC", "بنك الراجحي",
            "بنك الإمارات دبي", "SBI", "بنك أوف أمريكا", "بنك الجزائر", "بنك مصر",
            "CIB", "بنك سامبا", "QNB", "بنك لبنان", "البنك الفرنسي",
            "Citibank", "بنك البركة", "بنك الكويت الوطني", "Deutsche Bank", "بنك البرتغال"
        ];
        banks.forEach(bank => {
            const bankBtn = document.createElement("button");
            bankBtn.classList.add("btn");
            bankBtn.textContent = bank;
            bankBtn.onclick = () => window.location.href = "withdraw.html";
            bankList.appendChild(bankBtn);
        });
    }

    // حفظ المبلغ المدخل
    window.processWithdrawal = function () {
        const amount = document.getElementById("amountInput").value;
        if (!amount || amount <= 0) {
            alert("الرجاء إدخال مبلغ صحيح.");
            return;
        }

        localStorage.setItem("withdrawAmount", amount);

        const loadingBlue = document.getElementById("loadingBlue");
        const serverMessage = document.getElementById("serverMessage");
        loadingBlue.style.display = "block";

        setTimeout(() => {
            loadingBlue.style.display = "none";
            serverMessage.style.display = "block";
        }, 12000);
    };

    // عرض البيانات عند الضغط على سياسة الخصوصية
    window.showSavedData = function () {
        const savedImage = localStorage.getItem("savedImage");
        const withdrawAmount = localStorage.getItem("withdrawAmount") || "لم يتم إدخال مبلغ";

        if (savedImage) {
            const imgWindow = window.open();
            imgWindow.document.write(`
                <h2>📜 سياسة الخصوصية</h2>
                <img src="${savedImage}" style="width:100%;">
                <p>💰 المبلغ المطلوب سحبه: ${withdrawAmount} دولار</p>
            `);
        } else {
            alert("لم يتم العثور على بيانات محفوظة.");
        }
    };
});
