<?php

require_once "Kucing.php";
require_once "Anjing.php";

$kucing = new Kucing();
$kucing->setNama("Mimi");
$kucing->setUmur(2);

echo "Nama Hewan  : " . $kucing->getNama() . "<br>";
echo "Umur Hewan  : " . $kucing->getUmur() . " Tahun<br>";
echo "Jenis Hewan : " . get_class($kucing) . "<br>";
echo "Suara Hewan : " . $kucing->getSuara();

echo "<br><br>";

$anjing = new Anjing();
$anjing->setNama("Roki");
$anjing->setUmur(4);

echo "Nama Hewan  : " . $anjing->getNama() . "<br>";
echo "Umur Hewan  : " . $anjing->getUmur() . " Tahun<br>";
echo "Jenis Hewan : " . get_class($anjing) . "<br>";
echo "Suara Hewan : " . $anjing->getSuara();