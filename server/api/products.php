<?php

if ($request['method'] === 'GET') {
  $link = get_db_link();
  $currentId = $request['query']['productId'];
  if (!$currentId && $currentId != '0') {
    $sqlAll = "SELECT productId, name, price, image, shortDescription FROM products";
    $queryResultAll = mysqli_query($link, $sqlAll);
    $resultAll = mysqli_fetch_all($queryResultAll, MYSQLI_ASSOC);
    $response['body'] = $resultAll;
    send($response);
  }
  if (!is_numeric($currentId) || $currentId == '0') {
    throw new ApiError('Invalid Product', 400);
  }
  $sql = "SELECT * FROM products WHERE productId = $currentId";
  $queryResult = mysqli_query($link, $sql);
  $result = mysqli_fetch_all($queryResult, MYSQLI_ASSOC);
  if (intval($result) && isset($currentId) && is_numeric($currentId)) {
    $response['body'] = $result;
    send($response);
  } else {
      throw new ApiError('Product Does Not Exist', 404);
  }
}
