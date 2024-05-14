source easybashgui

while true ;  do
    menu $( perl -pe 's/.*?,(.*)/"#$.#,$1"/' news-channels.csv )
    ans=$( cat ${dir_tmp}/${file_tmp} )
    if [ -z "$ans" ]; then break ; fi
    ans_i=$( echo $ans | perl -ne 'print("$1") if m/#(\d+)#,/' )
    url=$( head -n $ans_i news-channels.csv | tail -n 1 | cut -d, -f 1 )
    read -t 3 -p "$ans => $ans_i => $url" ; echo ''
    # vlc -f $url
done
