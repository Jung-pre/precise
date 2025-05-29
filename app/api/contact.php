<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// POST 데이터 받기
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit;
}

// 필수 필드 확인
$required_fields = ['name', 'email', 'phone', 'message'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

// 이메일 설정
$to = 'mm11zz@naver.com';
$subject = "New Contact Form Submission from {$data['name']}";

// 이메일 본문 구성
$message = "
<html>
<head>
    <title>New Contact Form Submission</title>
</head>
<body>
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {$data['name']}</p>
    <p><strong>Email:</strong> {$data['email']}</p>
    <p><strong>Phone:</strong> {$data['phone']}</p>
    <p><strong>Message:</strong> {$data['message']}</p>
</body>
</html>
";

// 헤더 설정 (고정된 From/Reply-To)
$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: tpdla2002@gmail.com',
    'Reply-To: tpdla2002@gmail.com',
    'X-Mailer: PHP/' . phpversion()
);

// 이메일 전송
$mail_sent = mail($to, $subject, $message, implode("\r\n", $headers));

if ($mail_sent) {
    echo json_encode(['message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?> 