# XML-to-JSON review checklist

Use before accepting a conversion in an import or integration. These are review steps, not a claim that any converter is universally lossless.

- [ ] Identify the consumer's expected root name, object/array shape, and attribute convention.
- [ ] Test both one record and repeated records. A single child is a scalar/object; repeated siblings become an array in this kit.
- [ ] Keep identifiers such as `007`, decimal strings such as `12.50`, and date strings unchanged unless the consumer explicitly needs typed values.
- [ ] Check empty, absent, and whitespace-only elements separately. This kit maps an empty element to an empty string; an absent element has no key.
- [ ] Inspect attributes under `_attributes`. They remain strings.
- [ ] Inspect direct text under `_text` when attributes or children exist.
- [ ] Do not use this mapping for mixed-content publishing or round-trip XML. It joins direct text and loses text/element ordering.
- [ ] Check namespace prefixes. The kit keeps qualified names as written; it does not normalize equivalent namespace URIs or prefixes.
- [ ] Check whether whitespace, comments, processing instructions, or CDATA boundaries are meaningful. Whitespace is trimmed; comments and processing instructions are discarded; CDATA becomes text.
- [ ] Reject or separately process DTD/custom-entity documents. This kit refuses any DOCTYPE declaration.
- [ ] Check collisions with `_attributes` and `_text`. These names are reserved for child elements and produce errors. The element name `parsererror` is also rejected because it is used by browser XML error reports.
- [ ] Check malformed markup with negative fixtures. A successful parse is not XSD or DTD validation.
- [ ] Compare representative input and expected output before importing. Do not assume another converter uses the same mapping.
- [ ] For large files, use a streaming parser; this kit builds the whole document in memory and has no measured size/performance guarantee.
- [ ] Keep original XML if later consumers may require information discarded by the mapping.

## Provenance

Derived from the public ParseBloom homepage's documented repeated-element, attribute, text, and qualified-name conventions, inspected on 2026-10-25, plus explicit limitations and defensive behavior of `core.js` in this repository. The local kit adds CDATA handling, null-prototype objects, reserved-name rejection, and DOCTYPE rejection; it is not claimed to be identical to the hosted implementation.
