function bfs(numNodes: number, residualGraph: number[][], source: number, sink: number, parent: number[]) {
  const visited = Array(numNodes).fill(false);
  const queue: number[] = [];
  queue.push(source);
  visited[source] = true;
  parent[source] = -1;

  while (queue.length > 0) {
    const u = queue.shift()!;
    for (let v = 0; v < numNodes; v++) {
      if (!visited[v] && residualGraph[u][v] > 0) {
        queue.push(v);
        parent[v] = u;
        visited[v] = true;
      }
    }
  }
  return visited[sink];
}

export function fordFulkerson(numNodes: number, graph: number[][], source: number, sink: number) {
  const residualGraph: number[][] = graph.map(row => [...row]);
  const parent: number[] = Array(numNodes).fill(0);
  let maxFlow = 0;

  while (bfs(numNodes, residualGraph, source, sink, parent)) {
    let pathFlow = Infinity;
    for (let v = sink; v !== source; v = parent[v]) {
      const u = parent[v];
      pathFlow = Math.min(pathFlow, residualGraph[u][v]);
    }

    for (let v = sink; v !== source; v = parent[v]) {
      const u = parent[v];
      residualGraph[u][v] -= pathFlow;
      residualGraph[v][u] += pathFlow;
    }

    maxFlow += pathFlow;
  }

  return { maxFlow, residualGraph };
}
