class QElement{
    constructor(priority){                          
       this.priority = priority;
    }
}

class PriorityQueue{
    constructor() {
        this.items = [];
    }
    enqueue(priority){
        var qElement = new QElement(priority);
        var contain = false;

        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority.x > qElement.priority.x) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
            else if(this.items[i].priority.x==qElement.priority.x){
            	if (this.items[i].priority.y > qElement.priority.y) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            	}
            }
        }

        if (!contain){
            this.items.push(qElement);
        }
    }
    dequeue(){
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }
    front(){
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }    
    isEmpty(){
        return this.items.length == 0;
    }    
    printPQueue(){
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i].element + " ";
        return str;
    }
}

function dijkstra(start, edge, n){
    let distances = [];
    for(var i=0; i<=n; ++i){
        distances.push(1_000_000_000);
    }
	let pq = new PriorityQueue();  
    var vis = [];
    var ans = 0;
    for(var i=0;i<=n;i++) vis.push(false);
    var cur_min_cost = [];
    for(var i=0;i<=n;i++) cur_min_cost.push(0);
    distances[1] = 0;
    pq.enqueue({x:0,y:0,u:1});
    var cnt = 0;    
    while(!pq.isEmpty()){
    		cnt++;
        let cur = pq.dequeue().priority;
        if(vis[cur.u]) continue;
        vis[cur.u] = true;
        for(var i=0;i<edge[cur.u].length;i++){
        	var v = edge[cur.u][i];
        	if(vis[v.to]==false){
        		if(distances[v.to]>cur.x + v.len){
        			distances[v.to] = cur.x + v.len;
        			ans -= cur_min_cost[v.to];
        			cur_min_cost[v.to] = v.cost;
        			ans += cur_min_cost[v.to];
        		}
        		else if(distances[v.to]==cur.x+v.len){
        			if(ans>(ans - cur_min_cost[v.to] + v.cost)){
        				ans -= cur_min_cost[v.to];
        				cur_min_cost[v.to] = v.cost;
        				ans += cur_min_cost[v.to];
        			}
        		}
        		pq.enqueue({x:distances[v.to],y:cur_min_cost[v.to],u:v.to});
        	}
        }                
    }
    console.log(ans);
    let li = `<h3>Minimum Maintainence Cost = ${ans}</h3>`;                             
    document.getElementById("output").innerHTML = li;          
}

var INF = Number(10000000000);

function floydWarshall(edge, n){
    var dp = new Array(n+1);
    for(var i=0; i<=n; ++i)dp[i] = [];
    
    for(var i=0; i<=n; ++i){
        for(var j=0; j<=n; ++j){
            dp[i].push( { dis: INF, cost: INF } ); 
        }
    }
    for(var i=0; i<=n; ++i){
        for(var j=0; j<edge[i].length; ++j){
            var cur = edge[i][j];
            if(dp[i][cur.to].dis>cur.len){
                dp[i][cur.to] = { dis: cur.len, cost: cur.cost };
            }else if(dp[i][cur.to].dis == cur.len && dp[i][cur.to].cost > cur.cost){
                dp[i][cur.to] = { dis: cur.len, cost: cur.cost };
            }
        }
    }
    
    for(var i=1; i<=n; ++i){
        dp[i][i] = { dis: 0, cost: 0 };
    }

    for(var k=1; k<=n; ++k){
        for(var i=1; i<=n; ++i){
            for(var j=1; j<=n; ++j){
                if( dp[i][j].dis > ( dp[i][k].dis + dp[k][j].dis ) ){
                    dp[i][j] = { dis: (dp[i][k].dis+dp[k][j].dis), cost: ( dp[i][k].cost + dp[k][j].cost ) };
                }else if(dp[i][j].dis == (dp[i][k].dis + dp[k][j].dis) && ( dp[i][j].cost > ( dp[i][k].cost + dp[k][j].cost ) ) ){
                    dp[i][j] = { dis: (dp[i][k].dis+dp[k][j].dis), cost: ( dp[i][k].cost + dp[k][j].cost ) };
                }
            }
        }
    }
    
}

function bellmanFord(e,n,m){
	var dist = new Array(n+1);
	for(var i=0;i<=n;i++) dist[i] = INF;
    dist[1] = 0;
    var ans = 0;
    var cur_min_cost = new Array(n+1);
    for(var i=0;i<=n;i++) cur_min_cost[i] = 0;
	for(var i=0;i<n-1;i++){
		for(var j=0;j<m;j++){
            if(dist[e[j].from]<INF){ 
                if(dist[e[j].to]>dist[e[j].from] + e[j].len){
                    dist[e[j].to] = dist[e[j].from] + e[j].len;
                    ans -= cur_min_cost[e[j].to];
                    cur_min_cost[e[j].to] = e[j].cost;
                    ans += cur_min_cost[e[j].to];
                }
                else if(dist[e[j].to] == dist[e[j].from] + e[j].len){
                    if(cur_min_cost[e[j].to]>e[j].cost){
                        ans -= cur_min_cost[e[j].to];
                        cur_min_cost[e[j].to] = e[j].cost;
                        ans += cur_min_cost[e[j].to];
                    }
                }
            }
        }
	}
    console.log(ans);
}

function execute(){ 
    var n = document.getElementById("input_n").value;
    var m = document.getElementsByClassName("input_text");
    let edge = new Array(n+1);
    for(var i=0;i<=n;i++) edge[i] = []; 
    let e = [];    
    for(var i=0;i<(m.length/4);i++){
        var ind = 1+(i*4);
        var u = document.getElementById("input_textA"+ind).value;
        var v = document.getElementById("input_textB"+ind).value;
        var len = document.getElementById("input_textC"+ind).value;
        var cost = document.getElementById("input_textD"+ind).value;
        edge[u].push( { to: Number(v), len: Number(len), cost: Number(cost) } );
        edge[v].push( { to: Number(u), len: Number(len), cost: Number(cost) } );
        
        e.push( { from : Number(u), to: Number(v), len: Number(len), cost: Number(cost) } );
        e.push( { from : Number(u), to: Number(u), len: Number(len), cost: Number(cost) } );

    }
    let L = `<center><h3>Time Taken:</h3>`;
    L += `<table>`;
    L += `<tr><th> Dijkstra </th><th> Floyd Warshall </th><th> Bellman Ford </th></tr>`;
    var t0 = performance.now()
    dijkstra(1, edge, n);
    var t1 = performance.now()
    floydWarshall(edge, n);
    var t2 = performance.now()
    bellmanFord(e,n,m.length/2);
    var t3 = performance.now()

    L += `<tr>`;
    L += `<td>${(t2-t1).toFixed(2)} ms</td><td> ${(t2-t0).toFixed(2)} ms</td><td> ${(t3-t0).toFixed(2)} ms</td>`;
    L += `</tr>`;
    L += `</table>`;

    L += `</center>`;
                                
    document.getElementById("time").innerHTML = L; 
}
