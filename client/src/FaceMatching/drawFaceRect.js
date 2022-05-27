export const drawFaceRect = (descriptions, faceDB, participants, ctx, setisMatchFound) => {
  // Loop through each desc
  // console.log(descriptions + "line 3")
    descriptions && descriptions.forEach(async (desc) => {
      // Extract boxes and classes
      const { x, y, width, height } = desc.detection.box;
      const landmarksPoint=desc.landmarks._positions;
      

     

     

      

      const bestMatch = faceDB.findBestMatch(desc.descriptor);
      
      console.log(bestMatch);
      

      ctx.font = "normal 18px Gotham, Helvetica Neue, sans-serif";
      ctx.lineWidth = 2;
      ctx.strokeStyle = bestMatch._label == "unknown" ? "#E00" : "#0E0";

      //draw 68 points
      landmarksPoint.map(point=>{
        console.log(point);
        ctx.beginPath();
        ctx.fillText(bestMatch._label, x, y + height + 20);
        ctx.fillStyle = bestMatch._label == "unknown" ? "#E00" : "#0E0";
        ctx.arc(point._x, point._y, 3, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fill();
      })
    

      // Draw rectangles and text
      ctx.beginPath();
      console.log("drwaing path")
      ctx.fillStyle = bestMatch._label == "unknown" ? "#E00" : "#0E0";
      ctx.rect(x, y, width, height);

      ctx.fillText(bestMatch._label, x, y + height + 20);
      ctx.fillText(`L2: ${bestMatch.distance.toFixed(2)}`, x, y);
      setisMatchFound(true);

      ctx.stroke();
      // console.log("drawn succesfull");
    });
};



