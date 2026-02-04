import { useQuery } from '@tanstack/react-query';
import { getTournaments, type Contest } from '@/services/contestService';

export function useTournaments(filters?: {
  status?: Contest['status'];
}) {
  const { data: tournaments, isLoading, error, refetch } = useQuery({
    queryKey: ['tournaments', filters],
    queryFn: () => getTournaments(filters),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  return {
    tournaments: tournaments || [],
    isLoading,
    error,
    refetch
  };
}
