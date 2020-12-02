function abbrState(input, to){

    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] == input){
              console.log(states[i][1]);
                getCovidData(states[i][1]);
                getCovidChartData(states[i][1]);
            }
        }
    }
}

function getCovidData(state) {
  fetch(`https://api.covidtracking.com/v1/states/${state}/current.json`)
  .then(response =>{
      return response.json();
  })
  .then(data =>{
    const date = data.checkTimeEt;
    const cases = data.positive;
    const newCases = data.positiveIncrease;
    const deaths = data.death;

    document.querySelector('.news-title').innerHTML = "Covid statistics in " + state;
    document.querySelector('.date-time').innerHTML = "Last updated: " + date;
    document.querySelector('.total-cases').innerHTML = cases;
    document.querySelector('.new-cases').innerHTML = newCases;
    document.querySelector('.total-deaths').innerHTML = deaths;
  })

}

function getCovidChartData(state) {
  fetch(`https://api.covidtracking.com/v1/states/${state}/daily.json`)
  .then(response =>{
      return response.json();
  })
  .then(data =>{
    // let days = [];
    let labels = [];
    let series = [];
    for(var i = 30; i>0; i--){

      labels.push(data[i].checkTimeEt.substr(0,5));
      series.push(data[i].positiveIncrease);
    };
    document.querySelector('.chart-title').innerHTML = "New covid cases in "
    + state + " from " +labels[0]+ " to: " + labels[29];
    makeChart(labels,series);

  })

}

function makeChart(labels,series){
  var data = {
  labels: labels,
  series: [series]

};
var options = {
  width: '100%',
  height: '400px',
  showLabel: false,
  axisX: {
    showGrid: false,
    showLabel: false,
    offset: 0
  }
};
  new Chartist.Line('#chart01', data, options);

}
