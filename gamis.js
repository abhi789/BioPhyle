var n =11;
var i,j;

var x  = new Array(n);
var y  = new Array(n);
var G1 = new Array(n);
var H1 = new Array(n);
var u,v;

var G = new Array(n);
var H = new Array(n);


for (var i = 0; i < n; i++) {
  G1[i] = new Array(n);
}

for (var i = 0; i < n; i++) {
  H1[i] = new Array(n);
}



var seq1 = "XACATCGACG";
var seq2 = "XCATTCGACG";

x = seq1.split("");
y = seq2.split("");
console.log(seq1);
console.log(seq2);
console.log(x);
console.log(y);

GapMis(G1,H1,x,x.length,y,y.length);
console.log(G1);
console.log(H1);


function GapMis(G1, H1, x, n, y, m)
{
    for(i=0;i<=n;i++)
    {
        G1[i][0] = i;
        H1[i][0] = i;
    }
    
    for (j=0;j<=m;j++)
    {
        G1[0][j] = j;
        H1[0][j] = -j;
        
    }
    
    for (i=1;i<=n;i++)
    {
        for(j=1;j<=m;j++)
        {
            if(i<j)
            {
                u = G1[i-1][j-1]+ deltaE(x[i],y[j]);
                v = G1[i][i] + (j - i);
                G1[i][j] = Math.min(u,v);
                if(v<u)
                {
                    H1[i][j] = i-j;
                }
                else    
                    H1[i][j] = 0;
            }
            if(i>j)
            {
                u = G1[i-1][j-1]+ deltaE(x[i],y[j]);
                v = G1[j][j] + (i -j );
                G1[i][j] = Math.min(u,v);
                if(v<u)
                {
                    H1[i][j] = i-j;
                }
                else    
                    H1[i][j] = 0;
            }
            if(i==j)
            {
                 G1[i][j] = G1[i-1][j-1]+ deltaE(x[i],y[j]);
                 H1[i][j] = 0;
            }
                
        }
    }
}

function deltaE(charA, charB)
{
    if(charA != charB)
    {
        return 1;
    }
    else
        return 0;
}

function GapsMis(x,n,y,m,l)
{
    
}


G1, H1 ← GapMis(x, n, y, m);
{Initialising matrices G2. . and matrices H2. .}
for s ← 2 to  do
for i ← 0 to n do
Gs[i, 0] ← i;
5: Hs[i, 0] ← i;
for j ← 0 to m do
Gs[0, j] ← j;
Hs[0, j] ← −j;
{Computing matrices G2. . and matrices H2. .}
for s ← 2 to  do
10: minI[0 ..m] ← 0;
for i ← 1 to n do
minJ ← 0;
for j ← 1 to m do
if Gs−1[i, j] < Gs−1[minI[j], j] then
15: minI[j] ← i;
u ← Gs−1[minI[j], j] + i − minI[j];
if Gs−1[i, j] < Gs−1[i, minJ] then
minJ ← j;
v ← Gs−1[i, minJ] + j − minJ;
20: w ← Gs[i − 1, j − 1] + δE(x[i], y[j]);
Gs[i, j] ← min{u, v, w};
if u = min{u, v, w} then
Hs[i, j] ← i − minI[j];
if v = min{u, v, w} then
25: Hs[i, j] ← −(j − minJ);
if w = min{u, v, w} then
Hs[i, j] ← 0;
return G and H;
cost a