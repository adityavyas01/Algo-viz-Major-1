import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { PageLoader } from '@/components/ui/loader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CertificateDetails {
  issued_at: string;
  user: {
    username: string;
  };
  algorithm: {
    name: string;
  };
}

const VerifyCertificatePage: React.FC = () => {
  const { verificationKey } = useParams<{ verificationKey: string }>();
  const [certificate, setCertificate] = useState<CertificateDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyCertificate = async () => {
      if (!verificationKey) {
        setError('No verification key provided.');
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('certificates')
        .select(`
          issued_at,
          user:users(username),
          algorithm:algorithms(name)
        `)
        .eq('verification_key', verificationKey)
        .single();

      if (fetchError || !data) {
        setError('This certificate is not valid or could not be found.');
        setCertificate(null);
      } else {
        setCertificate(data as any);
        setError(null);
      }
      setLoading(false);
    };

    verifyCertificate();
  }, [verificationKey]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary rounded-full p-3 w-fit mb-4">
            <Award className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle>Certificate Verification</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center text-red-500 flex flex-col items-center gap-4">
              <XCircle className="h-12 w-12" />
              <p className="font-semibold">{error}</p>
              <Button asChild>
                <Link to="/">Go Home</Link>
              </Button>
            </div>
          ) : certificate ? (
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <CardDescription>This is a valid certificate issued by AlgoViz.</CardDescription>
              <div className="text-left mt-6 space-y-4">
                <div>
                  <p className="font-bold text-lg">{certificate.algorithm.name}</p>
                  <p className="text-sm text-muted-foreground">Was awarded to</p>
                </div>
                <div>
                  <p className="font-bold text-lg">{certificate.user.username}</p>
                  <p className="text-sm text-muted-foreground">On</p>
                </div>
                <div>
                  <p className="font-bold text-lg">{new Date(certificate.issued_at).toLocaleDateString()}</p>
                </div>
              </div>
              <Button asChild className="mt-8 w-full">
                <Link to="/learn">Explore More Algorithms</Link>
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyCertificatePage;
