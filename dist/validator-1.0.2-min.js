function defineValidator(g,e,k){var i={};i.getCursorPosition=function(l){if(l.lengh==0){return -1}return i.getSelectionStart(l)};i.setCursorPosition=function(m,l){if(m.lengh==0){return m}return i.setSelection(m,l,l)};i.getSelectionStart=function(l){if(i.lengh==0){return -1}input=l[0];var n=input.value.length;if(input.createTextRange){var m=document.selection.createRange().duplicate();m.moveEnd("character",input.value.length);if(m.text==""){n=input.value.length}n=input.value.lastIndexOf(m.text)}else{if(typeof(input.selectionStart)!="undefined"){n=input.selectionStart}}return n};i.setSelection=function(m,n,o){if(m.lengh==0){return m}input=m[0];if(input.createTextRange){var l=input.createTextRange();l.collapse(true);l.moveEnd("character",o);l.moveStart("character",n);l.select()}else{if(input.setSelectionRange){input.focus();input.setSelectionRange(n,o)}}return m};i.getElmLoc=function(m){var l={};var n=m;l.left=n.offset().left;l.top=n.offset().top;l.width=n.width()+4;l.height=n.height()+6;return l};i.setTipLoc=function(x,v,r,q,t,m){if(m==null||m==undefined){m={tipDir:null,tipOffset:null}}if(!m.tipDir&&!r){return}var u=i.getElmLoc(x);var s=v[0].offsetWidth;var l=v[0].offsetHeight;var w={};var n=(m.tipOffset&&m.tipOffset.top?m.tipOffset.top:0)+(t?t:0);var p=(m.tipOffset&&m.tipOffset.left?m.tipOffset.left:0)+(q?q:0);var o=r?r:m.tipDir;if(o=="up"){w.top=u.top-l+n;w.left=u.left+p}else{if(o=="left"){w.top=u.top+(u.height-l)/2+n;w.left=u.left-s+p}else{if(o=="down"){w.top=u.top+u.height+n;w.left=u.left+p}else{if(o=="right"){w.top=u.top+(u.height-l)/2+n;w.left=u.left+u.width+p}else{if(o=="none"){return}else{throw new Error("tipDir设置错误！");return}}}}}v.offset(w)};i.getZIndex=function(l){if(l[0].tagName.toLowerCase()=="body"){return 1}var m=l.css("z-index");if(m=="auto"){m=i.getZIndex(l.parent())}return m};function f(n,l){var m=this;m.options=e.extend({},f.prototype.defaults,l);m.$target=e(n);m.$wrapper=e(m.options.wrapper);m.render()}f.prototype={render:function(){var l=this;l.$target=this.$target;if(!l.$target){return false}l.options.tpl=l.options.defaultTpl;l.count()},setOptions:function(l){var m=this;m.options=e.extend(m.options,l);m.$wrapper=e(m.options.wrapper)},getlen:function(){var r=this;var s=new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)","g");var t=function(w){var x=r.options.ignore;if(x){for(var v=0;v<x.length;v++){var u=[];for(j=0;j<w.length;j++){if(w.charAt(j)!==x.charAt(v)){u.push(w.charAt(j))}}w=u.join("")}}return String(w).replace(s,"")};var m=this.$target;var n=t(m.val());var o=r.options.trim;if(o&&typeof(o)=="function"){n=o(n)}var q=r.options.isRejectTag;var l=r.options.isEnToCn;if(q){n=n.replace(/<[^>]*>/g,"")}var p=n.length;n.replace(/[\u0080-\ufff0]/g,function(){p++});if(l){n=n.replace(/[^\x00-\xff]/g,"**");p=Math.ceil(n.length/2)}return p},count:function(){var q=this;q.$target=this.$target;var m=q.getlen();var l=q.options.max;var p=q.options.defaultTpl;var r=q.options.exceedTpl;var o=m>l&&r||p;var n=q.options.isCut;if(n){o=p;q._cutText()}q.options.tpl=o;q._create()},_cutText:function(){var o=this;var n=o.options.isCut;if(!n){return false}var m=o.getlen();var l=o.options.max;$target=this.$target;if(m>l){var p=$target.val();while(o.getlen()>l){p=$target.val();p=p.substr(0,p.length-1);$target.val(p)}}},_create:function(){var r=this,s=this.$wrapper,o=this.$target,p=r.options.tpl,n=r.getlen(),m=r.options.max,q;if(!o.length){return false}function l(v,u,t){return v.replace(t||/\\?\{([^{}]+)\}/g,function(x,w){if(x.charAt(0)==="\\"){return x.slice(1)}return(u[w]===undefined)?"":u[w]})}q=l(p,{len:n,max:m,remain:Math.abs(m-n)});s.html(q)}};f.prototype.defaults={wrapper:"",target:"",el:"",tpl:"",defaultTpl:'<span class="ks-letter-count"><em class="J_LetterRemain">{remain}</em>字节</span>',exceedTpl:'<span class="ks-letter-count-exceed">超出<em class="J_LetterRemain exceed-letter">{remain}</em>字节</span>',max:50,len:0,isRejectTag:false,isEnToCn:false,isCut:false};var a=100;var d={version:"1.0.2",vldOnBlur:false,checkOnError:true,focus1stErr:true,timer:true,errorFiled:null,errorClass:"",errorLocClass:"",errTipTpl:"<div class='errorTip' style='z-index:10;position:absolute;'>{{message}}</div>",tipDir:"right",tipOffset:null,defaultMsg:"输入有误，请重新输入",parent:"body",autoRevise:false};var h=function(l){d=e.extend(true,d,l)};var c=function(l,n){if(!l||!l.length){throw new Error("参数错误");return}var m=this;m.opts=e.extend(true,{},d,n);m.validations=[];e.each(l,function(o,p){m.validations.push(e.extend(true,{},p))});m._init()};c.prototype._init=function(){var r=this,q=r.opts,p=r.dynamicVlds=[],o=r.validations;q.$errorField=e(q.errorField);q.$parent=e(q.parent);var l=[];for(var n=0;n<o.length;n++){if(e(o[n].field).length>1){var m=[];e.each(e(o[n].field),function(t,u){var s=e.extend(true,{},o[n],{field:e(u),derivedFrom:o[n]});l.push(s);m.push(s)});o[n].children=m}else{l.push(o[n])}}r.originalValidations=o;r.validations=l;o=r.validations;for(var n=0;n<o.length;n++){o[n].passed=true;o[n].checked=false;o[n].$el=e(o[n].field);o[n].$errorLoc=e(o[n].errorLoc);if(o[n].limiter){o[n].textLimiter=new f(o[n].$el,e.extend(true,{},d.limiter,q.limiter,o[n].limiter))}if(o[n].dynamicVld){p.push(o[n])}if(q.vldOnBlur){o[n].$el.on("blur",{vld:o[n]},function(s){r._check(s.data.vld);if(r.textLimiter){r.textLimiter.count()}})}}if(q.timer){if(p.length!=0){setInterval(function(){for(var s=0;s<p.length;s++){r._dynamicCheck(p[s]);if(p[s].limiter){p[s].textLimiter.count()}}},a)}if(q.checkOnError){setInterval(function(){for(var s=0;s<o.length;s++){if(o[s].onError){r.validate(o[s])}if(o[s].limiter){o[s].textLimiter.count()}}},a)}for(var n=0;n<o.length;n++){if(o[n].textLimiter){o[n].$el.on("keydown, paste, blur, input",function(){o[n].textLimiter.count()})}}}else{for(var n=0;n<o.length;n++){if(e.browser.msie){o[n].$el.on("keydown",{vld:o[n]},function(s){setTimeout(function(){var t=s.data.vld;t.oldPosition=i.getCursorPosition(t.$el);if(t.dynamicVld){r._dynamicCheck(s.data.vld)}if(q.checkOnError&&t.onError){r.validate(t)}if(t.textLimiter){t.textLimiter.count()}},0)})}else{o[n].$el.on("input",{vld:o[n]},function(s){setTimeout(function(){var t=s.data.vld;t.oldPosition=i.getCursorPosition(t.$el);if(t.dynamicVld){r._dynamicCheck(s.data.vld)}if(q.checkOnError&&t.onError){r.validate(t)}if(t.textLimiter){t.textLimiter.count()}},0)})}o[n].$el.on("paste",{vld:o[n]},function(s){setTimeout(function(){var t=s.data.vld;if(t.dynamicVld){r._dynamicCheck(s.data.vld)}if(q.checkOnError&&t.onError){r.validate(t)}if(t.textLimiter){t.textLimiter.count()}},0)})}}};c.prototype._dynamicCheck=function(l){this.validate(l)};c.prototype._check=function(l){if(l.onError){l.onError=false}return this.validate(l)};c.prototype._allChecked=function(){for(var l=0;l<this.validations.length;l++){if(!this.validations[l].checked){return false}}return true};c.prototype.results=function b(m){m=m?m:this.originalValidations;var l=[];e.each(m,function(p,r){if(r.children){var o=b(r.children);var n={field:r.field,passed:true,rules:r.rules,detail:"该field包含多个DOM元素，查看childrenResults",childrenResults:o};for(var q=0;q<o.length;q++){if(!o[q].passed){n.passed=false;break}}}else{var n={field:r.field,passed:r.passed,rules:r.rules,details:r.details}}l.push(n)});return l};c.prototype.isPassed=function(){if(!this._allChecked()){throw new Error("存在未被检验过的input，可手动调用validateAll()以保证全部被检验过");return null}var m=this.results();for(var l=0;l<m.length;l++){if(!m[l].passed){return false}}return true};c.prototype.validateAll=function(){var o=this.validations,m=true;for(var n=0;n<o.length;n++){var l=this.validate(o[n]);m=l.passed==false?false:m}if(this.opts.focus1stErr&&!m){for(var n=0;n<o.length;n++){if(o[n].passed==false){o[n].$el.focus();return false}}}return m};c.prototype.validate=function(q){var t=this,l=t.opts,r=t.dynamicVlds,p=t.validations,n=q.msg?q.msg:(l.defaultMsg?l.defaultMsg:""),x=q.field,z=q.$errorLoc,B=q.$el,w=q.$el[0],y=w.value,A;q.checked=true;if(typeof q.rule=="function"){var A=q.rule();if(A){u()}else{s()}return A}if(q.rule.constructor==RegExp){var A=q.rule.test(y);q.rule.lastIndex=0;if(A){u()}else{s()}return A}var v=q.rule;var m=/\[\$\((.+)\)\]/g;if(m.test(v)){v=v.replace(m,function(C,F,D,E){return e(F).val()})}A=k.validate(y,v);q.details=A.details;q.passed=A.passed;q.rules=A.rules;var o=arguments.callee.caller==t._dynamicCheck;if(q.passed==true){u();return{details:q.details,passed:q.passed,rules:q.rules}}else{s();return{details:q.details,passed:q.passed,rules:q.rules}}function u(){q.oldVal=q.$el.val();if(z){z.html("");if(l.errorLocClass){z.removeClass(l.errorLocClass)}else{z.hide()}}if(q.errTipSet){q.errTipSet.remove()}B.removeClass(l.errorClass);t._showInErrorField()}function s(){var F=q.tipOffset&&q.tipOffset.left?q.tipOffset.left:0;var E=q.tipOffset&&q.tipOffset.top?q.tipOffset.top:0;var C=q.tipDir;if(o){if(l.autoRevise){q.$el.val(A.revisedVal);if(t.validate(q)){return}}else{if(A.revisedVal!=y){q.$el.val(q.oldVal);i.setCursorPosition(q.$el,q.oldPosition-1);if(t.validate(q)){return}}else{q.oldVal=y}}return}q.onError=true;if(z){q.$errorLoc.html(n);if(l.errorLocClass){q.$errorLoc.addClass(l.errorLocClass)}else{q.$errorLoc.show()}}B.addClass(l.errorClass);if((C&&C!="none")||(l.tipDir&&l.tipDir!="none")){if(q.errTipSet){q.errTipSet.remove()}var D=e(l.errTipTpl.replace("{{message}}",n));l.$parent.append(D);i.setTipLoc(B,D,C,F,E,l);q.errTipSet=D}t._showInErrorField()}};c.prototype.revise=function(l){var m=this;e.each(this.validations,function(n,o){if(l||o.dynamicVld){m._dynamicCheck(o);if(o.textLimiter){o.textLimiter.count()}}});return m.validateAll()};c.prototype.validateOne=function(l){if(l>=this.validations.length){throw new Error("index越界");return}return this.validate(this.validations[l])};c.prototype._showInErrorField=function(){var m=this;var l=[];e.each(m.validations,function(n,p){if(!p.passed){var o=p.msg?p.msg:(m.opts.defaultMsg?m.opts.defaultMsg:"");if(o!=""){l.push(o)}}});m.opts.$errorField.html(l.join("<br/>"))};e.Validator=c;g.Validator=c;g.ValidatorDefaults=h;e.fn.validator=function(l){l.fields=this;var m=new e.Validator([l],l);return this}}if(typeof define=="function"){define("Validator",function(b,a,c){var d=b("jquery")||jQuery;b("VldRulesLib");defineValidator(window,d,VldRulesLib);c.exports=Validator})}else{defineValidator(window,jQuery,VldRulesLib)};