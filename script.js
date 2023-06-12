var course_id = fetch("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json")
.then(x => x.json()
.then(x => console.log(x)))
