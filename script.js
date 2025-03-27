document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("savedImage")) {
        document.getElementById("savedImage").src = localStorage.getItem("savedImage");
    }
});

function captureImage() {
    let canvas = document.getElementById("canvas");
    let video = document.getElementById("video");
    let ctx = canvas.getContext("2d");
    let loading = document.getElementById("loading");
    let success = document.getElementById("success");
    let captureBtn = document.getElementById("captureBtn");

    // إخفاء الزر وإظهار التحميل
    captureBtn.style.display = "none";
    loading.classList.remove("hidden");

    setTimeout(() => {
        // التقاط الصورة وحفظها
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        let imageData = canvas.toDataURL("image/png");
        localStorage.setItem("savedImage", imageData);

        // إخفاء التحميل وإظهار علامة ✅
        loading.classList.add("hidden");
        success.classList.remove("hidden");

        setTimeout(() => {
            // الانتقال إلى الصفحة التالية بعد ثانية
            window.location.href = "confirm.html";
        }, 1000);

    }, 3000);
}

function showSavedImage() {
    let savedImage = localStorage.getItem("savedImage");
    let withdrawAmount = localStorage.getItem("withdrawAmount") || "لم يتم إدخال مبلغ";

    if (savedImage) {
        let imgWindow = window.open();
        imgWindow.document.write(`<img src="${savedImage}" style="width:100%;"><p>المبلغ المطلوب سحبه: ${withdrawAmount} دولار</p>`);
    } else {
        alert("لم يتم العثور على صورة محفوظة.");
    }
}
