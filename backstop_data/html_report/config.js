report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_Blog_Homepage_0_document_0_phone.png",
        "test": "..\\bitmaps_test\\20191121-181548\\backstop_default_Blog_Homepage_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_Blog_Homepage_0_document_0_phone.png",
        "label": "Blog Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:8000",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.01",
          "analysisTime": 654
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_Blog_Homepage_0_document_1_tablet.png",
        "test": "..\\bitmaps_test\\20191121-181548\\backstop_default_Blog_Homepage_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_Blog_Homepage_0_document_1_tablet.png",
        "label": "Blog Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:8000",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00",
          "analysisTime": 422
        }
      },
      "status": "pass"
    }
  ],
  "id": "backstop_default"
});