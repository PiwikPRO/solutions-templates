(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{73:function(e,a,t){"use strict";t.r(a);var n=t(3),r=t(7),c=t(0),l=t.n(c),i=t(79),m=t(87),s=t(99),u=t(22),o=t(74),d=t.n(o);function p(e){var a=e.value,t=e.type,c=e.onChange,i=e.name,m=e.id,s=Object(r.a)(e,["value","type","onChange","name","id"]);switch(t){case"boolean":return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{id:m,name:i,type:"checkbox",onChange:function(){return c({target:{name:i,value:!a}})},checked:a}));case"text":return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",Object(n.a)({id:m,className:d.a.input,name:i,type:"text",onChange:c,value:a},s.choices?{list:m+"-choices"}:{})),s.choices&&l.a.createElement("datalist",{id:m+"-choices"},s.choices.map((function(e){return l.a.createElement("option",{key:e,value:e})}))));case"number":return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{name:i,id:m,className:d.a.input,type:"number",onChange:c,value:a}));default:return null}}function g(e){var a=e.args,t=e.values,c=e.onChange,i=function(e){var a;c(Object.assign({},t,((a={})[e.target.name]=e.target.value,a)))};return l.a.createElement("div",{className:d.a.generatorForm},a.map((function(e){e.id,e.type,e.displayName,e.description;var a=Object(r.a)(e,["id","type","displayName","description"]);return l.a.createElement("div",{className:d.a.annotatedLayout},l.a.createElement("div",{className:d.a.annotatedLayoutLabel},l.a.createElement("h3",null,e.displayName),l.a.createElement("div",null,e.description)),l.a.createElement("div",{className:d.a.annotatedLayoutBody},l.a.createElement(p,Object(n.a)({id:e.id,name:e.id,type:e.type,value:t[e.id],onChange:i},a))))})))}function E(e){var a=e.template,t=Object(c.useState)(!1),n=t[0],r=t[1],i=Object(c.useState)(""),m=i[0],u=i[1],o=Object(c.useState)(a.arguments.reduce((function(e,a){return e[a.id]=a.default,e}),{})),p=o[0],E=o[1];return Object(c.useEffect)((function(){var e=p.iife?"(function () {"+a.template+"})();":a.template;u(Object.entries(p).reduce((function(e,a){var t=a[0],n=a[1];return e.replace("{{"+t+"}}",n)}),e))}),[p]),l.a.createElement("div",{className:d.a.generator},l.a.createElement("h2",{className:d.a.cardHeading},a.name),l.a.createElement("p",{className:d.a.cardDescription},a.description),n&&l.a.createElement(g,{args:a.arguments,values:p,onChange:E}),l.a.createElement("div",{className:d.a.snippetWrapper},l.a.createElement("button",{type:"button",className:d.a.customizeButton,onClick:r},"Customize"),l.a.createElement(s.a,{className:"language-js"},m)))}a.default=function(){var e=Object(u.default)().siteConfig,a=void 0===e?{}:e;return l.a.createElement(m.a,{title:a.title,description:a.tagline},l.a.createElement("header",{className:Object(i.a)("hero hero--primary",d.a.heroBanner)},l.a.createElement("div",{className:"container"},l.a.createElement("h1",{className:"hero__title"},a.title),l.a.createElement("p",{className:"hero__subtitle"},a.tagline))),l.a.createElement("main",null,l.a.createElement("section",null,l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row "+d.a.generatorRow},a.themeConfig.generator.templates.map((function(e){return l.a.createElement(E,{key:e.id,template:Object.assign({},e,{arguments:[].concat(e.arguments,a.themeConfig.generator.arguments)})})})))))))}}}]);