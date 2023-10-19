class TrenchWarfareSimulation {
    constructor(initialCooperation, retaliationFactor, dampingRate, numIterations) {
        this.cooperation = initialCooperation;
        this.retaliationFactor = retaliationFactor;
        this.dampingRate = dampingRate;
        this.numIterations = numIterations;
        this.results = [];
        this.setupPlot();
        this.runSimulation();
    }
    setupPlot() {
        this.plotData = [{
            x: [],
            y: [],
            mode: "lines",
            type: "scatter",
            name: "Cooperation Level",
            line: {
                width: 5
              }
        }, {
            x: [],
            y: [],
            mode: "lines",
            type: "scatter",
            name: "Retaliation",
            line: {
                width: 5
              }
        }];
        this.plotLayout = {
            title: "Trench Warfare Simulation - Enemy Cooperation",
            xaxis: {
                title: "Iteration"
            },
            yaxis: {
                title: "Value"
            },
            width: 1000,
            height: 600,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            title: {
                text:'Trench Warfare Simulation',
                font: {
                  family: 'Courier New, monospace',
                  size: 24,
                  color: "white"
                },
                xref: 'paper',
                x: 0.5,
              },
              legend: {
                font: {
                    color: 'white'
                  }
              },
              xaxis: {
                color: 'white'
              },
              yaxis: {
                color: 'white'
              }
        };
        Plotly.newPlot("plot", this.plotData, this.plotLayout);
    }
    runSimulation() {
        for(let i = 0; i < this.numIterations; i++) {
            const result = this.iterate();
            this.results.push(result);
            this.updatePlot(i);
        }
    }
    iterate() {
        const enemyCooperated = Math.random() < this.cooperation;
        // Implementing a basic form of retaliation
        const retaliation = enemyCooperated ? this.retaliationFactor : 0;
        // Damping process
        this.cooperation = this.cooperation * (1 - this.dampingRate);
        // Adjust cooperation for the next iteration
        this.cooperation += retaliation;
        return {
            cooperation: this.cooperation,
            retaliation
        };
    }
    updatePlot(iteration) {
        this.plotData[0].x.push(iteration);
        this.plotData[0].y.push(this.results[iteration].cooperation);
        this.plotData[1].x.push(iteration);
        this.plotData[1].y.push(this.results[iteration].retaliation);
        Plotly.update("plot", this.plotData, this.plotLayout);
    }
}
setTimeout(function() {
    document.querySelectorAll("[id^=slider_").forEach(function(elem) {
        elem.addEventListener("input", function(e) {
            initialCooperation = Number(document.getElementById("slider_1").value);
            retaliationFactor = Number(document.getElementById("slider_2").value);
            dampingRate = Number(document.getElementById("slider_3").value);
            numIterations = Number(document.getElementById("slider_4").value);
            document.getElementById("span_1").innerText = initialCooperation;
            document.getElementById("span_2").innerText = retaliationFactor;
            document.getElementById("span_3").innerText = dampingRate;
            document.getElementById("span_4").innerText = numIterations;
            const simulation = new TrenchWarfareSimulation(initialCooperation, retaliationFactor, dampingRate, numIterations)
        })
    })

    var event = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
      
    document.getElementById("slider_1").dispatchEvent(event);

}, 2000)
