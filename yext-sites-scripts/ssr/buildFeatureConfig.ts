// Builds a featureConfig suitable for use with generate-test-data.
export const buildFeatureConfig = (templateConfig: any): any => {
  return {
    features: [
      {
        name: templateConfig.name,
        streamId: templateConfig.streamId,
        templateType: "JS",
        entityPageSet: {}
      }
    ],
    streams: [
      templateConfig.stream
    ]
  }
};


// "features": [
//   {
//     "name": "Locations",
//     "streamId": "sites-locationEntity",
//     "templateType": "JS",
//     "entityPageSet": {
//         "plugin": {}
//     }
//   },
//   {
//     "name": "MLOs",
//     "streamId": "sites-mlo",
//     "templateType": "JS",
//     "entityPageSet": {
//         "plugin": {}
//     }
//   }
// ],
// "streams": [
//   {
//     "$id": "sites-locationEntity",
//     "source": "knowledgeGraph",
//     "destination": "pages",
//     "fields": [
//         "id", 
//         "uid", 
//         "meta",
//         "name", 
//         "address", 
//         "mainPhone",
//         "description", 
//         "hours",
//         "photoGallery",
//         "slug",
//         "geocodedCoordinate",
//         "services",
//         "neighborhood",
//         "paymentOptions",
//         "c_relatedFAQs.question",
//         "c_relatedFAQs.answer"
//     ],
//     "filter": {
//       "entityTypes": [
//         "location"
//       ]
//     },
//     "localization": {
//       "locales": [
//         "en"
//       ],
//       "primary": false
//     }
//   },