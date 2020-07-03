async function bounceCordinates(initial_height, coefficient) {
    const H = initial_height;

    // value of gravity assumed 9.8
    const g = 9.8;

    const e = coefficient;

    // number of bounces
    let bounce = 0;

    // to calculate total time ball is going to bounce
    const T = Math.sqrt(2 * H / g) * ((1 + e) / (1 - e))
    console.log(T)

    // Arrays to collect co-ordinate data
    let heightArray = [H];
    let timeArray = [0];

    let time = 0;

    let it = Math.sqrt((2 * H) / g)

    // we are throwing the ball from certian heigth therefore first curve will be different
    function firstCurve() {

        let h = H;
        let t = it
        for (let x = 0.01; x <= t; x += 0.01) {
            // height as a function of time
            let value = h - (0.5 * g * x * x)

            if (value > 0) {
                heightArray.push(value)
                timeArray.push(x)
            }
            else {
                break
            }

        }
        bounce += 1;
        return t


    }
    let dt = firstCurve()


    heightArray.push(0)
    timeArray.push(it)

    time += dt





    while (time < T) {


        function factorOfHeight(b) {
            return Math.pow(e, 2 * b)

        }
        function factorOfVelocity(b) {
            return Math.pow(e, b)
        }

        let e1 = factorOfHeight(bounce);
        let e2 = factorOfVelocity(bounce);

        dt = nextCurve(e1, e2)
        time += dt

        heightArray.push(0),
            timeArray.push(time)
        console.log(`bounce no ${bounce}`)
    }

    function nextCurve(e1, e2) {
        // calculate initial velocity of each bounce
        let u = e1 * g * it
        // calculate max height it will reach on each bounce
        let hmax = e2 * H;

        // time for which ball will be in air
        let it1 = Math.sqrt((2 * hmax) / g)

        // Calculating points
        for (let x = 0.01; x <= it1 * 2; x += 0.01) {

            let value = u * (x) - (0.5 * g * x * x)

            if (value > 0) {
                heightArray.push(value)
                timeArray.push(time + x)
                console.log(value, time + x)
            }
            else {
                heightArray.push(0)
                timeArray.push(time + it1)
                console.log(0, time + it1)
                break;
            }

        }
        // incrementing the value of bounce
        bounce++
        return it1 * 2

    }
    return [heightArray, timeArray, bounce]


}

module.exports = bounceCordinates;
// var ctx = document.getElementById('myChart').getContext('2d');
// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         labels: timeArray,
//         datasets: [{
//             label: 'My First dataset',
//             borderColor: 'rgb(255, 99, 132)',
//             data: heightArray
//         }]
//     },

//     // Configuration options go here
//     options: {}
// });