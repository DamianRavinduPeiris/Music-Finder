$("#nameField").on("keydown", (event) => {
    if (event.key === "Enter") {
        fetchSongID($("#nameField").val());


    }
});

async function fetchSongID(songName) {
    $(".albumDetails").remove();
    $("#nameField").val("");
    $("#nameField").blur();
    let response = await fetch("https://api.genius.com/search?access_token=H4jUebTWrLHmEM_g0L1gfBu3ZUgDpamrZAuwy9xvBWfNysQ5yBJ5CdCGUrgrXEa3&q=" + songName)
    let jsonData = response.json();
    let musicData = await jsonData;
    $("body").append("<div class='albumDetails' ></div>")
    $(".albumDetails").append("<h1 data-aos='zoom-in' >" + musicData.response.hits[0].result.full_title + ".</h1>")
    $(".albumDetails").append("<h1 data-aos='zoom-in' >" + "Released on :" + musicData.response.hits[0].result.release_date_for_display + ".</h1>")
    var albumCover = musicData.response.hits[0].result.header_image_url;
    var sId = musicData.response.hits[0].result.id;
    fetchLyrics(sId);
    $(".albumDetails").append("<img  data-aos='fade-up' id='albumImage' src=" + albumCover + ">");

    /*Do not scroll horizontally (Indicates by 0 , Scroll to the vertical position. )*/
    window.scrollTo(0, document.body.scrollHeight);

}

if (window.innerWidth < 878) {
    $(".heading").css("font-size", "3rem");
    $("#nameField").attr("placeholder", "Enter Song Name!");
    $(".albumDetails>h1").css("font-size", "1rem");
    $(".albumDetails>image").css("width", "80vw");
    $(".intro").css("font-size", "2rem");

}

async function fetchLyrics(songId) {
    let response = await fetch("https://api.genius.com/songs/" + songId + "?text_format=plain&access_token=H4jUebTWrLHmEM_g0L1gfBu3ZUgDpamrZAuwy9xvBWfNysQ5yBJ5CdCGUrgrXEa3")
    let jsonData = await response.json();
    let lyricData = await jsonData;
    /*Getting lyrics from the API.*/
    const result = lyricData.response.song.embed_content;
    /*Embedding the lyrics in the iframe.*/
    $("body").append("<div data-aos='zoom-in' class='albumDetails'  ><iframe id='song' ></iframe></div>")
    let ifrm = document.getElementById("song");
    try {
        let ifrWin = ifrm.contentWindow || ifrm.contentDocument.defaultView;
        ifrWin.document.write(result);
        ifrWin.document.close();
        let youtubeLink = lyricData.response.song.media[0].url;
        let spotifyLink = lyricData.response.song.media[1].url;
        console.log(youtubeLink);
        const ytId = youtubeLink.split("v=")[1];
        const sID = spotifyLink.split("/");
        console.log(sID);
        console.log(sID[sID.length - 1]);
        /*Spotify.*/
        $("body").append(`<div data-aos='zoom-in' class='albumDetails'><iframe class="media" style="border-radius:12px" src="https://open.spotify.com/embed/track/${sID[sID.length - 1]}?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>`)
        /*Youtube.*/
        $("body").append(`<div data-aos='zoom-in' class='albumDetails'><iframe class="media" width='500' height='500' src='https://www.youtube.com/embed/${ytId}' title='YouTube video player.' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen></iframe></div>`)



    } catch (e) {
        console.log(e.message);
    }

}
