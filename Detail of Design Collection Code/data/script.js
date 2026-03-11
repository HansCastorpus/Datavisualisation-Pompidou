var margin = { top: 100, right: 0, bottom: 0, left: 0 },
  width = 1400,
  height = 152097; //22097 calcule = nb de ligne x 19

// append the svg object to the body of the page ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= =======
var svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g");

// Parse the Data ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= =======
d3.csv("data/proto.csv", function (data) {
  var colorDesignType = d3
    .scaleOrdinal()
    .domain([
      "Architecture/ Design d'Intérieur",
      "Mobilier",
      "Design Graphique/ Illustration",
      "Design d'Objet",
      "Design Industriel",
      "Design des Technologies",
      "Design Vestimentaire ",
    ])
    .range([
      "#91a879",
      "#c6bca2",
      "#da3035",
      "#8d2438",
      "#e7a02c",
      "#83b7ca",
      "#1a4d8b",
    ]);

  const colorAcquisitionType = d3
    .scaleOrdinal()
    .domain([
      "Achat",
      "Acquisition",
      "Attribution",
      "Dation",
      "Dépôt",
      "Don",
      "Donation",
      "Etat",
      "Fonds",
      "Inscription",
      "Legs",
    ])
    .range([
      "royalblue ",
      "seagreen",
      "darkred",
      "yellow",
      "orange",
      "khaki",
      "darkblue",
      "tomato",
      "turquoise",
      "#355709",
      "antiquewhite",
    ]);

  const colorGendre = d3
    .scaleOrdinal()
    .domain(["Homme", "Femme", "Studio/ Group", "Unknown"])
    .range(["#002fa7", "indianred", "orangered", "tan"]);

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 1);

  // X axis ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= =======
  var x = d3.scaleLinear().domain([1897, 2025]).range([0, width]);
  svg.append("g").attr("transform", "translate(10," + height + ")");

  // SCALE BOTTOM ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= =======
  var svg_scale = d3
    .select("#scale")
    .append("svg")
    .attr("width", width)
    .call(
      d3
        .axisBottom(x)
        .ticks(54)
        .tickSize(45)

        .tickFormat(function (d) {
          return d + "";
        })
    )

    // Font Size
    .selectAll("text")
    .attr("x", 22)
    .attr("y", -4)
    .attr("transform", "rotate(90)")
    .style("font-size", "12px")
    .attr("fill", "antiquewhite");

  // Y axis ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= =======
  var y = d3
    .scaleBand()
    .range([0, height + 1])
    .domain(
      data.map(function (d) {
        return d.Group;
      })
    )
    .padding(1);
  svg.append("g");

  // LINES VERTICAL ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= =======

  var uniqueCreations = Array.from(new Set(data.map((d) => d.DCU)));

  var uniqueData = uniqueCreations.map((DCU) => {
    return { DCU: DCU };
  });

  var uniqueAcquisition = Array.from(new Set(data.map((d) => d.Acquisition)));

  var uniqueData2 = uniqueAcquisition.map((acquisition) => {
    return { Acquisition: acquisition };
  });

  var strokeOpacity = 0;

  var strokeWidth = 0.1;

  var VerticalLineColorDCU = "darkblue";

  var VerticalLineColorDAU = "red";

  var lines = svg
    .selectAll("line")
    .data(uniqueData)
    .enter()
    .append("line")
    .attr("x1", function (d) {
      return x(d.DCU);
    })
    .attr("x2", function (d) {
      return x(d.DCU);
    })
    .attr("y1", 0)
    .attr("y2", 32097)
    .attr("stroke", VerticalLineColorDAU)
    .attr("stroke-width", strokeWidth)
    .style("stroke-opacity", strokeOpacity);

  var lineVertical = svg
    .selectAll("line")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", function (d) {
      return x(d.DAU);
    })
    .attr("x2", function (d) {
      return x(d.DAU);
    })
    .attr("y1", 0)
    .attr("y2", 32097)
    .attr("stroke", VerticalLineColorDCU)
    .attr("stroke-width", strokeWidth)
    .style("stroke-opacity", strokeOpacity);

  // LINES HORIZONTAL ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= =======

  var lineInfo = svg.append("g");

  var cercleLeft = svg.append("g");

  var cercleRight = svg.append("g");

  var strokeWidthMouseOff = "11";

  var strokeWidthMouseOn = "20";

  var radiusOn = "10";

  var radiusOff = "7";

  var duration = "100";

  var strokeOpacity = "1";

  lineInfo
    .selectAll("line")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", function (d) {
      return x(d.DCU);
    })
    .attr("x2", function (d) {
      return x(d.DAU);
    })
    .attr("y1", function (d) {
      return y(d.Group);
    })
    .attr("y2", function (d) {
      return y(d.Group);
    })
    .attr("stroke", (d) => colorDesignType(d.TypeDesign))

    .attr("stroke-width", strokeWidthMouseOff)
    .style("stroke-opacity", strokeOpacity)
    .on("mouseover", function (d) {
      cercleRight
        .selectAll("circle")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(200)
        .attr("r", radiusOn);

      cercleLeft
        .selectAll("circle")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("r", radiusOn);

      lineInfo
        .selectAll("line")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("stroke-width", strokeWidthMouseOn);

      const tooltipContent = `
        <div class="tooltip-column">
        <div class="image"><img src="${d.img}" width="300px" height="235px"></div>
        </div>
          
          <div class="tooltip-column">
          <strong>Creation:</strong>${d.DCU}
            <br>
            <strong>Acquisition:</strong> ${d.DAU}
            <br><br>
          ${d.Acquisition}<div class="rondplein"></div>
          </div>
          <div class="tooltip-column">
            <strong>${d.Titre}</strong>
            <br><br>
            ${d.TypeDesign}
            <div class="rondbarre"><div class="rond"></div><div class="barre"></div><div class="rond"></div></div>
            <br><br>
            ${d.MST}
            <br><br>
            ${d.Dimensions}
          </div>
          <div class="tooltip-column"> 
          <div class="designer"><strong>${d.Nom}</strong><div class="rondplein"></div></div>
          <br> _____ <br><br>
          ${d.DDN}
        </div>
        `;

      // Set the tooltip content and position
      tooltip
        .html(tooltipContent)

        .transition()
        .duration(200)
        .style("opacity", 0.95);
    })

    .on("mouseout", function (d) {
      cercleRight
        .selectAll("circle")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("r", radiusOff);

      cercleLeft
        .selectAll("circle")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("r", radiusOff);

      lineInfo
        .selectAll("line")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("stroke-width", strokeWidthMouseOff);

      tooltip.transition().duration(500).style("opacity", 0.95);
    });

  // CIRCLES RIGHT ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= =======

  cercleLeft
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.DAU);
    })
    .attr("cy", function (d) {
      return y(d.Group);
    })
    .attr("r", radiusOff)
    .attr("fill", (d) => colorGendre(d.Sexe))
    .attr("stroke", (d) => colorDesignType(d.TypeDesign))
    .style("stroke-width", "3px")

    .on("mouseover", function (d) {
      cercleRight
        .selectAll("circle")
        .each(function (e) {
          d3.select(this).raise();
        })
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("r", radiusOn);

      cercleLeft
        .selectAll("circle")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("r", radiusOn);

      lineInfo
        .selectAll("line")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("stroke-width", strokeWidthMouseOn);

        const tooltipContent = `
        <div class="tooltip-column">
        <div class="image"><img src="${d.img}" width="300px" height="235px"></div>
        </div>
          
          <div class="tooltip-column">
          <strong>Creation:</strong>${d.DCU}
            <br>
            <strong>Acquisition:</strong> ${d.DAU}
            <br><br>
          ${d.Acquisition}<div class="rondplein"></div>
          </div>
          <div class="tooltip-column">
            <strong>${d.Titre}</strong>
            <br><br>
            ${d.TypeDesign}
            <div class="rondbarre"><div class="rond"></div><div class="barre"></div><div class="rond"></div></div>
            <br><br>
            ${d.MST}
            <br><br>
            ${d.Dimensions}
          </div>
          <div class="tooltip-column"> 
          <div class="designer"><strong>${d.Nom}</strong><div class="rondplein"></div></div>
          <br> _____ <br><br>
          ${d.DDN}
        </div>
        `;

      // Set the tooltip content and position
      tooltip
        .html(tooltipContent)

        .transition()
        .duration(200)
        .style("opacity", 0.95);
    })

    .on("mouseout", function (d) {
      cercleRight
        .selectAll("circle")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("r", radiusOff);

      cercleLeft
        .selectAll("circle")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("r", radiusOff);

      lineInfo
        .selectAll("line")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("stroke-width", strokeWidthMouseOff);

      tooltip.transition().duration(500).style("opacity", 0.95);
    });

  // CIRCLES LEFT ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= =======

  cercleRight
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.DCU);
    })
    .attr("cy", function (d) {
      return y(d.Group);
    })
    .attr("r", radiusOff)
    .attr("fill", (d) => colorAcquisitionType(d.TypeAcquisition))
    .attr("stroke", (d) => colorDesignType(d.TypeDesign))
    .style("stroke-width", "3px")

    .on("mouseover", function (d) {
      cercleRight
        .selectAll("circle")
        .each(function (e) {
          d3.select(this).raise();
        })
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("r", radiusOn);

      cercleLeft
        .selectAll("circle")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("r", radiusOn);

      lineInfo
        .selectAll("line")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("stroke-width", strokeWidthMouseOn);

        const tooltipContent = `
        <div class="tooltip-column">
        <div class="image"><img src="${d.img}" width="300px" height="235px"></div>
        </div>
          
          <div class="tooltip-column">
          <strong>Creation:</strong>${d.DCU}
            <br>
            <strong>Acquisition:</strong> ${d.DAU}
            <br><br>
          ${d.Acquisition}<div class="rondplein"></div>
          </div>
          <div class="tooltip-column">
            <strong>${d.Titre}</strong>
            <br><br>
            ${d.TypeDesign}
            <div class="rondbarre"><div class="rond"></div><div class="barre"></div><div class="rond"></div></div>
            <br><br>
            ${d.MST}
            <br><br>
            ${d.Dimensions}
          </div>
          <div class="tooltip-column"> 
          <div class="designer"><strong>${d.Nom}</strong><div class="rondplein"></div></div>
          <br> _____ <br><br>
          ${d.DDN}
        </div>
        `;


      // Set the tooltip content and position
      tooltip
        .html(tooltipContent)

        .transition()
        .duration(200)
        .style("opacity", 0.95);
    })

    .on("mouseout", function (d) {
      cercleRight
        .selectAll("circle")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("r", radiusOff);

      cercleLeft
        .selectAll("circle")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("r", radiusOff);

      lineInfo
        .selectAll("line")
        .filter(function (e) {
          return e.Group === d.Group;
        })
        .transition()
        .duration(duration)
        .attr("stroke-width", strokeWidthMouseOff);

      tooltip.transition().duration(500).style("opacity", 0.95);
    });

  // TOOLTIP ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= ======= =======
});
