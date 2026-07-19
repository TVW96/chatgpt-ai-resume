export default {
  extends: ["stylelint-config-standard"],

  rules: {
    "declaration-block-no-duplicate-properties": true,
    "property-no-unknown": true,
    "media-feature-name-no-unknown": true,
    "selector-max-id": 0,
    "no-descending-specificity": null
  }
};