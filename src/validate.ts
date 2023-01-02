import fs from 'fs'
import libxmljs from 'libxmljs'
import xmlFormat from 'xml-formatter';

// from https://stackoverflow.com/questions/14856643/validating-xml-against-a-schema-xsd-in-nodejs

// var xsd = '<?xml version="1.0" encoding="utf-8" ?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://example.com/XMLSchema/1.0" targetNamespace="http://example.com/XMLSchema/1.0" elementFormDefault="qualified" attributeFormDefault="unqualified"><xs:element name="foo"></xs:element></xs:schema>'
// var xsdDoc = x.parseXmlString(xsd);

// var xml0 = '<?xml version="1.0" encoding="UTF-8"?><foo xmlns="http://example.com/XMLSchema/1.0"></foo>';
// var xmlDoc0 = x.parseXmlString(xml0);
// var xml1 = '<?xml version="1.0" encoding="UTF-8"?><bar xmlns="http://example.com/XMLSchema/1.0"></bar>';
// var xmlDoc1 = x.parseXmlString(xml1);

// var result0 = xmlDoc0.validate(xsdDoc);
// console.log("result0:", result0);

// var result1 = xmlDoc1.validate(xsdDoc);
// console.log("result1:", result1);


const xsd = fs.readFileSync('./data/schema/xccdf_1.2.xsd', 'utf8')
const xsdDoc = libxmljs.parseXml(xsd, {huge: true});

// console.log("xsdDoc is", xsdDoc.toString())
// console.log("xsd is", xmlFormat(xsd))

const xccdfFile = fs.readFileSync('./data/xccdf.xml', 'utf8')
const xccdfXmlDoc = libxmljs.parseXml(xccdfFile, {huge: true});

let result = xccdfXmlDoc.validate(xsdDoc);
//console.log("result:", result0);

