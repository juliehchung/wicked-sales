<?php

$link = get_db_link();
$cartId = $_SESSION['cart_id'];

if ($request['method'] === 'POST') {
  if (!isset($cartId)) {
    throw new ApiError('Active Shopping Cart Required', 400);
  } else {
    $fullName = $request['body']['fullName'];
    $address = $request['body']['address'];
    $cardHolder = $request['body']['cardHolder'];
    $card = $request['body']['card'];
    $expiration = $request['body']['expiration'];
    $cvv = $request['body']['cvv'];
    if (!isset($fullName) || !isset($address) || !isset($cardHolder) || !isset($card) || !isset($expiration) || !isset($cvv)) {
      throw new ApiError("This field is Required", 400);
    }
    $sqlOrdersInsert = "INSERT INTO orders (cartId, fullName, address, cardHolder, card, expiration, cvv)
                             VALUES (?, ?, ?, ?, ?, ?, ?)";
    $statement = mysqli_prepare($link, $sqlOrdersInsert);
    mysqli_stmt_bind_param($statement, "isssiii", $cartId, $fullName, $address, $cardHolder, $card, $expiration, $cvv);
    mysqli_stmt_execute($statement);
    $orderId = mysqli_insert_id($link);
    $sqlOrders = "SELECT * FROM orders WHERE orderId = $orderId";
    $ordersQuery = mysqli_query($link, $sqlOrders);
    $orders = mysqli_fetch_assoc($ordersQuery);
    unset($_SESSION['cart_id']);
    $response['body'] = $orders;
    send($response);
  }
}
