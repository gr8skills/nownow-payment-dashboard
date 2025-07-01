var i=class{_subscriptions=[];set add(s){this._subscriptions.push(s)}unSubscribe(){this._subscriptions.length&&this._subscriptions.forEach(s=>{s.unsubscribe()})}};export{i as a};
