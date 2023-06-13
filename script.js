let courseData;

fetch("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json")
.then(x => x.json()
.then(x => courseData = x))

function onSubmit(){
    let tee = 0;
    $("#tee-form").children("input").each((index, element) => {
        if ($(element).is(':checked')){
            tee = index
        }
    })

    let yardage = $("#yardage")
    let par = $("#par")
    let handicap = $("#handicap")

    let totalYards = 0;
    let totalPar = 0;
    let totalHandicap = 0;

    let localYards = 0
    let localPar = 0
    let localHandicap = 0

    for (index in [...Array(9).keys()]){
        let holeData = courseData.holes[index].teeBoxes[tee]
        totalYards += holeData.yards
        totalPar += holeData.par
        totalHandicap += holeData.hcp

        $(yardage).append(`<td>${holeData.yards}</td>`)
        $(par).append(`<td>${holeData.par}</td>`)
        $(handicap).append(`<td>${holeData.hcp}</td>`)
    }

    $(yardage).append(`<td>${totalYards}</td>`)
    $(par).append(`<td>${totalPar}</td>`)
    $(handicap).append(`<td>${totalHandicap}</td>`)

    for (index in [...Array(9).keys()]){
        let holeData = courseData.holes[parseInt(index) + 9].teeBoxes[tee]
        totalYards += holeData.yards
        totalPar += holeData.par
        totalHandicap += holeData.hcp

        localYards += holeData.yards
        localPar += holeData.par
        localHandicap += holeData.hcp

        $(yardage).append(`<td>${holeData.yards}</td>`)
        $(par).append(`<td>${holeData.par}</td>`)
        $(handicap).append(`<td>${holeData.hcp}</td>`)
    }

    $(yardage).append(`<td>${localYards}</td>`)
    $(par).append(`<td>${localPar}</td>`)
    $(handicap).append(`<td>${localHandicap}</td>`)

    $(yardage).append(`<td>${totalYards}</td>`)
    $(par).append(`<td>${totalPar}</td>`)
    $(handicap).append(`<td>${totalHandicap}</td>`)

    $("#tee-form").toggleClass("hidden")
    $("table").toggleClass("hidden")
    $("#new-player").toggleClass("hidden")
    newPlayer()
}

let players = 0
function newPlayer(){
    $("tbody").append(`<tr class='name' id='i${players}'><td contenteditable>Name</td></tr>`)

    let nameRow = $(`#i${players}`)
    for (index in [...Array(9).keys()]){
        nameRow.append("<td class='score score-in' onkeyup='calculateTotals(); return false' contenteditable></td>")
    }

    nameRow.append("<td class='in'></td>")

    for (index in [...Array(9).keys()]){
        nameRow.append("<td class='score score-out' onkeyup='calculateTotals(); return false' contenteditable></td>")
    }

    nameRow.append("<td class='out'></td>")
    nameRow.append("<td class='total'></td>")

    players += 1

    if (players == 4){
        $("#new-player").toggleClass("hidden")
    }
}

function calculateTotals(){
    $("#nan-warning").addClass("hidden")
    for (index in [...Array(players).keys()]){
        let player = $(`#i${index}`)
        let inScore = 0
        let outScore = 0

        $(player).children(".score-in").each((index, element) => {
            if (parseInt($(element).text()) === NaN){
                if (!$('#nan-warning').is(".hidden")){
                    $("#nan-warning").removeClass("hidden")
                }
            }else{
                inScore += parseInt($(element).text())
            }
        })
        $(player).find(".in").text(inScore)

        $(player).children(".score-out").each((index, element) => {
            if (parseInt($(element).text()) === NaN){
                if (!$('#nan-warning').is(".hidden")){
                    $("#nan-warning").addClass("hidden")
                }
            }else{
                outScore += parseInt($(element).text())
            }
        })
        $(player).find(".out").text(outScore)

        $(player).find(".total").text(inScore + outScore)
    }
}
