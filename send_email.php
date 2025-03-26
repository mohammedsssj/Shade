<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["image"]) || !isset($data["email"])) {
    echo json_encode(["status" => "error", "message" => "بيانات غير مكتملة"]);
    exit;
}

$imageData = str_replace("data:image/png;base64,", "", $data["image"]);
$imageData = base64_decode($imageData);
$imagePath = "uploads/" . time() . ".png";
file_put_contents($imagePath, $imageData);

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = "your-email@gmail.com";  // ضع بريدك الإلكتروني هنا
$mail->Password = "your-password";        // ضع كلمة المرور الخاصة بك هنا
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->setFrom($data["email"]);
$mail->addAddress("silversonicv@gmail.com");
$mail->Subject = "صورة تأكيد الهوية";
$mail->Body = "تم إرسال صورة من المستخدم: " . $data["email"];
$mail->addAttachment($imagePath);

if ($mail->send()) {
    unlink($imagePath);
    echo json_encode(["status" => "success", "message" => "تم إرسال الصورة بنجاح"]);
} else {
    echo json_encode(["status" => "error", "message" => "فشل في إرسال البريد الإلكتروني"]);
}
?>
