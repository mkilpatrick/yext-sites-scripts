// Builds a featureConfig suitable for use with generate-test-data.
export const buildFeatureConfig = (templateConfig: any): any => {
  return {
    features: [
      {
        name: templateConfig.name,
        streamId: templateConfig.streamId,
        templateType: 'JS',
        entityPageSet: {},
      },
    ],
    streams: [templateConfig.stream],
  };
};
