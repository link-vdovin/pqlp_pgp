<?php

$x = 0; 

while($x <= 60) {
    echo '<picture>';
    echo '<source media="(max-height:1080px)" srcset="/assets/images/3d/middle/pgp_'. $x .'.jpg">';
    echo '<source media="(max-height:760px)" srcset="/assets/images/3d/small/pgp_'. $x .'.jpg">';
    echo '<img src="/assets/images/3d/big/pgp_'. $x .'.jpg">';
    echo '</picture>';
    $x++;
}