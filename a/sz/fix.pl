#!/usr/bin/perl -i -wp
s#/mnt/worksp/home/ckhung/public_html/(mm|e)/##;
s#/home/ckhung/public_html/(mm|e)/##;
s#ns1:clip="true"#ns1:clip="false"#;
s#ns1:hide="true"#ns1:hide="false"#;
s#ns1:transition-profile="linear"#ns1:transition-profile="decelerate"#;
s#file:///home/ckhung/public_html#..#;
s#\bfont-family:Sans\b#font-family:AR PL UKai TW#g;
