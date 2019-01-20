function alpha_func(x) {
    let val = Math.min(x, 1);

    console.log(val);

    return val;
}

function colour_from_score(val) {
    let abs = Math.abs(val);
    let alpha = alpha_func(abs);
    let colour = (val < 0 ? "255, 75, 75, " : "75, 255, 75, ") + alpha;
    return "background-color: rgba(" + colour + ")";
}


console.log(localStorage.getItem("responsedata"));
let info = JSON.parse(localStorage.getItem("responsedata"));
console.log(info);
let audio = JSON.parse(info.audio);
console.log(audio[0].filedata);

let pics = info.images;
let imageData = [];

pics.forEach((pic) => {
        if (pic.length != 0) {
            let p = pic[0].emotions;
            imageData.push(p);
        }
    }
);

plot(imageData);

audio[0].filedata.forEach(snt => {

    let card = document.createElement("div");
    card.className = "card";
    card.setAttribute("style", "margin-bottom: 15px; margin-left: 10px; margin-right: 10px;" + (Math.abs(snt.score * snt.magnitude - info.slider) > 0.4 ? "border: 5px solid rgb(255, 120, 120);" : ""));

    let body = document.createElement("div");
    body.className = "card-body";

    let content = document.createElement("div");
    content.className = "tab-content card-text text-dark";
    content.innerText = snt.sentence;
    body.setAttribute("style", colour_from_score(snt.score * snt.magnitude));

    body.append(content);
    card.append(body);
    document.getElementById('total').append(card);
});


function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
        return a.map(function (r) {
            return r[c];
        });
    });
}


function plot(input) {
    let na = Array.apply(null, {length: input.length}).map(Number.call, Number);
    var data = [];
    var names = ['Joy', 'Sorrow', 'Anger', 'Surprise'];
    // transposed.forEach((val, i) => {
    //     data.push({
    //         x: val,
    //         y: na,
    //         name: names[i],
    //         type: 'scatter'
    //     })
    // });

    let posneg = [];

    input.forEach((val, i) => {

        posneg.push((val[0] + val[3]) - (val[2] + val[1]));
    });

    data.push({
        y: na,
        x: posneg,
        type: 'scatter'
    });

    console.log(data);

    var layout = {
        autosize: false,
        width: 500,
        height: 700,
        margin: {
            l: 5,
            r: 5,
            b: 5,
            t: 30,
            pad: 4
        },

        xaxis: {
            autorange: true,
            showgrid: false,
            zeroline: true,
            zerolinewidth: 4,
            showline: false,
            autotick: true,
            ticks: '',
            showticklabels: false,
            title: {
                text: 'Negative           Positive',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            }
        },
        yaxis: {
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: true,
            ticks: '',
            showticklabels: false,
            title: {
                text: 'Progress of speech',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            }
        }


    };
    Plotly.newPlot('plot', data, layout);
}
