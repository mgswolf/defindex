/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
CKEDITOR.dialog.add("docProps",function(e){function i(t,n){var r=function(){i(this),n(this,this._.parentDialog)},i=function(e){e.removeListener("ok",r),e.removeListener("cancel",i)},s=function(e){e.on("ok",r),e.on("cancel",i)};e.execCommand(t),e._.storedDialogs.colordialog?s(e._.storedDialogs.colordialog):CKEDITOR.on("dialogDefinition",function(e){if(e.data.name!=t)return;var n=e.data.definition;e.removeListener(),n.onLoad=CKEDITOR.tools.override(n.onLoad,function(e){return function(){s(this),n.onLoad=e,typeof e=="function"&&e.call(this)}})})}function s(){var e=this.getDialog(),t=e.getContentElement("general",this.id+"Other");if(!t)return;this.getValue()=="other"?(t.getInputElement().removeAttribute("readOnly"),t.focus(),t.getElement().removeClass("cke_disabled")):(t.getInputElement().setAttribute("readOnly",!0),t.getElement().addClass("cke_disabled"))}function o(t,n,i){return function(s,o,u){var a=r,f=typeof i!="undefined"?i:this.getValue();if(!f&&t in a)a[t].remove();else if(f&&t in a)a[t].setAttribute("content",f);else if(f){var l=new CKEDITOR.dom.element("meta",e.document);l.setAttribute(n?"http-equiv":"name",t),l.setAttribute("content",f),u.append(l)}}}function u(e,t){return function(){var n=r,i=e in n?n[e].getAttribute("content")||"":"";return t?i:(this.setValue(i),null)}}function a(e){return function(t,n,r,i){i.removeAttribute("margin"+e);var s=this.getValue();s!==""?i.setStyle("margin-"+e,CKEDITOR.tools.cssLength(s)):i.removeStyle("margin-"+e)}}function f(e){var t={},n=e.getElementsByTag("meta"),r=n.count();for(var i=0;i<r;i++){var s=n.getItem(i);t[s.getAttribute(s.hasAttribute("http-equiv")?"http-equiv":"name").toLowerCase()]=s}return t}function l(e,t,n){e.removeStyle(t),e.getComputedStyle(t)!=n&&e.setStyle(t,n)}var t=e.lang.docprops,n=e.lang.common,r={},c=function(e,n,r){return{type:"hbox",padding:0,widths:["60%","40%"],children:[CKEDITOR.tools.extend({type:"text",id:e,label:t[n]},r||{},1),{type:"button",id:e+"Choose",label:t.chooseColor,className:"colorChooser",onClick:function(){var t=this;i("colordialog",function(n){var r=t.getDialog();r.getContentElement(r._.currentTabId,e).setValue(n.getContentElement("picker","selectedColor").getValue())})}}]}},h="javascript:void((function(){"+encodeURIComponent("document.open();"+(CKEDITOR.env.isCustomDomain()?"document.domain='"+document.domain+"';":"")+'document.write( \'<html style="background-color: #ffffff; height: 100%"><head></head><body style="width: 100%; height: 100%; margin: 0px">'+t.previewHtml+"</body></html>' );"+"document.close();")+"})())";return{title:t.title,minHeight:330,minWidth:500,onShow:function(){var t=e.document,n=t.getElementsByTag("html").getItem(0),i=t.getHead(),s=t.getBody();r=f(t),this.setupContent(t,n,i,s)},onHide:function(){r={}},onOk:function(){var t=e.document,n=t.getElementsByTag("html").getItem(0),r=t.getHead(),i=t.getBody();this.commitContent(t,n,r,i)},contents:[{id:"general",label:n.generalTab,elements:[{type:"text",id:"title",label:t.docTitle,setup:function(e){this.setValue(e.getElementsByTag("title").getItem(0).data("cke-title"))},commit:function(e,t,n,r,i){if(i)return;e.getElementsByTag("title").getItem(0).data("cke-title",this.getValue())}},{type:"hbox",children:[{type:"select",id:"dir",label:n.langDir,style:"width: 100%",items:[[n.notSet,""],[n.langDirLtr,"ltr"],[n.langDirRtl,"rtl"]],setup:function(e,t,n,r){this.setValue(r.getDirection()||"")},commit:function(e,t,n,r){var i=this.getValue();i?r.setAttribute("dir",i):r.removeAttribute("dir"),r.removeStyle("direction")}},{type:"text",id:"langCode",label:n.langCode,setup:function(e,t){this.setValue(t.getAttribute("xml:lang")||t.getAttribute("lang")||"")},commit:function(e,t,n,r,i){if(i)return;var s=this.getValue();s?t.setAttributes({"xml:lang":s,lang:s}):t.removeAttributes({"xml:lang":1,lang:1})}}]},{type:"hbox",children:[{type:"select",id:"charset",label:t.charset,style:"width: 100%",items:[[n.notSet,""],[t.charsetASCII,"us-ascii"],[t.charsetCE,"iso-8859-2"],[t.charsetCT,"big5"],[t.charsetCR,"iso-8859-5"],[t.charsetGR,"iso-8859-7"],[t.charsetJP,"iso-2022-jp"],[t.charsetKR,"iso-2022-kr"],[t.charsetTR,"iso-8859-9"],[t.charsetUN,"utf-8"],[t.charsetWE,"iso-8859-1"],[t.other,"other"]],"default":"",onChange:function(){var e=this;e.getDialog().selectedCharset=e.getValue()!="other"?e.getValue():"",s.call(e)},setup:function(){var e=this;e.metaCharset="charset"in r;var t=u(e.metaCharset?"charset":"content-type",1,1),n=t.call(e);!e.metaCharset&&n.match(/charset=[^=]+$/)&&(n=n.substring(n.indexOf("=")+1));if(n){e.setValue(n.toLowerCase());if(!e.getValue()){e.setValue("other");var i=e.getDialog().getContentElement("general","charsetOther");i&&i.setValue(n)}e.getDialog().selectedCharset=n}s.call(e)},commit:function(e,t,n,i,s){var u=this;if(s)return;var a=u.getValue(),f=u.getDialog().getContentElement("general","charsetOther");a=="other"&&(a=f?f.getValue():""),a&&!u.metaCharset&&(a=(r["content-type"]?r["content-type"].getAttribute("content").split(";")[0]:"text/html")+"; charset="+a);var l=o(u.metaCharset?"charset":"content-type",1,a);l.call(u,e,t,n)}},{type:"text",id:"charsetOther",label:t.charsetOther,onChange:function(){this.getDialog().selectedCharset=this.getValue()}}]},{type:"hbox",children:[{type:"select",id:"docType",label:t.docType,style:"width: 100%",items:[[n.notSet,""],["XHTML 1.1",'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">'],["XHTML 1.0 Transitional",'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'],["XHTML 1.0 Strict",'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'],["XHTML 1.0 Frameset",'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">'],["HTML 5","<!DOCTYPE html>"],["HTML 4.01 Transitional",'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">'],["HTML 4.01 Strict",'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">'],["HTML 4.01 Frameset",'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">'],["HTML 3.2",'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">'],["HTML 2.0",'<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">'],[t.other,"other"]],onChange:s,setup:function(){var t=this;if(e.docType){t.setValue(e.docType);if(!t.getValue()){t.setValue("other");var n=t.getDialog().getContentElement("general","docTypeOther");n&&n.setValue(e.docType)}}s.call(t)},commit:function(t,n,r,i,s){if(s)return;var o=this.getValue(),u=this.getDialog().getContentElement("general","docTypeOther");e.docType=o=="other"?u?u.getValue():"":o}},{type:"text",id:"docTypeOther",label:t.docTypeOther}]},{type:"checkbox",id:"xhtmlDec",label:t.xhtmlDec,setup:function(){this.setValue(!!e.xmlDeclaration)},commit:function(t,n,r,i,s){if(s)return;this.getValue()?(e.xmlDeclaration='<?xml version="1.0" encoding="'+(this.getDialog().selectedCharset||"utf-8")+'"?>',n.setAttribute("xmlns","http://www.w3.org/1999/xhtml")):(e.xmlDeclaration="",n.removeAttribute("xmlns"))}}]},{id:"design",label:t.design,elements:[{type:"hbox",widths:["60%","40%"],children:[{type:"vbox",children:[c("txtColor","txtColor",{setup:function(e,t,n,r){this.setValue(r.getComputedStyle("color"))},commit:function(e,t,n,r,i){if(this.isChanged()||i){r.removeAttribute("text");var s=this.getValue();s?r.setStyle("color",s):r.removeStyle("color")}}}),c("bgColor","bgColor",{setup:function(e,t,n,r){var i=r.getComputedStyle("background-color")||"";this.setValue(i=="transparent"?"":i)},commit:function(e,t,n,r,i){if(this.isChanged()||i){r.removeAttribute("bgcolor");var s=this.getValue();s?r.setStyle("background-color",s):l(r,"background-color","transparent")}}}),{type:"hbox",widths:["60%","40%"],padding:1,children:[{type:"text",id:"bgImage",label:t.bgImage,setup:function(e,t,n,r){var i=r.getComputedStyle("background-image")||"";i=="none"?i="":i=i.replace(/url\(\s*(["']?)\s*([^\)]*)\s*\1\s*\)/i,function(e,t,n){return n}),this.setValue(i)},commit:function(e,t,n,r){r.removeAttribute("background");var i=this.getValue();i?r.setStyle("background-image","url("+i+")"):l(r,"background-image","none")}},{type:"button",id:"bgImageChoose",label:n.browseServer,style:"display:inline-block;margin-top:10px;",hidden:!0,filebrowser:"design:bgImage"}]},{type:"checkbox",id:"bgFixed",label:t.bgFixed,setup:function(e,t,n,r){this.setValue(r.getComputedStyle("background-attachment")=="fixed")},commit:function(e,t,n,r){this.getValue()?r.setStyle("background-attachment","fixed"):l(r,"background-attachment","scroll")}}]},{type:"vbox",children:[{type:"html",id:"marginTitle",html:'<div style="text-align: center; margin: 0px auto; font-weight: bold">'+t.margin+"</div>"},{type:"text",id:"marginTop",label:t.marginTop,style:"width: 80px; text-align: center",align:"center",inputStyle:"text-align: center",setup:function(e,t,n,r){this.setValue(r.getStyle("margin-top")||r.getAttribute("margintop")||"")},commit:a("top")},{type:"hbox",children:[{type:"text",id:"marginLeft",label:t.marginLeft,style:"width: 80px; text-align: center",align:"center",inputStyle:"text-align: center",setup:function(e,t,n,r){this.setValue(r.getStyle("margin-left")||r.getAttribute("marginleft")||"")},commit:a("left")},{type:"text",id:"marginRight",label:t.marginRight,style:"width: 80px; text-align: center",align:"center",inputStyle:"text-align: center",setup:function(e,t,n,r){this.setValue(r.getStyle("margin-right")||r.getAttribute("marginright")||"")},commit:a("right")}]},{type:"text",id:"marginBottom",label:t.marginBottom,style:"width: 80px; text-align: center",align:"center",inputStyle:"text-align: center",setup:function(e,t,n,r){this.setValue(r.getStyle("margin-bottom")||r.getAttribute("marginbottom")||"")},commit:a("bottom")}]}]}]},{id:"meta",label:t.meta,elements:[{type:"textarea",id:"metaKeywords",label:t.metaKeywords,setup:u("keywords"),commit:o("keywords")},{type:"textarea",id:"metaDescription",label:t.metaDescription,setup:u("description"),commit:o("description")},{type:"text",id:"metaAuthor",label:t.metaAuthor,setup:u("author"),commit:o("author")},{type:"text",id:"metaCopyright",label:t.metaCopyright,setup:u("copyright"),commit:o("copyright")}]},{id:"preview",label:n.preview,elements:[{type:"html",id:"previewHtml",html:'<iframe src="'+h+'" style="width: 100%; height: 310px" hidefocus="true" frameborder="0" '+'id="cke_docProps_preview_iframe"></iframe>',onLoad:function(){this.getDialog().on("selectPage",function(e){if(e.data.page=="preview"){var t=this;setTimeout(function(){var e=CKEDITOR.document.getById("cke_docProps_preview_iframe").getFrameDocument(),n=e.getElementsByTag("html").getItem(0),r=e.getHead(),i=e.getBody();t.commitContent(e,n,r,i,1)},50)}}),CKEDITOR.document.getById("cke_docProps_preview_iframe").getAscendant("table").setStyle("height","100%")}}]}]}});