<?php

$log_file = '/var/log/apache2/access-iahway.log';
if (PHP_SAPI==='cli') {
    # command line testing usage: 
    # php query.php -g gr=slat-hiking -l ~/test.log
    # Read from ~/test.log and produce entries whose profile is "slat-hiking"
    $cmd_opts = getopt('l:g:');
    if (array_key_exists('l', $cmd_opts))
	$log_file = $cmd_opts['l'];
    if (array_key_exists('g', $cmd_opts))
	parse_str($cmd_opts['g'], $http_GET);
} else {
    $http_GET = $_GET;
}
if (! (array_key_exists('gr', $http_GET) && strlen($http_GET['gr'])>=6))
    $http_GET['gr']='no-such-group';
$features = array();
$handle = fopen($log_file, 'r');
while (($line = fgets($handle)) !== false) {
    if (! preg_match('#log.php\?(\S+)#', $line, $matches)) continue;
    parse_str($matches[1], $F);
    foreach (['timestamp', 'profile', 'uid', 'lon', 'lat'] as $key) {
	if (! array_key_exists($key, $F)) continue;
    }
    if ($F['profile']!=$http_GET['gr']) continue;
    if (array_key_exists($F['uid'],$features) && $F['timestamp']<=$features[$F['uid']]['when']['start']) continue;
    $features[$F['uid']] = array(
      'type'=>'Feature',
      'geometry'=>array(
	'type'=>'Point',
	'coordinates'=>array((float) $F['lon'], (float) $F['lat'])
      ),
      'when'=>array(
	'start'=> (int) $F['timestamp'],
	'type'=>'Instant'
      ),
      'properties'=>array(
	'group'=>$F['profile'],
	'uid'=>$F['uid']
      )
    );
}
fclose($handle);
print(json_encode(array(
    'type'=>'FeatureCollection',
    'group'=>$http_GET['gr'],
    'features'=>array_values($features)
), JSON_UNESCAPED_UNICODE));
?>
