<?php
mb_parse_str($_SERVER["QUERY_STRING"], $qs);
$fn = array_key_exists('fn', $qs) ? $qs["fn"] : 'multi-feeds.tgz';
header("Content-type: application/x-gtar");
header("Content-Disposition: attachment; filename=$fn");
system("cd ../.. ; tar cf - i/multi-feeds.inc i/simplepie.inc i/FeedWriter.inc i/FeedItem.inc z/readings.php z/cit-jou.php z/feed-mixer.php | gzip");
exit;
?>

