let courseData;

fetch("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json")
.then(x => x.json()
.then(x => courseData = x))
console.log(courseData)

function onSubmit(){
    let tee = 0;
    $("#tee-form").children("input").each((index, element) => {
        if( $(element).is(':checked') ){
            tee = index
        }
    })

    let yardage = $("#yardage")
    let par = $("#par")
    let handicap = $("#handicap")

    let totalYards = 0;
    let totalPar = 0;
    let totalHandicap = 0;

    for (index in [...Array(18).keys()]){
        let holeData = courseData.holes[index].teeBoxes[tee]

        $(yardage).append(`<td>${holeData.yards}</td>`)
        $(par).append(`<td>${holeData.par}</td>`)
        $(handicap).append(`<td>${holeData.hcp}</td>`)

        totalYards += holeData.yards
        totalPar += holeData.par
        totalHandicap += holeData.hcp
    }

    $(yardage).append(`<td>${totalYards}</td>`)
    $(par).append(`<td>${totalPar}</td>`)
    $(handicap).append(`<td>${totalHandicap}</td>`)

    $("#tee-form").toggleClass("hidden")
    $("table").toggleClass("hidden")
}
