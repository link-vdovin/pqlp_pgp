<?php

$x = 0; 

while($x <= 60) {
    echo '<picture>';
    echo '<source media="(max-height:640px)" srcset="/assets/images/3d/245×320/pgp_'. $x .'.jpg">';
    echo '<source media="(max-height:1280px)" srcset="/assets/images/3d/490×640/pgp_'. $x .'.jpg">';
    echo '<img src="/assets/images/3d/980×1280/pgp_'. $x .'.jpg">';
    echo '</picture>';
    $x++;
}