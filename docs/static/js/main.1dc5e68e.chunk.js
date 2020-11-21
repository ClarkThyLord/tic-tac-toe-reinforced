(this["webpackJsonptic-tac-toe-reinforced"]=this["webpackJsonptic-tac-toe-reinforced"]||[]).push([[0],{15:function(t,e,s){},9:function(t,e,s){"use strict";s.r(e);var a=s(8),r=s(3),i=s(4),n=s(6),c=s(5),h=s(0),o=s(1),l=s.n(o),u=s(7),d=s.n(u);s(15);function f(t){var e="square square-"+t.index;return Object(h.jsx)("button",{className:e,onClick:t.onClick,children:y(t.value)})}var v=function(t){Object(n.a)(s,t);var e=Object(c.a)(s);function s(){return Object(r.a)(this,s),e.apply(this,arguments)}return Object(i.a)(s,[{key:"renderSquare",value:function(t){var e=this;return Object(h.jsx)(f,{index:t,value:this.props.squares[t],onClick:function(){return e.props.onClick(t)}})}},{key:"render",value:function(){return Object(h.jsxs)("div",{className:"game-board",children:[Object(h.jsxs)("div",{className:"board-row",children:[this.renderSquare(0),this.renderSquare(1),this.renderSquare(2)]}),Object(h.jsxs)("div",{className:"board-row",children:[this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)]}),Object(h.jsxs)("div",{className:"board-row",children:[this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)]})]})}}]),s}(l.a.Component),p=function(t){Object(n.a)(s,t);var e=Object(c.a)(s);function s(t){var a;Object(r.a)(this,s),a=e.call(this,t);var i=0;if(window.location.hash)switch(window.location.hash){case"#1v1":i=0;break;case"#1vMM":i=1;break;case"#TrainQ":i=2;break;case"#1vQ":i=3;break;case"#MMvQ":i=4}return a.q=new k,a.state={type:i,player:0,squares:Array(9).fill(-1)},a}return Object(i.a)(s,[{key:"start",value:function(t){this.setState({player:0,squares:Array(9).fill(-1)}),2!==this.state.type&&4!==this.state.type||this.AIMove()}},{key:"set_type",value:function(t){this.state.type=t,this.start()}},{key:"isAINext",value:function(){return(1===this.state.type||3===this.state.type)&&1===this.state.player||2===this.state.type||4===this.state.type}},{key:"AIMove",value:function(){var t;switch(this.state.type){case 1:t=x(this.state.player,this.state.squares.slice());break;case 2:t=0===this.state.player?w(this.state.squares.slice()):this.q.findNextMove(this.state.player,this.state.squares.slice());break;case 3:t=this.q.findNextMove(this.state.player,this.state.squares.slice());break;case 4:t=0===this.state.player?x(this.state.player,this.state.squares.slice()):this.q.findNextMove(this.state.player,this.state.squares.slice())}this.handleMove(t)}},{key:"handleClick",value:function(t){b(this.state.squares)>-1||this.state.squares[t]>-1||this.isAINext()||this.handleMove(t)}},{key:"handleMove",value:function(t){var e=this;this.state.squares[t]=this.state.player,this.state.player=(this.state.player+1)%2,this.forceUpdate(),this.isAINext()&&-1===b(this.state.squares)&&setTimeout((function(){e.isAINext()&&e.AIMove()}),2===this.state.type?10:250)}},{key:"render",value:function(){var t,e,s=this,a=b(this.state.squares);if(2===this.state.type){switch(a){case 0:this.q.lost();break;case 1:this.q.won();break;case 2:this.q.drew()}a>-1&&setTimeout((function(){return s.start()}),10),e=Object(h.jsxs)("span",{children:[Object(h.jsx)("a",{className:"opt",onClick:function(){return s.q.save()},children:"Save"}),Object(h.jsx)("a",{className:"opt",onClick:function(){return s.q.load()},children:"Load"}),Object(h.jsx)("a",{className:"opt",onClick:function(){return s.q.clear()},children:"Clear"})]}),t="Wins: ".concat(this.q.wins," Losses: ").concat(this.q.losses," Draws: ").concat(this.q.draws)}else 0===a||1===a?t="Winner: "+y(a):2===a?t="Draw":(t="Next player: "+y(this.state.player),this.isAINext()&&(1===this.state.type||4===this.state.type&&0===this.state.player?t+=" (MiniMax)":(3===this.state.type&&1===this.state.player||4===this.state.type&&1===this.state.player)&&(t+="(Q)")));return Object(h.jsxs)("div",{className:"game",children:[Object(h.jsx)("div",{className:"game-info",children:Object(h.jsx)("h1",{children:t})}),Object(h.jsxs)("div",{className:"game-opt",children:[Object(h.jsx)("a",{className:"opt",onClick:function(){return s.start()},children:"Start"}),e]}),Object(h.jsxs)("div",{className:"game-type",children:[Object(h.jsx)("a",{href:"#1v1",className:"type",onClick:function(){return s.set_type(0)},children:"1 v 1"}),Object(h.jsx)("a",{href:"#1vMM",className:"type",onClick:function(){return s.set_type(1)},children:"1 v MiniMax"}),Object(h.jsx)("a",{href:"#TrainQ",className:"type",onClick:function(){return s.set_type(2)},children:"Train Q"}),Object(h.jsx)("a",{href:"#1vQ",className:"type",onClick:function(){return s.set_type(3)},children:"1 v Q"}),Object(h.jsx)("a",{href:"#MMvQ",className:"type",onClick:function(){return s.set_type(4)},children:"MiniMax v Q"})]}),Object(h.jsx)(v,{squares:this.state.squares,onClick:function(t){return s.handleClick(t)}})]})}}]),s}(l.a.Component);function y(t){switch(t){case 0:return"X";case 1:return"O";default:return""}}function j(t){for(var e=[],s=0;s<t.length;s++)-1===t[s]&&e.push(s);return e}function m(t){return t.join()}function b(t){for(var e=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],s=0;s<e.length;s++){var r=Object(a.a)(e[s],3),i=r[0],n=r[1],c=r[2];if(t[i]>-1&&t[i]===t[n]&&t[i]===t[c])return t[i]}return t.every((function(t){return-1!==t}))?2:-1}function q(t,e,s,a){var r=b(e);if(r===t)return 10-s;if(r===(t+1)%2)return-10+s;if(2===r)return 0;if(a){for(var i=-1e3,n=0;n<e.length;n++)-1===e[n]&&(e[n]=t,i=Math.max(i,q(t,e,s+1,!a)),e[n]=-1);return i}for(var c=1e3,h=0;h<e.length;h++)-1===e[h]&&(e[h]=(t+1)%2,c=Math.min(c,q(t,e,s+1,!a)),e[h]=-1);return c}function x(t,e){for(var s=-1e3,a=-1,r=0;r<e.length;r++)if(-1===e[r]){e[r]=t;var i=q(t,e,0,!1);e[r]=-1,i>s&&(s=i,a=r)}return a}function w(t){var e=j(t);return e[Math.floor(Math.random()*e.length)]}function k(){this.decay=.8,this.learningRate=.2,this.exploringRate=.1,this.states={},this.statesHistory=[],this.wins=0,this.losses=0,this.draws=0,this.findNextMove=function(t,e){var s;if(Math.random()<=this.exploringRate)s=w(e);else{var a=j(e);s=a[0];for(var r=-1/0,i=0;i<a.length;i++){var n=a[i];e[n]=t;var c=m(e),h=void 0===this.states[c]?0:this.states[c];h>r&&(s=n,r=h),e[n]=-1}}return e[s]=t,this.statesHistory.push(m(e)),s},this.save=function(){localStorage.setItem("wins",this.wins),localStorage.setItem("losses",this.losses),localStorage.setItem("draws",this.draws),localStorage.setItem("states",JSON.stringify(this.states))},this.load=function(){var t=localStorage.getItem("wins");null!==t&&(this.wins=parseInt(t)),null!==(t=localStorage.getItem("losses"))&&(this.losses=parseInt(t)),null!==(t=localStorage.getItem("draws"))&&(this.draws=parseInt(t)),null!==(t=localStorage.getItem("states"))&&(this.states=JSON.parse(t))},this.clear=function(){this.wins=0,localStorage.removeItem("wins"),this.losses=0,localStorage.removeItem("losses"),this.draws=0,localStorage.removeItem("draws"),this.states={},localStorage.removeItem("states")},this.learn=function(t){for(var e=0;e<this.statesHistory.length;e++){var s=this.statesHistory[e];void 0===this.states[s]&&(this.states[s]=0),this.states[s]+=this.learningRate*(this.decay*t-this.states[s]),t=this.states[s]}this.statesHistory=[]},this.won=function(){this.wins+=1,this.learn(1)},this.lost=function(){this.losses+=1,this.learn(-1)},this.drew=function(){this.draws+=1,this.learn(.1)}}d.a.render(Object(h.jsx)(p,{}),document.getElementById("root"))}},[[9,1,2]]]);
//# sourceMappingURL=main.1dc5e68e.chunk.js.map