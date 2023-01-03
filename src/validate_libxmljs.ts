import fs from 'fs'
import libxmljs from 'libxmljs'
import xmlFormat from 'xml-formatter';

// npm https://github.com/libxmljs/libxmljs

///////////////////// EXAMPLE ////////////////////////////////
// example from https://stackoverflow.com/questions/14856643/validating-xml-against-a-schema-xsd-in-nodejs

var xsd1 = '<?xml version="1.0" encoding="utf-8" ?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://example.com/XMLSchema/1.0" targetNamespace="http://example.com/XMLSchema/1.0" elementFormDefault="qualified" attributeFormDefault="unqualified"><xs:element name="foo"></xs:element></xs:schema>'
var xsdDoc1 = libxmljs.parseXmlString(xsd1);

var xml0 = '<?xml version="1.0" encoding="UTF-8"?><foo xmlns="http://example.com/XMLSchema/1.0"><child2>second</child2></foo>';
var xmlDoc0 = libxmljs.parseXmlString(xml0);
var xml1 = '<?xml version="1.0" encoding="UTF-8"?><bar xmlns="http://example.com/XMLSchema/1.0">WHAT IS THIS</bar>';
var xmlDoc1 = libxmljs.parseXmlString(xml1);

var result0 = xmlDoc0.validate(xsdDoc1);
console.log("result0:", result0);

var result1 = xmlDoc1.validate(xsdDoc1);
console.log("result1:", result1);

//////////// EXAMPLE /////////////////////////////////

var xml =  '<?xml version="1.0" encoding="UTF-8"?>' +
           '<Benchmark xmlns="http://checklists.nist.gov/xccdf/1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="test">' +
               '<child foo="bar">' +
                   '<grandchild baz="fizbuzz">grandchild content</grandchild>' +
                   '<new_child>' +
                      '<ch1>Joe Feliciano</ch1>' +
                    '</new_child>' +
               '</child>' +
               '<sibling>with content!</sibling>' +
           '</Benchmark>';

var xmlDoc = libxmljs.parseXml(xml);

// xpath queries
var gchild = xmlDoc.get('//xmlns:ch1', {'xmlns': 'http://checklists.nist.gov/xccdf/1.1', 'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'});
console.log(gchild.text()); 

var children = xmlDoc.childNodes();
var child = children[0];
console.log(child.attr('foo').value()); // prints "bar"
console.log(child.attr('foo'))
////////////////////////////////////////////



const xsd = fs.readFileSync('./data/schema/1_1/xccdf-1.1.4.xsd', 'utf8')
const xsdDoc = libxmljs.parseXmlString(xsd, {huge: true});
// console.log("xsdDoc is", xsdDoc.toString())
// console.log("xsd is", xmlFormat(xsd))

const xccdfFile = fs.readFileSync('./data/xccdf.xml', 'utf8')
const xccdfXmlDoc = libxmljs.parseXml(xccdfFile, {huge: true});
//console.log("xccdfXmlDoc is", xmlFormat(xccdfXmlDoc.toString()))

// xpath queries
var statuschild = xccdfXmlDoc.get('//xmlns:title', {'xmlns': 'http://checklists.nist.gov/xccdf/1.1', 'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'});
console.log(statuschild.text()); 
var children = xmlDoc.childNodes();
var child = children[0];
console.log(child.attr('date')); // prints "test"

// let result = xccdfXmlDoc.validate(xsdDoc);
//console.log("result:", result0);


