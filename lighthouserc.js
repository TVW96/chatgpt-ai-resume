export default {
  ci: {
    collect: {
      staticDistDir: ".",
      numberOfRuns: 3
    },

    assert: {
      assertions: {
        "categories:performance": [
          "warn",
          {
            "minScore": 0.8
          }
        ],
        "categories:accessibility": [
          "error",
          {
            "minScore": 0.9
          }
        ],
        "categories:best-practices": [
          "error",
          {
            "minScore": 0.9
          }
        ],
        "categories:seo": [
          "error",
          {
            "minScore": 0.9
          }
        ],
        "document-title": "error",
        "meta-description": "error",
        "viewport": "error",
        "html-has-lang": "error"
      }
    },

    upload: {
      target: "temporary-public-storage"
    }
  }
};