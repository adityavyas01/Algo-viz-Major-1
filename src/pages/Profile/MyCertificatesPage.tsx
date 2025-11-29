import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { PageLoader } from '@/components/ui/loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';

interface UserCertificate {
  id: string;
  issued_at: string;
  verification_key: string;
  algorithm: {
    id: string;
    name: string;
  };
}

const MyCertificatesPage: React.FC = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<UserCertificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from('certificates')
        .select(`
          id,
          issued_at,
          verification_key,
          algorithm:algorithms(id, name)
        `)
        .eq('user_id', user.id)
        .order('issued_at', { ascending: false });

      if (error) {
        console.error('Error fetching certificates:', error);
      } else {
        setCertificates(data.map(c => ({...c, algorithm: Array.isArray(c.algorithm) ? c.algorithm[0] : c.algorithm})) as UserCertificate[]);
      }
      setLoading(false);
    };

    fetchCertificates();
  }, [user]);

  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return <div className="text-center p-8">Please log in to view your certificates.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Certificates</h1>
      {certificates.length === 0 ? (
        <div className="text-center p-8 border-2 border-dashed rounded-lg">
          <Award className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">No Certificates Yet</h2>
          <p className="text-muted-foreground mt-2">
            Complete quizzes on algorithm pages with a score of 80% or higher to earn certificates.
          </p>
          <Button asChild className="mt-4">
            <Link to="/learn">Browse Algorithms</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <Card key={cert.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-yellow-500" />
                  <span>{cert.algorithm.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Issued on: {new Date(cert.issued_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground truncate mt-1">
                  ID: {cert.verification_key}
                </p>
                <Button asChild size="sm" className="mt-4 w-full">
                  <Link to={`/verify-certificate/${cert.verification_key}`} target="_blank" rel="noopener noreferrer">
                    Verify Certificate
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCertificatesPage;
