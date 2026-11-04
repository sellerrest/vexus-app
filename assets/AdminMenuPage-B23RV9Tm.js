import{d as t,f as l,b as p,j as a}from"./index-BI9IDjrv.js";import{G as h,S as m}from"./Dashboard-z01jwCHa.js";import{K as f}from"./key-round-aaqrNgje.js";/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]],u=t("dollar-sign",y);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]],b=t("wifi",x),k=[{key:"analytics",label:"Аналитика",icon:h,color:"orange",view:"project-stats"},{key:"hosts",label:"Хосты",icon:m,color:"blue",view:"admin-hosts"},{key:"host_prices",label:"Цены хостов",icon:u,color:"green",view:"admin-prices"},{key:"online",label:"Онлайны",icon:b,color:"accent",view:"online-stats"},{key:"access",label:"Доступы",icon:f,color:"purple",view:"admin-access"}];let s=null;function w({token:o,onOpen:r}){const i=(s==null?void 0:s.token)===o?s.data:null,[c,n]=l.useState(i);if(l.useEffect(()=>{i||p.get("/api/admin/categories",{headers:{Authorization:`Bearer ${o}`}}).then(e=>{n(e.data),s={token:o,data:e.data}}).catch(()=>n({analytics:!1,hosts:!1,host_prices:!1,online:!1,access:!1}))},[o]),!c)return a.jsxs("div",{className:"loader-wrap",children:[a.jsx("div",{className:"spinner"}),a.jsx("span",{children:"Загрузка..."})]});const d=k.filter(e=>c[e.key]);return a.jsx("div",{className:"more-grid",children:d.map(e=>a.jsxs("button",{className:"more-tile",onClick:()=>r(e.view),children:[a.jsx("span",{className:`more-tile-icon ${e.color}`,children:a.jsx(e.icon,{size:36})}),a.jsx("span",{className:"more-tile-label",children:e.label})]},e.label))})}export{w as default};
