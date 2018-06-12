var n = 5;
var m = 5;
var i, j;

var x  = new Array(n);
var y  = new Array(m);
var G1 = new Array(n);
var H1 = new Array(n);
var l = 2;
var u, v ,s , minJ, w;

var gap_pos = new Array(l);
var gap_len = new Array(l);
var where = new Array(l);
var B;

var G = new Array(l);
var H = new Array(l);
var minI;
for ( i = 0; i < l; i++ ) {
  G[i] = new Array(n);
  for( j = 0; j < n; j++ )
  {
      G[i][j] = new Array(m);
  }
}

for ( i = 0; i < l; i++ ) {
  H[i] = new Array(n);
  for( j = 0; j < n; j++ )
  {
      H[i][j] = new Array(m);
  }
}


for ( var i = 0; i < n; i++ ) {
  G1[i] = new Array(m);
}

for ( var i = 0; i < n; i++ ) {
  H1[i] = new Array(m);
}

var newminI, newminJ;

var seq1 = "X"+"TCG";
var seq2 = "Y"+"CGT";

x = seq1.split("");
y = seq2.split("");
console.log(seq1);
console.log(seq2);
console.log(x);
console.log(y);

GapMis(G1,H1,x,x.length,y,y.length);
GapsMis(G1,H1, G, H, x, x.length, y, y.length, l);
console.log(G);
console.log(H);
GapsPos(H , n-1, y.length, l-1, gap_pos, gap_len, where);
console.log("B :"+ B);
console.log('Gap Pos:'+gap_pos);
console.log('Gap len:'+gap_len);
console.log('Where:'+where);

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

function GapsMis(G1, H1, G, H, x, n, y, m, l)
{
    minI = new Array(n);
    G[0] = G1;
    H[0] = H1;
    for (s=1;s<l;s++)
    {
        
        //initialize matrices
        for ( i=0; i<=n; i++ )
        {
            G[s][i][0] = i;
            H[s][i][0] = i;
        }
        for ( j=0; j<=m; j++ )
        {
            G[s][0][j] = j;
            H[s][0][j] = -j;
        }
    }
    for( s=1; s<l; s++ )
    {
        for( i=0; i<=m; i++ )
        {
            minI[i] =0;
        }
        for( i=1; i<=n; i++ )
        {
            minJ = 0;
            for( j=1; j<=m; j++ )
            {
                
                newminI = 0;
                if(G[s-1][i][j] < (G[s-1][minI[j]][j] + i - minI[j] ))
                {
                    minI[j] = i;
                    newminI = 1;
                }
                u = G[s-1][minI[j]][j]+ i - minI[j];
                newminJ = 0;
            
                if(G[s-1][i][j] <  G[s-1][i][minJ] + j - minJ )
                {
                    minJ = j;
                    newminJ = 1;
                }
                 
                v = G[s-1][i][minJ] + j - minJ;
                
                w = G[s][i-1][j-1] + deltaE(x[i],y[j]);
                
                G[s][i][j] = Math.min( u , Math.min(v , w));
                
                if(u == Math.min(u,Math.min(v,w)) )
                {
                    H[s][i][j] = (i - minI[j]);
                    
                    
                }
                    
                if(v ==  Math.min(u,Math.min(v,w)))
                {
                    H[s][i][j] = - (j - minJ);
                }
                if(w == Math.min(u,Math.min(v,w)))
                {
                    H[s][i][j] =0;
                
                }
            
            }
        }
    }
}

function GapsPos(H, i, m, s, gap_pos, gap_len, where) 
{
						
var j;
j = m;

B = 0;
for (var it = 0; it <= s; it++)
{
	gap_pos[it] = 0;
}
for (var it1 = 0; it <= s; it1++) 
{
	gap_len[it1] = 0;
}
for (var it2 = 0; it <= s; it2++) 
{
	where[it2] = 0;
}					
while (i>=0 && j>=0) 
{
    if ( H[s][i][j] == 0 )
    {
        i -= 1;
        j -= 1;
    } 
    else    
    {
        if (H[s][i][j] < 0) 
        {
            gap_pos[B] = j;
            gap_len[B] = -H[s][i][j];
            where[B] = 'Y';
            j = j + H[s][i][j];
        } 
        else 
        {
            gap_pos[B] = i;
            gap_len[B] = H[s][i][j];
            where[B] = 'X';
            i = i - H[s][i][j];
        }
        B = B + 1;
    }
}
}