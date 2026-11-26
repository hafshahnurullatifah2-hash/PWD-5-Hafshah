<?php

class Hewan
{
    private $nama;
    private $umur;

    function setNama($nama)
    {
        $this->nama = $nama;
    }

    function setUmur($umur)
    {
        $this->umur = $umur;
    }

    function getNama()
    {
        return $this->nama;
    }

    function getUmur()
    {
        return $this->umur;
    }
}