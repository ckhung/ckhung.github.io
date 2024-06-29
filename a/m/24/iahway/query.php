<?php

$log_file = "/var/log/apache2/access-iahway.log";
if (PHP_SAPI==='cli') {
    parse_str($_SERVER['argv'][1], $opts);
} else {
    $opts = $_GET;
}
$features = array();
$handle = fopen($log_file, "r");
while (($line = fgets($handle)) !== false) {
    if (! preg_match('#log.php\?(\S+)#', $line, $matches)) continue;
    parse_str($matches[1], $F_dirty);
    foreach (['timestamp', 'profile', 'uid', 'lon', 'lat'] as $key) {
	if (! array_key_exists($key, $F_dirty)) continue;
    }
    $F_clean = array_map("floatval", $F_dirty);
    if (! $F_dirty["profile"]==$opts["gr"]) continue;
    if (array_key_exists($F_dirty["uid"],$features) && $F_clean["timestamp"]<=$features[$F_dirty["uid"]]["when"]["start"]) continue;
    $features[$F_dirty["uid"]] = array(
      "type"=>"Feature",
      "geometry"=>array(
	"type"=>"Point",
	"coordinates"=>array($F_clean["lon"], $F_clean["lat"])
      ),
      "when"=>array(
	"start"=> (int) $F_clean["timestamp"],
	"type"=>"Instant"
      ),
      "properties"=>array(
	"group"=>$F_dirty["profile"],
	"uid"=>$F_dirty["uid"]
      )
    );
}
fclose($handle);
print(json_encode(array(
    "type"=>"FeatureCollection",
    "group"=>$opts["gr"],
    "features"=>array_values($features)
), JSON_UNESCAPED_UNICODE));
?>
