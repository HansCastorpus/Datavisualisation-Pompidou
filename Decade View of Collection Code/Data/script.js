d3.json("data/data.json", function (data) {
  var width = 2500;
  var height = 4000;

  var svg = d3
    .select("#body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var uniqueDataTotalTextAcquisition = Array.from(
    new Set(data.map((d) => d.TotalAcquisition))
  ).map((TotalAcquisition) => {
    return data.find((d) => d.TotalAcquisition === TotalAcquisition);
  });

  var uniqueDataTotalTextCreation = Array.from(
    new Set(data.map((d) => d.TotalCreation))
  ).map((TotalCreation) => {
    return data.find((d) => d.TotalCreation === TotalCreation);
  });

  var uniqueData = Array.from(new Set(data.map((d) => d.Creation))).map(
    (Creation) => {
      return data.find((d) => d.Creation === Creation);
    }
  );

  var uniqueData2 = Array.from(new Set(data.map((d) => d.Acquisition))).map(
    (Acquisition) => {
      return data.find((d) => d.Acquisition === Acquisition);
    }
  );

  var widthScale = d3.scaleLinear().domain([1890, 2030]).range([0, width]);

  var quantityScale = d3.scaleOrdinal().domain([0, 1000]).range([0, 100]);

  var group8Text = svg.append("g").attr("transform", "translate(0, 400)");

  var group7Text = svg.append("g").attr("transform", "translate(0, 400)");

  var group6 = svg.append("g").attr("transform", "translate(0, 400)");

  var group = svg.append("g").attr("transform", "translate(0, 400)");

  var group2 = svg.append("g").attr("transform", "translate(0, 485)");

  var group3 = svg.append("g").attr("transform", "translate(0, 400)");

  var group4 = svg.append("g").attr("transform", "translate(0, 400)");

  var group5 = svg.append("g").attr("transform", "translate(0, 400)");

  var acquisitionColor = "#635c58";

  var acquisitionColorHighlight = "orange";

  var creationColor = "#635c58";

  var creationColorHighlight = "pink";

  var font = "12";

  var lineColor = "#635c58";

  var lineWidth = "0.1";

  var strokeWidth = "1";

  var lineOpacity = "90";

  var fontColor = "#a9a19b";

  var strokeColorCreation = "orange";

  var strokeColorAcquisition = "royalblue";

  //var circle = group.append("circle")
  //   .attr("cx", 300)
  // .attr("cy", 300)
  // .attr("r", 50)
  // .style("fill", "red")
  // .style("opacity", 0.5);

  group
    .selectAll("line")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", function (d) {
      return widthScale(d.Creation);
    })
    .attr("y1", 100)
    .attr("x2", function (d) {
      return widthScale(d.Acquisition);
    })
    .attr("y2", 400)
    .attr("stroke", lineColor)
    .attr("stroke-width", lineWidth)
    .attr("stroke-linecap", "round")
    .attr("id", function (d) {
      return "line-" + d.Creation;
    });






  //======================= CREATION ============================







  //CREATION RECTANGLES(GROUP1)

  group
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return widthScale(d.Creation) - 5;
    })
    .attr("y", function (d) {
      return 50 - d.TotalCreation;
    })
    .attr("width", 10)
    .attr("height", function (d) {
      return d.TotalCreation;
    })

    .attr("fill", creationColor)
    .attr("id", function (d) {
      return "rect-" + d.Creation;
    })

    // ======> MOUSE ON for Creation Rectangles

    .on("mouseover", function (d) {
      //Lines
      group
        .selectAll("line")
        .filter(function (e) {
          return e.Creation === d.Creation;
        })
        .raise()
        .attr("stroke", strokeColorCreation)
        .attr("stroke-width", strokeWidth);

      //Acquisition Rectangles
      group2
        .selectAll("rect")
        .filter(function (e) {
          return e.Creation === d.Creation;
        })
        .each(function (e) {
          d3.select(this)
            .raise()
            .attr("fill", acquisitionColorHighlight)
            .attr("height", function (d) {
              return d.CreationQuantity;
            });
        });

      //Creation Rectangles
      group
        .selectAll("rect")
        .filter(function (e) {
          return e.Creation === d.Creation;
        })
        .each(function (e) {
          d3.select(this).raise().attr("fill", creationColorHighlight);
        });

      //Detail Text
      group5
        .selectAll("text")
        .filter(function (e) {
          return e.Creation === d.Creation;
        })
        .style("display", "block");


    // Total Text
    group8Text
    .selectAll("text")
    .filter(function (e) {
      return e.Creation === d.Creation;
    })
    .style("display", "block");

    })


    // ======> MOUSE OUT

    .on("mouseout", function (d) {
      //Basic State for Lines
      group
        .selectAll("line")
        .lower()
        .attr("stroke", lineColor)

        .attr("stroke-width", lineWidth);
      //Basic State for Acquisition Rectangles
      group2.selectAll("rect").attr("fill", acquisitionColor);

      //Basic State for Creation Rectangles
      group.selectAll("rect").attr("fill", creationColor);

      //Detail Text
      group5
        .selectAll("text")
        .filter(function (e) {
          return e.Creation === d.Creation;
        })
        .style("display", "none");

      // Detail Text
      group5.selectAll("text").style("display", "none");

       // Total Text
       group8Text.selectAll("text").style("display", "none");
    });

  //CREATION DATES (GROUP1)

  group
    .selectAll("text")
    .data(uniqueData)
    .enter()
    .append("text")
    .attr("y", 85)
    .attr("x", function (d) {
      return widthScale(d.Creation) - 15;
    })
    .text(function (d) {
      return d.Creation;
    })
    .attr("transform", function (d) {
      return "rotate(-90 " + widthScale(d.Creation) + " " + 79 + ")";
    })
    .attr("font-size", font)
    .attr("fill", fontColor)

    // ======> MOUSE ON for Creation Dates

    .on("mouseover", function (d) {
      //Lines
      group
        .selectAll("line")
        .filter(function (e) {
          return e.Creation === d.Creation;
        })
        .raise()
        .attr("stroke", strokeColorCreation)
        .attr("stroke-width", strokeWidth);

      //Creation Rectangles
      group
        .selectAll("rect")
        .filter(function (e) {
          return e.Creation === d.Creation;
        })
        .each(function (e) {
          d3.select(this).raise().attr("fill", creationColorHighlight);
        });
      //Acquisition Rectangles
      group2
        .selectAll("rect")
        .filter(function (e) {
          return e.Creation === d.Creation;
        })
        .each(function (e) {
          d3.select(this)
            .raise()
            .attr("fill", acquisitionColorHighlight)
            .attr("height", function (d) {
              return d.AcquisitionQuantity;
            });
        });

      group5
        .selectAll("text")
        .filter(function (e) {
          return e.Creation === d.Creation;
        })
        .style("display", "block");
    })

    // ======> MOUSE OUT

    .on("mouseout", function (d) {
      //Basic State for Lines
      group
        .selectAll("line")
        .lower()
        .attr("stroke", lineColor)
        .attr("stroke-width", lineWidth);
      //Basic State for Acquisition Rectangles
      group2
        .selectAll("rect")
        .attr("fill", acquisitionColor)
        .attr("opacity", 1);
      //Basic State for Creation Rectangles
      group
        .selectAll("rect")
        .attr("fill", creationColor)
        .attr("stroke-width", 0);

      // Detail Text
      group5.selectAll("text").style("display", "none");
    });






  //======================= ACQUISITION ============================







  //ACQUISITION RECTANGLES (GROUP2)

  group2
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return widthScale(d.Acquisition) - 5;
    })
    .attr("y", 365)
    .attr("width", 10)
    .attr("height", function (d) {
      return d.TotalAcquisition;
    })
    .attr("fill", acquisitionColor)
    .attr("id", function (d) {
      return "rect-" + d.Acquisition;
    })

    // ======> MOUSE ON for Acquisition Rectangles

    .on("mouseover", function (d) {
      //Lines
      group
        .selectAll("line")
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .raise()
        .attr("stroke", strokeColorAcquisition)
        .attr("stroke-width", strokeWidth);
      //Creation Rectangles
      group
        .selectAll("rect")
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .each(function (e) {
          d3.select(this)
            .raise()
            .attr("fill", creationColorHighlight)
            .attr("y", function (d) {
              return 50 - d.AcquisitionQuantity;
            })
            .attr("height", function (d) {
              return d.CreationQuantity;
            });
        });
      //Acquisition Rectangles
      group2
        .selectAll("rect")
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .attr("height", function (d) {
          return d.TotalAcquisition;
        })
        .attr("fill", acquisitionColorHighlight);
      // Detail Text
      group4
        .selectAll("text")
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .style("display", "block");

      // Total Text
      group7Text
        .selectAll("text")
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .style("display", "block");
    })

    // ======> MOUSE OUT

    .on("mouseout", function (d) {
      // Lines
      group
        .selectAll("line")
        .lower()
        .attr("stroke", lineColor)
        .attr("stroke-width", lineWidth);
      // Acquisition Rectangles
      group2
        .selectAll("rect")
        .attr("fill", acquisitionColor)
        .attr("display", "block");
      // Creation Rectangles
      group
        .selectAll("rect")
        .attr("fill", creationColor)
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .attr("y", function (d) {
          return 50 - d.TotalCreation;
        })
        .attr("height", function (d) {
          return d.TotalCreation;
        });
      // Detail Text
      group4.selectAll("text").style("display", "none");
      // Total Text
      group7Text.selectAll("text").style("display", "none");
    });

  //ACQUISITION DATES (GROUP2)

  group2
    .selectAll("text")
    .data(uniqueData2)
    .enter()
    .append("text")
    .attr("fill", fontColor)
    .attr("y", 405)
    .attr("x", function (d) {
      return widthScale(d.Acquisition) + 55;
    })
    .text(function (d) {
      return d.Acquisition;
    })
    .attr("transform", function (d) {
      return "rotate(-90 " + widthScale(d.Acquisition) + " " + 400 + ")";
    })
    .attr("font-size", font)
    .attr("fill", fontColor)

    // ======> MOUSE ON for Acquisition Dates

    .on("mouseover", function (d) {
      //for Lines
      group
        .selectAll("line")
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .raise()
        .attr("stroke", strokeColorAcquisition)
        .attr("stroke-width", strokeWidth);

      //Creation Rectangles
      group
        .selectAll("rect")
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .each(function (e) {
          d3.select(this)
            .raise()
            .attr("fill", creationColorHighlight)
            .attr("y", function (d) {
              return 50 - d.CreationQuantity;
            })
            .attr("height", function (d) {
              return d.CreationQuantity;
            });
        });

      //Acquisition Rectangles
      group2
        .selectAll("rect")
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .attr("height", function (d) {
          return d.TotalAcquisition;
        })
        .attr("fill", acquisitionColorHighlight);

      //Text
      group4
        .selectAll("text")
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .style("display", "block");
    })

    // ======> MOUSE OUT

    .on("mouseout", function (d) {
      //Lines
      group
        .selectAll("line")
        .lower()
        .attr("stroke", lineColor)
        .attr("stroke-width", lineWidth);

      //Acquisition Rectangles
      group2.selectAll("rect").attr("fill", acquisitionColor);

      //Creation Rectangles
      group
        .selectAll("rect")
        .attr("fill", creationColor)
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .attr("y", function (d) {
          return 50 - d.TotalCreation;
        })
        .attr("height", function (d) {
          return d.TotalCreation;
        });

      // Detail Text
      group4.selectAll("text").style("display", "none");
    });

  //CREATION INFO PRECISE

  group4
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("fill", fontColor)
    .attr("y", 63)
    .attr("x", function (d) {
      return widthScale(d.Creation);
    })
    .text(function (d) {
      return d.CreationQuantity;
    })
    .attr("font-size", font - 2)
    .attr("fill", fontColor)
    .attr("text-anchor", "middle")
    .style("display", "none");

  //ACQUISITION INFO PRECISE

  group5
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("fill", fontColor)
    .attr("y", 443)
    .attr("x", function (d) {
      return widthScale(d.Acquisition);
    })
    .text(function (d) {
      return d.AcquisitionQuantity;
    })
    .attr("font-size", font - 2)
    .attr("fill", fontColor)
    .attr("text-anchor", "middle")
    .style("display", "none");

  group6
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return widthScale(d.Creation) - 5;
    })
    .attr("y", function (d) {
      return 50 - d.TotalCreation;
    })
    .attr("width", 10)
    .attr("height", function (d) {
      return d.TotalCreation;
    })
    .attr("fill", creationColor)
    .attr("id", function (d) {
      return "rect-" + d.Creation;
    });

  group7Text
    .selectAll("text")
    .data(uniqueDataTotalTextAcquisition)
    .enter()
    .append("text")
    .attr("fill", fontColor)
    .attr("y", 443)
    .attr("x", function (d) {
      return widthScale(d.Acquisition);
    })
    .text(function (d) {
      return d.TotalAcquisition;
    })
    .attr("font-size", font - 2)
    .attr("fill", fontColor)
    .attr("text-anchor", "middle")
    .style("display", "none");

    group8Text
    .selectAll("text")
    .data(uniqueDataTotalTextCreation)
    .enter()
    .append("text")
    .attr("fill", fontColor)
    .attr("y", 63 )
    .attr("x", function (d) {
      return widthScale(d.Creation);
    })
    .text(function (d) {
      return d.TotalCreation;
    })
    .attr("font-size", font - 2)
    .attr("fill", fontColor)
    .attr("text-anchor", "middle")
    .style("display", "none");




});
