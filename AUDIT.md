# Audit: AI-Generated Resume Website

## Scope and Method

This audit reviews the AI-generated `index.html` and `css/styles.css` against the assignment requirements for semantic HTML, accessible data, and clean modern CSS. The source files were reviewed without applying source corrections.

Checks run:

- `vnu --errors-only index.html`
- `html-validate index.html`
- `stylelint css/styles.css`
- `playwright test tests/layout.spec.js tests/metadata.spec.js --project=chromium --reporter=line`

## Summary

The resume has a strong semantic HTML foundation. It uses meaningful page landmarks, one `h1`, sequential `h2` and `h3` headings, `article` elements for experience and education, lists for skills, and `time` plus `dl` elements for dates and metadata. The focused browser checks also pass.

The source does not yet pass all static checks. `index.html` has two HTML-lint errors, and `css/styles.css` has 13 Stylelint standards errors. None of the CSS lint findings are expected to alter the rendered design, but they prevent a clean test result under the project's configured CSS standard.

## Confirmed Source Findings

### Medium: Telephone number fails the HTML accessibility lint rule

At `index.html:40`, the telephone link displays `(206) 240-4700` with a breakable space and hyphen. `html-validate` reports two `tel-non-breaking` errors:

- The ordinary space should be a non-breaking space (`&nbsp;`).
- The hyphen should be a non-breaking hyphen (`&#8209;`).

This is an AI-generated source defect. It can allow the number to wrap awkwardly, reducing scanability and usability in narrow layouts.

### Medium: Professional-profile links are placeholders

At `index.html:42` and `index.html:43`, the LinkedIn and GitHub anchors use `href="#"`. Selecting either link returns the visitor to the top of the page rather than opening a professional profile. The generated response acknowledged that the actual URLs were unavailable, but placeholder links should be omitted until real destinations are provided.

### Low: Stylesheet does not meet the configured modern CSS standard

Stylelint reports 13 formatting and syntax-standard errors in `css/styles.css`:

- Long-form hexadecimal colors appear at lines 3, 60, 75, 136, 317, 328, 329, and 334 where the configured standard requests equivalent short forms.
- The shadow at line 10 uses legacy `rgba()` syntax and a decimal alpha rather than modern `rgb()` slash syntax with a percentage alpha.
- Media queries at lines 281 and 291 use legacy `max-width` notation rather than the configured range syntax.

These are code-quality findings rather than visual defects. They should be resolved to satisfy the project's lint configuration and allow the CSS check to pass.

## Assignment Requirement Review

### Requirements Met

- The name and contact information are within the page `header`; copyright information is in `footer`.
- The heading sequence is valid: one `h1` for the name, `h2` for major sections, and `h3` for individual groups and entries. No heading level is skipped.
- Experience and education records are self-contained `article` elements within their respective sections.
- Skills and contact data use semantic lists. Employment and education dates use `time`; dates and locations are labeled with definition lists.
- The layout uses CSS Grid and Flexbox, has responsive media queries, and does not use inline styles or float-based layout rules in the authored page.
- The skip link, visible focus treatment, language declaration, title, meta description, and viewport declaration are all present.

### Requirement Gaps

- The current professional-profile links are not usable destinations.
- The page cannot claim a fully clean static-validation result until the telephone and stylesheet findings are resolved.

## Test Results

| Check | Result | Notes |
| --- | --- | --- |
| HTML validator | Passed | `vnu` found no HTML conformance errors in `index.html`. |
| HTML lint | Failed | Two `tel-non-breaking` errors at `index.html:40`. |
| CSS lint | Failed | 13 Stylelint standards errors. |
| Focused Chromium browser tests | Passed | All 6 metadata and layout tests passed in 1.4 seconds. |

The package scripts were narrowed to the authored files (`index.html` and `css/styles.css`). Previously, recursive glob patterns linted dependencies and generated test reports, creating unrelated failures. The updated scripts now provide reproducible findings for the resume source.

`npm test` currently returns a nonzero result because `test:static` stops at the documented HTML-lint errors. Once those findings are corrected, it will continue to the CSS and Playwright browser checks.

The existing `tests/example.spec.js` still tests `https://playwright.dev/` rather than this resume. It should be replaced with a local-resume assertion before treating the full browser suite as exclusively project coverage. A prior full browser-suite run ended with exit code 130, so no pass/fail conclusion is recorded for that complete suite.

## Recommended Remediation Order

1. Correct the telephone separators at `index.html:40`.
2. Add real LinkedIn and GitHub URLs, or omit those links until URLs are available.
3. Resolve the 13 Stylelint findings using the configured CSS standard.
4. Replace the external Playwright example test with an assertion about the local resume page.