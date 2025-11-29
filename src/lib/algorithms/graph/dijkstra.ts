// A simple Priority Queue implementation for Dijkstra's algorithm
class PriorityQueue {
  private nodes: { priority: number; key: number }[] = [];

  enqueue(priority: number, key: number) {
    this.nodes.push({ priority, key });
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

type DijkstraStep = {
  type: 'visit';
  node: number;
  distance: number;
} | {
  type: 'update';
  node: number;
  newDistance: number;
} | {
  type: 'finishNode';
  node: number;
} | {
  type: 'pq';
  pq: { priority: number; key: number }[];
};

export function dijkstra(numNodes: number, adj: Map<number, { to: number; weight: number }[]>, startNode: number) {
  const distances: number[] = Array(numNodes).fill(Infinity);
  const pq = new PriorityQueue();
  const steps: DijkstraStep[] = [];

  distances[startNode] = 0;
  pq.enqueue(0, startNode);
  steps.push({ type: 'pq', pq: pq.getQueue() });

  while (!pq.isEmpty()) {
    const dequeued = pq.dequeue();
    if (!dequeued) continue;
    
    steps.push({ type: 'pq', pq: pq.getQueue() });
    
    const { priority: dist, key: u } = dequeued;

    if (dist > distances[u]) {
      continue;
    }
    
    steps.push({ type: 'visit', node: u, distance: dist });

    const neighbors = adj.get(u) || [];
    for (const { to: v, weight } of neighbors) {
      const newDist = distances[u] + weight;
      if (newDist < distances[v]) {
        distances[v] = newDist;
        pq.enqueue(newDist, v);
        steps.push({ type: 'update', node: v, newDistance: newDist });
        steps.push({ type: 'pq', pq: pq.getQueue() });
      }
    }
    steps.push({ type: 'finishNode', node: u });
  }

  return { distances, steps };
}
