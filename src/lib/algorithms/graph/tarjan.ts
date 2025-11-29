export function tarjan(numNodes: number, adj: number[][]) {
  const ids: number[] = Array(numNodes).fill(-1);
  const low: number[] = Array(numNodes).fill(-1);
  const onStack: boolean[] = Array(numNodes).fill(false);
  const stack: number[] = [];
  const sccs: number[][] = [];
  let id = 0;

  function dfs(at: number) {
    stack.push(at);
    onStack[at] = true;
    ids[at] = low[at] = id++;

    for (const to of adj[at]) {
      if (ids[to] === -1) {
        dfs(to);
      }
      if (onStack[to]) {
        low[at] = Math.min(low[at], low[to]);
      }
    }

    if (ids[at] === low[at]) {
      const scc: number[] = [];
      while (stack.length > 0) {
        const node = stack.pop()!;
        onStack[node] = false;
        low[node] = ids[at];
        scc.push(node);
        if (node === at) break;
      }
      sccs.push(scc);
    }
  }

  for (let i = 0; i < numNodes; i++) {
    if (ids[i] === -1) {
      dfs(i);
    }
  }

  return { sccs };
}
