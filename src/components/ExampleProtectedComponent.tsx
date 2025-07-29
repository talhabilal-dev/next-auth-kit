// Example of how to use the automatic token refresh in components
"use client";

import { useEffect, useState } from "react";
import { apiCall } from "@/helpers/apiUtils";

export function ExampleProtectedComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        // This will automatically handle token refresh if needed
        const response = await apiCall("/api/protected-endpoint");

        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Protected Content</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
