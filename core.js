/* SPDX-License-Identifier: MIT */
(function (root) {
  'use strict';
  function convert(xml) {
    if (typeof xml !== 'string' || !xml.trim()) throw new Error('Provide a non-empty XML document.');
    // This focused converter does not support DTDs or custom entities.
    if (/<!DOCTYPE\b/i.test(xml)) throw new Error('DOCTYPE is not supported.');
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    if (!doc.documentElement || doc.getElementsByTagName('parsererror').length) {
      throw new Error('Malformed XML document.');
    }
    function visit(node) {
      const attrs = Object.create(null);
      for (const attr of node.attributes) attrs[attr.name] = attr.value;
      const children = Array.from(node.childNodes).filter(n => n.nodeType === 1);
      const text = Array.from(node.childNodes).filter(n => n.nodeType === 3 || n.nodeType === 4).map(n => n.nodeValue).join('').trim();
      if (!children.length && !Object.keys(attrs).length) return text;
      const result = Object.create(null);
      if (Object.keys(attrs).length) result._attributes = attrs;
      if (text) result._text = text;
      for (const child of children) {
        const key = child.nodeName;
        if (key === '_attributes' || key === '_text') throw new Error('Reserved element name: ' + key);
        const value = visit(child);
        if (!Object.hasOwn(result, key)) result[key] = value;
        else if (Array.isArray(result[key])) result[key].push(value);
        else result[key] = [result[key], value];
      }
      return result;
    }
    const result = Object.create(null);
    result[doc.documentElement.nodeName] = visit(doc.documentElement);
    return result;
  }
  root.XmlJsonKit = Object.freeze({convert});
})(globalThis);
