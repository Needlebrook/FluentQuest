<?php
// chat.php

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$message = $data["message"];
$language = $data["language"];

$apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your actual API key

$systemPrompt = "You are a helpful language tutor. Speak to the user in $language. After 3 exchanges, start giving a short explanation or correction in English.";

// Call OpenAI
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Content-Type: application/json',
  'Authorization: Bearer ' . $apiKey,
]);

// Keep a simple conversation history with limited turns
$messages = [
  ["role" => "system", "content" => $systemPrompt],
  ["role" => "user", "content" => $message]
];

curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
  "model" => "gpt-3.5-turbo",
  "messages" => $messages
]));

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);

$reply = $result['choices'][0]['message']['content'];

echo json_encode(["reply" => $reply]);
?>
