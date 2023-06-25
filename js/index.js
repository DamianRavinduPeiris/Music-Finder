$(document).ready(() => {
    window.onload = function () {
        Particles.init({
            selector: '.background'
        });
    };
});
$("#nameField").on("keydown", (event) => {
    if (event.key === "Enter") {
        fetchSongID($("#nameField").val());


    }
});

async function fetchSongID(songName) {
    $(".albumCover").empty();
    $("#albumImage").remove();
    $("#nameField").val("");
    $("#nameField").blur();
    let response = await fetch("https://api.genius.com/search?access_token=H4jUebTWrLHmEM_g0L1gfBu3ZUgDpamrZAuwy9xvBWfNysQ5yBJ5CdCGUrgrXEa3&q=" + songName)
    let jsonData = await response.json();
    let musicData = await jsonData;
    $(".albumCover").append("<h1 data-aos='zoom-in' >" + musicData.response.hits[0].result.full_title + ".</h1>")
    var albumCover = musicData.response.hits[0].result.header_image_url;
    var sId = musicData.response.hits[0].result.id;
    fetchLyrics(sId);
    $("body").append("<img  id='albumImage' src=" + albumCover + ">")
    /*Do not scroll horizontally (Indicates by 0 , Scroll to the vertical position. )*/
    window.scrollTo(0, document.body.scrollHeight);

}

if (window.innerWidth < 878) {
    $(".heading").css("font-size", "3rem");
    $("#nameField").attr("placeholder", "Enter Song Name!");
    $(".albumCover>h1").css("font-size", "1rem");

}

async function fetchLyrics(songId) {


}
