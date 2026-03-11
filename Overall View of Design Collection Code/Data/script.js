d3.json("Data/data.json", function (data) {
    var width = 2500;
    var height = 4000;
  
    var svg = d3
      .select("#body")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    var uniqueDataTotalTextAcquisition = Array.from(
      new Set(data.map((d) => d.Acquisition))
    ).map((Acquisition) => {
      return data.find((d) => d.Acquisition === Acquisition);
    });
  
var uniqueDataTotalTextCreation = Array.from(
  new Set(data.map((d) => d.Creation))  // ✅ deduping by date
).map((Creation) => {
  return data.find((d) => d.Creation === Creation);
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
  
    var acquisitionColor = "#111f30";
  
    var acquisitionColorHighlight = "orange";
  
    var creationColor = "#111f30";
  
    var creationColorHighlight = "orange";
  
    var font = "18";

    var fontHighlight = "19";

    var fontHighlightOrigin = "75";
  
    var lineColor = "#677c6e";
  
    var lineWidth = "0.15";
  
    var strokeWidth = "1";
  
    var lineOpacity = "1";
  
    var fontColor = "#302d2b";
  
    var strokeColorCreation = "#3150ff";
  
    var strokeColorAcquisition = "#ff0000";

    // Pre-calculate sorted x positions for creation dates
var creationXPositions = uniqueData.map(d => widthScale(d.Creation)).sort((a, b) => a - b);
var acquisitionXPositions = uniqueData2.map(d => widthScale(d.Acquisition)).sort((a, b) => a - b);

function dynamicFontSize(xPos, sortedPositions, text, maxFont) {
  var index = sortedPositions.indexOf(xPos);
  var left = index > 0 ? xPos - sortedPositions[index - 1] : Infinity;
  var right = index < sortedPositions.length - 1 ? sortedPositions[index + 1] - xPos : Infinity;
  var availableSpace = Math.min(left, right);
  var charWidth = maxFont * 0.6;
  var textWidth = String(text).length * charWidth;
  if (textWidth > availableSpace) {
    return Math.max(8, (availableSpace / String(text).length) / 0.6);
  }
  return maxFont;
}
  
    // Track last hovered items
    var lastCreation = null;
    var lastAcquisition = null;
  
    // Function to reset all to default state
    function resetAll() {
      group.selectAll("line")
        .attr("stroke", lineColor)
        .attr("stroke-width", lineWidth);
      
      group2.selectAll("rect")
        .attr("fill", acquisitionColor);
      
      group.selectAll("rect")
        .attr("fill", creationColor)
        .attr("y", function (d) {
          return 50 - d.TotalCreation;
        })
        .attr("height", function (d) {
          return d.TotalCreation;
        });
      
      group4.selectAll("text").style("display", "none");
      group5.selectAll("text").style("display", "none");
      group7Text.selectAll("text").style("display", "none");
      group8Text.selectAll("text").style("display", "none");
    }
  
    // Function to highlight creation
    
    function highlightCreation(d) {
      resetAll();
      lastCreation = d.Creation;
      lastAcquisition = null;
      
      group.selectAll("line")
        .filter(function (e) {
          return e.Creation === d.Creation;
        })
        .raise()
        .attr("stroke", strokeColorCreation)
        .attr("stroke-width", strokeWidth);
  
      group2.selectAll("rect")
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
  
      group.selectAll("rect")
        .filter(function (e) {
          return e.Creation === d.Creation;
        })
        .each(function (e) {
          d3.select(this).raise().attr("fill", creationColorHighlight);
        });
  
      group5.selectAll("text")
        .filter(function (e) {
          return e.Creation === d.Creation;
        })
        .style("display", "block");
  
      group8Text.selectAll("text")
        .filter(function (e) {
          return e.Creation === d.Creation;
        })
        .style("display", "block");
    }
  
    // Function to highlight acquisition

    function highlightAcquisition(d) {
      resetAll();
      lastAcquisition = d.Acquisition;
      lastCreation = null;
      
      group.selectAll("line")
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .raise()
        .attr("stroke", strokeColorAcquisition)
        .attr("stroke-width", strokeWidth);
  
      group.selectAll("rect")
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
  
      group2.selectAll("rect")
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .attr("height", function (d) {
          return d.TotalAcquisition;
        })
        .attr("fill", acquisitionColorHighlight);
  
      group4.selectAll("text")
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .style("display", "block");
  
      group7Text.selectAll("text")
        .filter(function (e) {
          return e.Acquisition === d.Acquisition;
        })
        .style("display", "block");
    }
  
// Lines between DATES

    group
      .selectAll("line")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", function (d) {
        return widthScale(d.Creation);
      })
      .attr("y1", 130)
      .attr("x2", function (d) {
        return widthScale(d.Acquisition);
      })
      .attr("y2", 400)
      .attr("stroke", lineColor)
      .attr("stroke-width", lineWidth)
      .attr("stroke-linecap", "round")
      .attr("opacity", lineOpacity)
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
      .on("mouseover", function (d) {
        highlightCreation(d);
      });
  
    //CREATION DATES (GROUP1)
  
    group
      .selectAll("text")
      .data(uniqueData)
      .enter()
      .append("text")
      .attr("y", 85)
      .attr("x", function (d) {
        return widthScale(d.Creation) - 45;
      })
      .text(function (d) {
        return d.Creation;
      })
      .attr("transform", function (d) {
        return "rotate(-90 " + widthScale(d.Creation) + " " + 79 + ")";
      })
      .attr("font-size", font)
      .style("font-family", "Josefin Sans, sans-serif")
      .attr("fill", fontColor)
      .on("mouseover", function (d) {
        highlightCreation(d);
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
      .attr("y", 395)
      .attr("width", 10)
      .attr("height", function (d) {
        return d.TotalAcquisition;
      })
      .attr("fill", acquisitionColor)
      .attr("id", function (d) {
        return "rect-" + d.Acquisition;
      })
      .on("mouseover", function (d) {
        highlightAcquisition(d);
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
        return widthScale(d.Acquisition) + 40;
      })
      .text(function (d) {
        return d.Acquisition;
      })
      .attr("transform", function (d) {
        return "rotate(-90 " + widthScale(d.Acquisition) + " " + 400 + ")";
      })
      .attr("font-size", font)
      .style("font-family", "Josefin Sans, sans-serif")
      .attr("fill", fontColor)
      .on("mouseover", function (d) {
        highlightAcquisition(d);
      });
  
//CREATION INFO PRECISE

group4
  .selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .attr("fill", fontColor)
  .attr("y", 75)
  .attr("x", function (d) {
    return widthScale(d.Creation);
  })
  .text(function (d) {
    return d.CreationQuantity;
  })
  .attr("font-size", function(d) {
    var xPos = widthScale(d.Creation);
    return dynamicFontSize(xPos, creationXPositions, d.CreationQuantity, fontHighlight);
  })
  .style("font-family", "Josefin Sans, sans-serif")
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
  .attr("y", 468)
  .attr("x", function (d) {
    return widthScale(d.Acquisition);
  })
  .text(function (d) {
    return d.AcquisitionQuantity;
  })
  .attr("font-size", function(d) {
    var xPos = widthScale(d.Acquisition);
    return dynamicFontSize(xPos, acquisitionXPositions, d.AcquisitionQuantity, fontHighlight);
  })
  .attr("text-anchor", "middle")
  .style("font-family", "Josefin Sans, sans-serif")
  .style("display", "none");
    // group6
    //   .selectAll("rect")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("x", function (d) {
    //     return widthScale(d.Creation) - 5;
    //   })
    //   .attr("y", function (d) {
    //     return 50 - d.TotalCreation;
    //   })
    //   .attr("width", 10)
    //   .attr("height", function (d) {
    //     return d.TotalCreation;
    //   })
    //   .attr("fill", creationColor)
    //   .attr("id", function (d) {
    //     return "rect-" + d.Creation;
    //   });
  
    group7Text
      .selectAll("text")
      .data(uniqueDataTotalTextAcquisition)
      .enter()
      .append("text")
      .attr("fill", fontColor)
      .style("font-family", "Josefin Sans, sans-serif")
      .attr("y", 465)
      .attr("x", function (d) {
        return widthScale(d.Acquisition);
      })
      .text(function (d) {
        return d.TotalAcquisition;
      })
      .attr("font-size", fontHighlightOrigin)
      .attr("fill", "red")
      .attr("text-anchor", "middle")
      .style("display", "none");
  
    group8Text
      .selectAll("text")
      .data(uniqueDataTotalTextCreation)
      .enter()
      .append("text")
      .attr("fill", fontColor)
      .attr("y", 110)
      .attr("x", function (d) {
        return widthScale(d.Creation);
      })
      .text(function (d) {
        return d.TotalCreation;
      })
      .attr("font-size", fontHighlightOrigin)
      .attr("fill", strokeColorCreation)
      .attr("text-anchor", "middle")
      .style("display", "none")
      .style("font-family", "Josefin Sans, sans-serif");
  
  });

  