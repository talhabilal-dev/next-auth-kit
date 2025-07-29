// Client-side utility for handling API calls with automatic token refresh
export async function apiCall(url: string, options: RequestInit = {}) {
  const makeRequest = async (retryCount = 0): Promise<Response> => {
    const response = await fetch(url, {
      ...options,
      credentials: "include", // Include cookies
    });

    // If we get a 401 and haven't already retried, try to refresh the token
    if (response.status === 401 && retryCount === 0) {
      const refreshResponse = await fetch("/api/users/token", {
        method: "POST",
        credentials: "include",
      });

      if (refreshResponse.ok) {
        // Token refreshed successfully, retry the original request
        return makeRequest(1);
      } else {
        // Refresh failed, redirect to login
        window.location.href = "/user/login";
        throw new Error("Authentication failed");
      }
    }

    return response;
  };

  return makeRequest();
}

// Hook for React components to handle authentication state
export function useAuthRefresh() {
  const refreshToken = async () => {
    try {
      const response = await fetch("/api/users/token", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        // Refresh failed, redirect to login
        window.location.href = "/user/login";
        return false;
      }

      return true;
    } catch (error) {
      console.error("Token refresh failed:", error);
      window.location.href = "/user/login";
      return false;
    }
  };

  return { refreshToken };
}
