/**
 * Edge
 */
export class Edge {
  // !!! IMPLEMENT ME
  constructor(destination) {
    this.destination= destination;
  }
}

/**
 * Vertex
 */
export class Vertex {
  // !!! IMPLEMENT ME
  constructor(value='default', pos = {x:-1, y:-1}) {
    this.edges = [];
    this.value = value;
    this.pos = pos;
  }
}

/**
 * Graph
 */
export class Graph {
  constructor() {
    this.vertexes = [];
  }

  // debugCreateTestData() {
  //   console.log("called the test data function");
  //   let debugVertex1 = new Vertex('t1', {x:40, y:40});
  //   let debugVertex2 = new Vertex('t2', {x:80, y:80});
  //   let debugVertex3 = new Vertex('t3', {x:40, y:95});
  //   console.log(debugVertex1);
  //   let debugEdge1 = new Edge(debugVertex2);
  //   debugVertex1.edges.push(debugEdge1);

  //   let debugEdge2 = new Edge(debugVertex3);
  //   debugVertex2.edges.push(debugEdge2);

  //   this.vertexes.push(debugVertex1, debugVertex2, debugVertex3);
  // }

  /**
   * Create a random graph
   */
  randomize(width, height, pxBox, probability=0.6) {
    // Helper function to set up two-way edges
    function connectVerts(v0, v1) {
      v0.edges.push(new Edge(v1));
      v1.edges.push(new Edge(v0));
    }

    let count = 0;

    // Build a grid of verts
    let grid = [];
    for (let y = 0; y < height; y++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        let v = new Vertex();
        //v.value = 'v' + x + ',' + y;
        v.value = 'v' + count++;
        row.push(v);
      }
      grid.push(row);
    }

    // Go through the grid randomly hooking up edges
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Connect down
        if (y < height - 1) {
          if (Math.random() < probability) {
            connectVerts(grid[y][x], grid[y+1][x]);
          }
        }

        // Connect right
        if (x < width - 1) {
          if (Math.random() < probability) {
            connectVerts(grid[y][x], grid[y][x+1]);
          }
        }
      }
    }

    // Last pass, set the x and y coordinates for drawing
    const boxBuffer = 0.8;
    const boxInner = pxBox * boxBuffer;
    const boxInnerOffset = (pxBox - boxInner) / 2;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        grid[y][x].pos = {
          'x': (x * pxBox + boxInnerOffset + Math.random() * boxInner) | 0,
          'y': (y * pxBox + boxInnerOffset + Math.random() * boxInner) | 0
        };
      }
    }

    // Finally, add everything in our grid to the vertexes in this Graph
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.vertexes.push(grid[y][x]);
      }
    }
  }

  /**
   * Dump graph data to the console
   */
  dump() {
    let s;

    for (let v of this.vertexes) {
      if (v.pos) {
        s = v.value + ' (' + v.pos.x + ',' + v.pos.y + '):';
      } else {
        s = v.value + ':';
      }

      for (let e of v.edges) {
        s += ` ${e.destination.value}`;
      }
      console.log(s);
    }
  }

  /**
   * BFS
   */
  bfs(start) {
    // !!! IMPLEMENT ME
    let randColor = 
      'rgb(' + 
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')';    
    console.log("starting vertex:",start);
    let queue = [];
    let visited = [];
    // if(reset) {
    //   for (let v of this.vertexes) {
    //     v.color = 'white';
    //   }
    // }
    visited.push(start);
    queue.push(start);
    start.color = randColor;

    while (queue.length > 0){
      const currentVertex = queue[0];
      for (let e of currentVertex.edges) {
        if(!visited.includes(e.destination)){
          visited.push(e.destination);
          queue.push(e.destination)
          e.destination.color = randColor;
        }
        // const v = e.destination;
        // console.log("new vertex:",v)
        // if (v.color === 'white') {
        //   v.color = 'red';
        //   queue.push(v);
        // }
      }
      queue.shift();
      // currentVertex.color = 'black';
      // visited.push(currentVertex);
    }
    return visited;
  }

  /**
   * Get the connected components
   */
  getConnectedComponents() {
    // !!! IMPLEMENT ME
    const components = [];
    // let reset = true;
    for (let v of this.vertexes) {
    //   if (reset || this.vertexes) {
    //     const component = this.bfs(v, reset);
    //     reset = false;
    //     components.push(component);
    //   }
    if(!components.includes(v)){
      components.push(this.bfs(v));
    }
    }
    // return components;
  }
}
