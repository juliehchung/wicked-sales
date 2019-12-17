<?php

$link = get_db_link();
$cartId = $_SESSION['cart_id'];

if ($request['method'] === 'POST') {
  if (!isset($cartId)) {
    throw new ApiError('Active Shopping Cart Required', 400);
  } else {
    $requestBody = $request['body'];
    $name = $requestBody['name'];
    $creditCard = $requestBody['creditCard'];
    $shippingAddress = $requestBody['shippingAddress'];
    if (!isset($name)) {
      throw new ApiError("Name is Required", 400);
    }
    if (!isset($creditCard)) {
      throw new ApiError("Credit Card is Required", 400);
    }
    if (!isset($shippingAddress)) {
      throw new ApiError("Shipping Address is Required", 400);
    }
    $sqlOrdersInsert = "INSERT INTO orders (cartId, name, creditCard, shippingAddress) VALUES (?, ?, ?, ?)";
    $statement = mysqli_prepare($link, $sqlOrdersInsert);
    mysqli_stmt_bind_param($statement, "isss", $cartId, $name, $creditCard, $shippingAddress);
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
