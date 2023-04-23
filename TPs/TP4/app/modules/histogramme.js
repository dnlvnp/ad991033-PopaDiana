const xArray = [0, 10, 20, 30, 40, 50, 60, 70, 80];
const yArray = [7000, 6000, 5000, 4000, 3000, 2000, 1000];

const data = [{
  x: xArray,
  y: yArray,
  type: "bar"  }];
const layout = {title:"Total d'interventions par caserne depuis 2015"};

Plotly.newPlot("myPlot", acsim, layout);