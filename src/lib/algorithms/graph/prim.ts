// A simple Priority Queue implementation for Prim's algorithm
class PriorityQueue {
  private nodes: { priority: number; to: number, from: number }[] = [];

  enqueue(priority: number, to: number, from: number) {
    this.nodes.push({ priority, to, from });
    this.sort();
  }

  dequeue() {
    return this.nodes.shift();
  }

  isEmpty() {
    return this.nodes.length === 0;
  }

  sort() {
    this.nodes.sort((a, b) => a.priority - b.priority);
  }

  getQueue() {
    return [...this.nodes];
  }
}

type PrimStep = {
  type: 'visit';
  node: number;
} | {
  type: 'edge';
  from: number;
  to: number;
} | {
  type: 'pq';
  pq: { priority: number; to: number, from: number }[];
};

export function prim(numNodes: number, adj: Map<number, { to: number; weight: number }[]>, startNode: number) {
  const visited: boolean[] = Array(numNodes).fill(false);
  const pq = new PriorityQueue();
  const mstEdges: { source: number; target: number; weight: number }[] = [];
  const steps: PrimStep[] = [];
  let edgeCount = 0;

  function addEdges(u: number) {
    visited[u] = true;
    steps.push({ type: 'visit', node: u });
    const neighbors = adj.get(u) || [];
    for (const { to: v, weight } of neighbors) {
      if (!visited[v]) {
        pq.enqueue(weight, v, u);
      }
    }
    steps.push({ type: 'pq', pq: pq.getQueue() });
  }

  addEdges(startNode);

  while (!pq.isEmpty() && edgeCount < numNodes - 1) {
    const dequeued = pq.dequeue();
    if (!dequeued) continue;
    
    steps.push({ type: 'pq', pq: pq.getQueue() });

    const { to: v, from: u, priority: weight } = dequeued;

    if (visited[v]) continue;
    
    steps.push({ type: 'edge', from: u, to: v });
    mstEdges.push({ source: u, target: v, weight });
    edgeCount++;
    addEdges(v);
  }

  return { mstEdges, steps };
}
