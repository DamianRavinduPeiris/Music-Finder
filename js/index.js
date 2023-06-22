$("#nameField").on("keydown",(event)=>{
    if(event.key==="Enter"){
        fetchSongID($("#nameField").val());


    }
});
async function fetchSongID(songName){
    $(".albumCover").empty();
    $("#albumImage").remove();
    $("#nameField").val();
    $("#nameField").blur();
    let response = await fetch("https://api.genius.com/search?access_token=H4jUebTWrLHmEM_g0L1gfBu3ZUgDpamrZAuwy9xvBWfNysQ5yBJ5CdCGUrgrXEa3&q="+songName)
    let jsonData = await  response.json();
    let musicData = await jsonData;
    $(".albumCover").append("<h1 data-aos='zoom-in'>"+musicData.response.hits[0].result.full_title+".</h1>")
    var albumCover = musicData.response.hits[0].result.header_image_url;
    $("body").append("<img data-aos='zoom-in' id='albumImage' src="+albumCover+">")

}