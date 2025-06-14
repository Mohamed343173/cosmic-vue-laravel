
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Navigation from "@/components/Navigation";

type Profile = {
  id: string;
  role: 'admin' | 'user';
};

const fetchProfiles = async (): Promise<Profile[]> => {
  const { data, error } = await supabase.from("profiles").select("id, role");
  if (error) {
    console.error("Error fetching profiles:", error);
    throw new Error(error.message);
  }
  return data || [];
};

const ProfilesPage = () => {
  const { data: profiles, isLoading, error } = useQuery({
    queryKey: ["profiles"],
    queryFn: fetchProfiles,
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>User Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <p>Loading profiles...</p>}
            {error && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Failed to load profiles: {error.message}
                </AlertDescription>
              </Alert>
            )}
            {profiles && (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell className="font-mono text-xs">{profile.id}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${profile.role === 'admin' ? 'bg-purple-200 text-purple-800' : 'bg-blue-200 text-blue-800'}`}>
                            {profile.role}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfilesPage;
