<?php

$link = get_db_link();
$cartId = $_SESSION['cart_id'];

if ($request['method'] === 'GET') {
  if (!isset($_SESSION['cart_id'])) {
    $response['body'] = [];
    send($response);
  } else {
    $sqlAllCartItems = "SELECT *
                          FROM cartItems AS c
                          JOIN products AS p
                            ON p.productId = c.productId
                         WHERE c.cartId = $cartId";
    $cartQuery = mysqli_query($link, $sqlAllCartItems);
    $cartItems = mysqli_fetch_all($cartQuery, MYSQLI_ASSOC);
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
    if (!isset($_SESSION['cart_id'])) {
      $createdAtQuery = mysqli_query($link, $sqlCreatedAt);
      $cartId = mysqli_insert_id($link);
    }
    $sqlCartItems = "INSERT INTO cartItems (cartId, productId, price)
                          VALUES ($cartId, $productId, {$price['price']})";
    $cartItemsQuery = mysqli_query($link, $sqlCartItems);
    $cartItemId = mysqli_insert_id($link);
    $sqlProdCart = "SELECT c.cartItemId, p.productId, p.name, p.price, p.image, p.shortDescription
                      FROM products AS p
                      JOIN cartItems AS c
                        ON p.productId = c.productId
                     WHERE c.cartItemId = $cartItemId";
    $prodCartQuery = mysqli_query($link, $sqlProdCart);
    $prodCart = mysqli_fetch_assoc($prodCartQuery);
    $_SESSION['cart_id'] = $cartId;
    $response['body'] = $prodCart;
    send($response);
  }
}

if ($request['method'] === 'DELETE') {
  $cartItemId = $request['body']['cartItemId'];
  $productId = $request['body']['productId'];
  if (!isset($productId) || !isset($cartItemId)) {
    throw new ApiError('Valid Product Required', 400);
  } else {
    $sqlRemove = "DELETE FROM cartItems
                        WHERE cartItemId = $cartItemId
                          AND productId = $productId
                          AND cartId = $cartId";
    $removeQuery = mysqli_query($link, $sqlRemove);
    $response['body'] = 'Product removed from cart';
    send($response);
  }
}
