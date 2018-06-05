var CSV={};!function(e){"use strict";e.__type__="csv";var r="undefined"!=typeof jQuery&&jQuery.Deferred||"undefined"!=typeof _&&_.Deferred||function(){var e,r,t=new Promise(function(t,n){e=t,r=n});return{resolve:e,reject:r,promise:function(){return t}}};e.fetch=function(t){var n=new r;if(t.file){var i=new FileReader,o=t.encoding||"UTF-8";i.onload=function(r){var i=e.extractFields(e.parse(r.target.result,t),t);i.useMemoryStore=!0,i.metadata={filename:t.file.name},n.resolve(i)},i.onerror=function(e){n.reject({error:{message:"Failed to load file. Code: "+e.target.error.code}})},i.readAsText(t.file,o)}else if(t.data){var a=e.extractFields(e.parse(t.data,t),t);a.useMemoryStore=!0,n.resolve(a)}else if(t.url){(window.fetch||function(e){var r=jQuery.get(e),t={then:function(e){return r.done(e),t},catch:function(e){return r.fail(e),t}};return t})(t.url).then(function(e){return e.text?e.text():e}).then(function(r){var i=e.extractFields(e.parse(r,t),t);i.useMemoryStore=!0,n.resolve(i)}).catch(function(e,r){n.reject({error:{message:"Failed to load file. "+e.statusText+". Code: "+e.status,request:e}})})}return n.promise()},e.extractFields=function(e,r){return!0!==r.noHeaderRow&&e.length>0?{fields:e[0],records:e.slice(1)}:{records:e}},e.normalizeDialectOptions=function(e){var r={delimiter:",",doublequote:!0,lineterminator:"\n",quotechar:'"',skipinitialspace:!0,skipinitialrows:0};for(var t in e)"trim"===t?r.skipinitialspace=e.trim:r[t.toLowerCase()]=e[t];return r},e.parse=function(r,i){(!i||i&&!i.lineterminator)&&(r=e.normalizeLineTerminator(r,i));var a,l,s=e.normalizeDialectOptions(i);a=r,l=s.lineterminator,r=a.charAt(a.length-l.length)!==l?a:a.substring(0,a.length-l.length);var u,c,f="",d=!1,p=!1,m="",h=[],g=[];for(c=function(e){return!0!==p&&(""===e?e=null:!0===s.skipinitialspace&&(e=o(e)),t.test(e)?e=parseInt(e,10):n.test(e)&&(e=parseFloat(e,10))),e},u=0;u<r.length;u+=1)f=r.charAt(u),!1!==d||f!==s.delimiter&&f!==s.lineterminator?f!==s.quotechar?m+=f:d?r.charAt(u+1)===s.quotechar?(m+=s.quotechar,u+=1):d=!1:(d=!0,p=!0):(m=c(m),h.push(m),f===s.lineterminator&&(g.push(h),h=[]),m="",p=!1);return m=c(m),h.push(m),g.push(h),s.skipinitialrows&&(g=g.slice(s.skipinitialrows)),g},e.normalizeLineTerminator=function(e,r){return(r=r||{}).lineterminator?e:e.replace(/(\r\n|\n|\r)/gm,"\n")},e.objectToArray=function(e){for(var r=[],t=[],n=0;n<e.fields.length;n++)t.push(e.fields[n].id);r.push(t);for(n=0;n<e.records.length;n++){for(var i=[],o=e.records[n],a=0;a<t.length;a++)i.push(o[t[a]]);r.push(i)}return r},e.serialize=function(r,t){var n=null;n=r instanceof Array?r:e.objectToArray(r);var o,a,l,s=e.normalizeDialectOptions(t),u="",c="",f="",d="";for(l=function(e){return null===e?e="":"string"==typeof e&&i.test(e)?(s.doublequote&&(e=e.replace(/"/g,'""')),e=s.quotechar+e+s.quotechar):"number"==typeof e&&(e=e.toString(10)),e},o=0;o<n.length;o+=1)for(u=n[o],a=0;a<u.length;a+=1)c=l(u[a]),a===u.length-1?(d+=(f+=c)+s.lineterminator,f=""):f+=c+s.delimiter,c="";return d};var t=/^\d+$/,n=/^\d*\.\d+$|^\d+\.\d*$/,i=/^\s|\s$|,|"|\n/,o=String.prototype.trim?function(e){return e.trim()}:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}(CSV);var recline=recline||{};recline.Backend=recline.Backend||{},recline.Backend.CSV=CSV,"undefined"!=typeof module&&module.exports&&(module.exports=CSV);