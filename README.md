# XML JSON Conversion Kit

A dependency-free browser converter, synthetic fixtures, and a review checklist for moving record-shaped XML into JSON without silently guessing numeric types.

The mapping is based on the browser-local converter at [ParseBloom](https://parsebloom.com/).

## Use

Download or clone this repository and open `index.html` in a modern browser. Paste XML, convert it, and download the JSON. Open `tests.html` to run the regression fixtures. Both pages work directly from disk; no build, account, server, or package installation is required.

To reuse the conversion function in a browser page:

```html
<script src="core.js"></script>
<script>
const result = XmlJsonKit.convert('<orders><order id="007">paid</order></orders>');
console.log(JSON.stringify(result, null, 2));
</script>
```

Expected output:

```json
{"orders":{"order":{"_attributes":{"id":"007"},"_text":"paid"}}}
```

## Files

| File | Purpose |
| --- | --- |
| `core.js` | Reusable `XmlJsonKit.convert(xml)` function using the browser DOMParser |
| `index.html` | Local input/output UI and JSON download |
| `CHECKLIST.md` | Practical migration and information-loss review checklist |
| `fixtures.json` | Synthetic inputs with exact expected objects or expected errors |
| `fixtures.csv` | The same cases in a portable table for manual review |
| `fixtures.js` | Browser-readable fixture copy generated from the same source |
| `tests.html` | Browser regression runner; reports each case and totals |

## Mapping and limits

- The document root is retained as the outer key.
- Leaf text stays a string, including `007`, `false`, and `12.50`.
- Empty elements become `""`. Repeated siblings with the same name become arrays.
- Attributes are stored under `_attributes`; direct text with attributes/children is stored under `_text`.
- Qualified names are retained, but namespace identity is not normalized.
- Direct text and CDATA are joined and trimmed. Mixed-content order, comments, processing instructions, and CDATA boundaries are lost. Different-name child order is not a round-trip contract.
- DOCTYPE declarations and reserved child names `_attributes`/`_text` are rejected. Elements named `parsererror` are also rejected because browsers use that name to report malformed XML. Null-prototype objects preserve names such as `__proto__` as data.
- This is a structural mapping, not XSD validation, an XML canonicalizer, or a lossless archival format. It builds the entire XML tree in memory.

The kit is derived from the site's documented mapping and extends it with defensive name handling, CDATA support, and explicit rejection of DTDs. Do not assume edge-case parity with the hosted tool. All fixture data is synthetic and authored for this repository; it is not a benchmark or customer dataset. Expected results are specified by these rules, not measured claims about other products.

## Contributing

Add a minimal XML case, the intended JSON or error, and why it matters. Keep `fixtures.json`, `fixtures.js`, and `fixtures.csv` synchronized. Run `tests.html` in your browser and report the browser used. Changes to mapping semantics should update this README and checklist.

## License

MIT. See `LICENSE`.
