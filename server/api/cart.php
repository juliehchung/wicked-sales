<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  if (!isset($_SESSION['cart_id'])) {
    $response['body'] = [];
    send($response);
  } else {
    $currentCart = $_SESSION['cart_id'];
    $sqlAllCartItems = "SELECT * FROM cartItems WHERE cartItems.cartId = $currentCart";
    $cartQuery = mysqli_query($link, $sqlAllCartItems);
    $cartItems = mysqli_fetch_assoc($cartQuery);
    $response['body'] = $cartItems;
    send($response);
  }
}

if ($request['method'] === 'POST') {
  $productId = $request['body']['productId'];
  if (!isset($productId) || !is_numeric($productId) || intval($productId) === 0) {
    throw new ApiError('Valid ProductId Required', 400);
  } else {
    $sqlPrice = "SELECT price FROM products WHERE productId = $productId";
    $priceQuery = mysqli_query($link, $sqlPrice);
    $prodRows = mysqli_num_rows($priceQuery);
    if ($prodRows === 0) {
      throw new ApiError('Valid ProductId Required', 400);
    }
    $price = mysqli_fetch_assoc($priceQuery);
    $sqlCreatedAt = "INSERT INTO carts (createdAt) VALUES (CURRENT_TIMESTAMP)";
    $createdAtQuery = mysqli_query($link, $sqlCreatedAt);
    $cartId = mysqli_insert_id($link);
    $sqlCartItems = "INSERT INTO cartItems (cartId, productId, price) VALUES ($cartId, $productId, {$price['price']})";
    $cartItemsQuery = mysqli_query($link, $sqlCartItems);
    $cartItemId = mysqli_insert_id($link);
    $sqlProdCart = "SELECT cartItems.cartItemId, products.productId, products.name, products.price, products.image, products.shortDescription
                    FROM products JOIN cartItems ON products.productId = cartItems.productId WHERE cartItems.cartItemId = $cartItemId";
    $prodCartQuery = mysqli_query($link, $sqlProdCart);
    $prodCart = mysqli_fetch_assoc($prodCartQuery);
    $_SESSION['cart_id'] = $cartId;
    $response['body'] = $prodCart;
    send($response);
  }
}
