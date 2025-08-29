import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <div className="text-8xl font-bold text-white/20 mb-4">404</div>
          <CardTitle className="text-white text-2xl">
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-white/70">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col space-y-3">
            <Button
              asChild
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Link to="/learning">
                <Search className="w-4 h-4 mr-2" />
                Explore Learning
              </Link>
            </Button>

            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-white/70 hover:text-white hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
