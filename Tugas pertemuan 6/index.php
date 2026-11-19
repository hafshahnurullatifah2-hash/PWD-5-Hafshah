<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tugas PW Pertemuan 6</title>
    
    <style>
        table {
            border-collapse: collapse;
            text-align: center;
            font-family: Arial, sans-serif;
        }
        th, td {
            width: 35px;
            height: 35px;
            border: 1px solid #333;
            font-weight: bold;
        }
        .header {
            background-color: #00CC44; 
            color: black;
        }
        .yellow {
            background-color: #FFFF00; 
        }
        .cyan {
            background-color: #00FFFF;
        }
    </style>
</head>
<body>
    <h1>Soal No 1 </h1>
    <p>Perulangan 1 sampai 10, tampilkan data yang bernilai genap</p>

    <?php
    for ($i = 1; $i <= 10; $i++) {
        if ($i % 2 == 0) {
            echo $i . " ";
        }
    }
    ?>

    <h1> Soal NO 2</h1>
    <p> Tabel Perkalian Matriks</p>

    <table>
        <tr>
            <th class="header">bilangan</th>
            <?php
            for ($j = 1; $j <= 10; $j++) {
                echo "<th class='header'>$j</th>";
            }
            ?>
        </tr>
        <?php
        for ($i = 1; $i <= 10; $i++) {
            echo "<tr>";
 
            echo "<th class='header'>$i</th>";

            //isi perkalian
            for ($j = 1; $j <= 10; $j++) {
                $hasil = $i * $j;
                $warna = (($i + $j) % 2 == 0) ? 'yellow' : 'cyan';
                
                echo "<td class='$warna'>$hasil</td>";
            }
            echo "</tr>";
        }
        ?>
    </table>

</body>
</html>