<?php

if ($request['method'] === 'GET') {
  $link = get_db_link();
  $sql = "SELECT productId, name, price, image, shortDescription FROM products";
  $queryResult = mysqli_query($link, $sql);
  $result = mysqli_fetch_all($queryResult, MYSQLI_ASSOC);
  $response['body'] = $result;
  send($response);
}
