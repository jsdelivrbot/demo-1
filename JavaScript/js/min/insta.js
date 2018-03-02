(function(){var t;t=function(){function t(t,e){var o,i;if(this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1},"object"==typeof t)for(o in t)i=t[o],this.options[o]=i;this.context=null!=e?e:this,this.unique=this._genKey()}return t.prototype.hasNext=function(){return"string"==typeof this.context.nextUrl&&this.context.nextUrl.length>0},t.prototype.next=function(){return!!this.hasNext()&&this.run(this.context.nextUrl)},t.prototype.run=function(e){var o,i;if("string"!=typeof this.options.clientId&&"string"!=typeof this.options.accessToken)throw new Error("Missing clientId or accessToken.");if("string"!=typeof this.options.accessToken&&"string"!=typeof this.options.clientId)throw new Error("Missing clientId or accessToken.");return null!=this.options.before&&"function"==typeof this.options.before&&this.options.before.call(this),"undefined"!=typeof document&&null!==document&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=e||this._buildUrl(),document.getElementsByTagName("head")[0].appendChild(i),o="instafeedCache"+this.unique,window[o]=new t(this.options,this),window[o].unique=this.unique),!0},t.prototype.parse=function(t){var e,o,i,n,r,s,a,p,l,c,h,u,d,f,m,g,y,w,k,b,_,E,I,x,v,N,B,j;if("object"!=typeof t){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(200!==t.meta.code){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,t.meta.error_message),!1;throw new Error("Error from Instagram: "+t.meta.error_message)}if(0===t.data.length){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}if(null!=this.options.success&&"function"==typeof this.options.success&&this.options.success.call(this,t),this.context.nextUrl="",null!=t.pagination&&(this.context.nextUrl=t.pagination.next_url),"none"!==this.options.sortBy)switch(N="random"===this.options.sortBy?["","random"]:this.options.sortBy.split("-"),v="least"===N[0],N[1]){case"random":t.data.sort(function(){return.5-Math.random()});break;case"recent":t.data=this._sortBy(t.data,"created_time",v);break;case"liked":t.data=this._sortBy(t.data,"likes.count",v);break;case"commented":t.data=this._sortBy(t.data,"comments.count",v);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}if("undefined"!=typeof document&&null!==document&&!1===this.options.mock){if(u=t.data,x=parseInt(this.options.limit,10),null!=this.options.limit&&u.length>x&&(u=u.slice(0,x)),s=document.createDocumentFragment(),null!=this.options.filter&&"function"==typeof this.options.filter&&(u=this._filter(u,this.options.filter)),null!=this.options.template&&"string"==typeof this.options.template){for(a="","","",j=document.createElement("div"),p=0,b=u.length;p<b;p++){if(l=u[p],"object"!=typeof(c=l.images[this.options.resolution]))throw r="No image found for resolution: "+this.options.resolution+".",new Error(r);m="square",(g=c.width)>(f=c.height)&&(m="landscape"),g<f&&(m="portrait"),h=c.url,window.location.protocol.indexOf("http")>=0&&!this.options.useHttp&&(h=h.replace(/https?:\/\//,"//")),a+=this._makeTemplate(this.options.template,{model:l,id:l.id,link:l.link,type:l.type,image:h,width:g,height:f,orientation:m,caption:this._getObjectProperty(l,"caption.text"),likes:l.likes.count,comments:l.comments.count,location:this._getObjectProperty(l,"location.name")})}for(j.innerHTML=a,n=[],i=0,o=j.childNodes.length;i<o;)n.push(j.childNodes[i]),i+=1;for(w=0,_=n.length;w<_;w++)I=n[w],s.appendChild(I)}else for(k=0,E=u.length;k<E;k++){if(l=u[k],d=document.createElement("img"),"object"!=typeof(c=l.images[this.options.resolution]))throw r="No image found for resolution: "+this.options.resolution+".",new Error(r);h=c.url,window.location.protocol.indexOf("http")>=0&&!this.options.useHttp&&(h=h.replace(/https?:\/\//,"//")),d.src=h,!0===this.options.links?(e=document.createElement("a"),e.href=l.link,e.appendChild(d),s.appendChild(e)):s.appendChild(d)}if("string"==typeof(B=this.options.target)&&(B=document.getElementById(B)),null==B)throw r='No element with id="'+this.options.target+'" on page.',new Error(r);B.appendChild(s),document.getElementsByTagName("head")[0].removeChild(document.getElementById("instafeed-fetcher")),y="instafeedCache"+this.unique,window[y]=void 0;try{delete window[y]}catch(t){t}}return null!=this.options.after&&"function"==typeof this.options.after&&this.options.after.call(this),!0},t.prototype._buildUrl=function(){var t,e,o;switch(t="https://api.instagram.com/v1",this.options.get){case"popular":e="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");e="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");e="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");e="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return o=t+"/"+e,null!=this.options.accessToken?o+="?access_token="+this.options.accessToken:o+="?client_id="+this.options.clientId,null!=this.options.limit&&(o+="&count="+this.options.limit),o+="&callback=instafeedCache"+this.unique+".parse"},t.prototype._genKey=function(){var t;return""+(t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)})()+t()+t()+t()},t.prototype._makeTemplate=function(t,e){var o,i,n,r,s;for(i=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,o=t;i.test(o);)r=o.match(i)[1],s=null!=(n=this._getObjectProperty(e,r))?n:"",o=o.replace(i,function(){return""+s});return o},t.prototype._getObjectProperty=function(t,e){var o,i;for(i=(e=e.replace(/\[(\w+)\]/g,".$1")).split(".");i.length;){if(o=i.shift(),!(null!=t&&o in t))return null;t=t[o]}return t},t.prototype._sortBy=function(t,e,o){var i;return i=function(t,i){var n,r;return n=this._getObjectProperty(t,e),r=this._getObjectProperty(i,e),o?n>r?1:-1:n<r?1:-1},t.sort(i.bind(this)),t},t.prototype._filter=function(t,e){var o,i,n,r,s;for(o=[],i=function(t){if(e(t))return o.push(t)},n=0,s=t.length;n<s;n++)r=t[n],i(r);return o},t}(),function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():t.Instafeed=e()}(this,function(){return t})}).call(this);