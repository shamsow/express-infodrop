var express = require('express');
var router = express.Router();
const PDFDocument = require('pdfkit');



// Load home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'InfoDrop' });
});

// Handle form submission
router.post('/', (req, res, next) => {
  title = req.body.title;
  heading = title ? title : "InfoDrop";
  name = req.body.firstName + ' ' + req.body.lastName;
  address = req.body.address1;
  city = req.body.city;
  country = req.body.country;
  zip = req.body.zip;
  // console.log(name, address, city, country, zip);

  const doc = new PDFDocument({
    size: [419.53, 595.28],
    layout: 'landscape', // can be 'landscape'
    info: {
        Title: title, 
        Author: name, // the name of the author
        Keywords: 'pdf;javascript' // keywords associated with the document
    }
  });

  doc.pipe(res);

  doc
    .lineWidth(3)
    .lineJoin('round')
    .rect(40,40,510,340)
    // .dash(5, {space: 10})
    .stroke()

  doc
    .font('Helvetica-Bold', 35)
    .text(heading, {
      align: 'center'
    })
    .font('Helvetica', 21)
    .moveDown(3)
    .text(name, 60, 200, {
      width: 200
    })
    .text(address, 330, 180)
    .moveDown(0.3)
    .text(city)
    .moveDown(0.3)
    .text(country)
    .moveDown(0.3)
    .text(zip)
    
  doc.end();
  
  // res.render('index', { title: 'Submitted'});
});

module.exports = router;
