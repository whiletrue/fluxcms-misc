<?php
class bx_helpers_mail {
    
    public static function obfuscateAddress($in) {
        return str_rot13($in);    
    }

    public static function deobfuscateAddress($rot13address) {
        $len = strlen($rot13address);
        if (0 === $len) {
            return '';
        }
        $out = '';
        for ($i=0; $i<$len; $i++) {
            $o = ord($rot13address[$i]);
            // A-Z
            if ($o > 64 && $o < 91) {
                $n = ($o + 13 < 91) ? $o + 13 : 64 + (13 - (90 - $o));
                $out.= chr($n);
            // a-z
            } else if ($o > 96 && $o < 123) {
                $n = (($o + 13) < 123) ? $o + 13 : 96 + (13 - (122 - $o));
                $out.= chr($n);
            } else {
                $out.= $a[$i];
            }

        }
        return $out;
    }
}
